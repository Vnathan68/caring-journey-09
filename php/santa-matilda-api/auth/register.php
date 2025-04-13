
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

// Check if required fields are set
if (!isset($data->email) || !isset($data->password) || !isset($data->name)) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Name, email and password are required'
    ]);
    exit;
}

$name = $data->name;
$email = $data->email;
$password = password_hash($data->password, PASSWORD_DEFAULT); // Hash the password
$role = isset($data->role) ? $data->role : 'patient'; // Default role is patient

try {
    // Check if user with this email already exists
    $checkQuery = "SELECT id FROM users WHERE email = :email";
    $checkStmt = $conn->prepare($checkQuery);
    $checkStmt->bindParam(':email', $email);
    $checkStmt->execute();
    
    if ($checkStmt->rowCount() > 0) {
        echo json_encode([
            'status' => 'error',
            'message' => 'A user with this email already exists'
        ]);
        exit;
    }
    
    // Insert new user
    $query = "INSERT INTO users (name, email, password, role) VALUES (:name, :email, :password, :role)";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':password', $password);
    $stmt->bindParam(':role', $role);
    
    if ($stmt->execute()) {
        $user_id = $conn->lastInsertId();
        
        // Create role-specific record based on user role
        switch ($role) {
            case 'admin':
                $adminQuery = "INSERT INTO admins (user_id, first_name, last_name, email, phone, role) 
                               VALUES (:user_id, :first_name, :last_name, :email, :phone, 'system_admin')";
                $adminStmt = $conn->prepare($adminQuery);
                
                // Extract first and last name from full name
                $nameParts = explode(' ', $name, 2);
                $firstName = $nameParts[0];
                $lastName = isset($nameParts[1]) ? $nameParts[1] : '';
                $phone = isset($data->phone) ? $data->phone : '';
                
                $adminStmt->bindParam(':user_id', $user_id);
                $adminStmt->bindParam(':first_name', $firstName);
                $adminStmt->bindParam(':last_name', $lastName);
                $adminStmt->bindParam(':email', $email);
                $adminStmt->bindParam(':phone', $phone);
                $adminStmt->execute();
                break;
                
            case 'doctor':
                // Add code to create doctor record
                break;
                
            case 'secretary_nurse':
                $snQuery = "INSERT INTO secretary_nurses (user_id, first_name, last_name, email, phone, position, department, is_nurse, hire_date) 
                            VALUES (:user_id, :first_name, :last_name, :email, :phone, :position, :department, :is_nurse, CURDATE())";
                $snStmt = $conn->prepare($snQuery);
                
                // Extract first and last name from full name
                $nameParts = explode(' ', $name, 2);
                $firstName = $nameParts[0];
                $lastName = isset($nameParts[1]) ? $nameParts[1] : '';
                $phone = isset($data->phone) ? $data->phone : '';
                $position = isset($data->position) ? $data->position : 'Staff';
                $department = isset($data->department) ? $data->department : 'General';
                $isNurse = isset($data->isNurse) ? (int)$data->isNurse : 0;
                
                $snStmt->bindParam(':user_id', $user_id);
                $snStmt->bindParam(':first_name', $firstName);
                $snStmt->bindParam(':last_name', $lastName);
                $snStmt->bindParam(':email', $email);
                $snStmt->bindParam(':phone', $phone);
                $snStmt->bindParam(':position', $position);
                $snStmt->bindParam(':department', $department);
                $snStmt->bindParam(':is_nurse', $isNurse);
                $snStmt->execute();
                break;
                
            case 'patient':
                // Patient info will be created separately through patient registration
                break;
        }
        
        // Return user data without password
        echo json_encode([
            'status' => 'success',
            'data' => [
                'id' => $user_id,
                'name' => $name,
                'email' => $email,
                'role' => $role,
                'twoFactorEnabled' => false
            ]
        ]);
    } else {
        echo json_encode([
            'status' => 'error',
            'message' => 'Unable to create user account'
        ]);
    }
} catch (PDOException $e) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Database error: ' . $e->getMessage()
    ]);
}
?>
