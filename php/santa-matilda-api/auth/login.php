
<?php
// Required headers for API
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

// Handle OPTIONS request for CORS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Include database connection file
include_once '../config/database.php';

// Create a new database connection
$database = new Database();
$conn = $database->getConnection();

// Get posted data
$data = json_decode(file_get_contents("php://input"));

// Check if email and password are set
if (!isset($data->email) || !isset($data->password)) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Email and password are required'
    ]);
    exit;
}

$email = $data->email;
$password = $data->password;

try {
    // Query to check if user exists
    $query = "
        SELECT 
            u.id, 
            u.name, 
            u.email, 
            u.password, 
            u.role,
            u.two_factor_enabled
        FROM 
            users u
        WHERE 
            u.email = :email
    ";
    
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':email', $email);
    $stmt->execute();
    
    // Check if user exists
    if ($stmt->rowCount() > 0) {
        // Get user data
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        
        // Verify password
        if (password_verify($password, $user['password'])) {
            // Start session
            session_start();
            
            // Check if two factor authentication is required
            $needsTwoFactor = (bool)$user['two_factor_enabled'];
            
            if ($needsTwoFactor) {
                // In a real app, you would generate and send a 2FA code here
                // For this example, we'll store user ID in session as pending
                $_SESSION['pending_user_id'] = $user['id'];
                
                echo json_encode([
                    'status' => 'two_factor_required',
                    'message' => 'Two factor authentication code required',
                    'needsTwoFactor' => true
                ]);
                exit;
            }
            
            // Set session variables to indicate the user is logged in
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_role'] = $user['role'];
            
            // Update last login time based on user role
            if ($user['role'] === 'admin') {
                $updateQuery = "UPDATE admins SET last_login = NOW() WHERE user_id = :user_id";
                $updateStmt = $conn->prepare($updateQuery);
                $updateStmt->bindParam(':user_id', $user['id']);
                $updateStmt->execute();
            }
            
            // Return user data without the password
            echo json_encode([
                'status' => 'success',
                'data' => [
                    'id' => $user['id'],
                    'name' => $user['name'],
                    'email' => $user['email'],
                    'role' => $user['role'],
                    'twoFactorEnabled' => (bool)$user['two_factor_enabled']
                ]
            ]);
        } else {
            // Invalid password
            echo json_encode([
                'status' => 'error',
                'message' => 'Invalid email or password'
            ]);
        }
    } else {
        // User not found
        echo json_encode([
            'status' => 'error',
            'message' => 'Invalid email or password'
        ]);
    }
} catch (PDOException $e) {
    // Database error
    echo json_encode([
        'status' => 'error',
        'message' => 'Database error: ' . $e->getMessage()
    ]);
}
?>
