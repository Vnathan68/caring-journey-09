
<?php
// Required headers for API
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

// Include database connection file
include_once '../config/database.php';

// Create a new database connection
$database = new Database();
$conn = $database->getConnection();

// Get posted data
$data = json_decode(file_get_contents("php://input"));

// Check if verification code is set
if (!isset($data->code)) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Verification code is required'
    ]);
    exit;
}

$code = $data->code;

// In a real application, you would:
// 1. Get the user_id from the session
// 2. Query the database for pending 2FA authorization for this user
// 3. Compare the provided code with the stored code
// 4. If valid, complete the login

// For this example, we'll simulate a successful verification with a test code
if ($code === '123456') {
    // Resume the session to get the pending user information
    session_start();
    
    if (!isset($_SESSION['pending_user_id'])) {
        echo json_encode([
            'status' => 'error',
            'message' => 'No pending authentication found'
        ]);
        exit;
    }
    
    $userId = $_SESSION['pending_user_id'];
    
    // Get user data
    $query = "
        SELECT 
            u.id, 
            u.name, 
            u.email, 
            u.role,
            u.two_factor_enabled
        FROM 
            users u
        WHERE 
            u.id = :user_id
    ";
    
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':user_id', $userId);
    $stmt->execute();
    
    if ($stmt->rowCount() > 0) {
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        
        // Set session variables to indicate the user is logged in
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['user_role'] = $user['role'];
        
        // Clear the pending state
        unset($_SESSION['pending_user_id']);
        
        // Return user data
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
        echo json_encode([
            'status' => 'error',
            'message' => 'User not found'
        ]);
    }
} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid verification code'
    ]);
}
?>
