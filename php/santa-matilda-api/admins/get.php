
<?php
// Required headers for API
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");

// Include database connection file
include_once '../config/database.php';

// Check if ID parameter exists
if (!isset($_GET['id'])) {
    echo json_encode(['status' => 'error', 'message' => 'Missing required parameter: id']);
    exit();
}

$id = $_GET['id'];

// Create a new database connection
$database = new Database();
$conn = $database->getConnection();

try {
    // Prepare a SQL query to get admin by ID
    $query = "
        SELECT 
            a.id, 
            a.first_name, 
            a.last_name, 
            a.email, 
            a.phone, 
            a.role,
            a.profile_image,
            a.last_login
        FROM 
            admins a
        WHERE 
            a.id = :id
    ";
    
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':id', $id);
    $stmt->execute();
    
    // Check if admin exists
    if ($stmt->rowCount() > 0) {
        // Fetch the admin data
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        
        $admin = [
            'id' => $row['id'],
            'firstName' => $row['first_name'],
            'lastName' => $row['last_name'],
            'email' => $row['email'],
            'phone' => $row['phone'],
            'role' => $row['role'],
            'profileImage' => $row['profile_image'],
            'lastLogin' => $row['last_login']
        ];
        
        // Return the admin data
        echo json_encode([
            'status' => 'success',
            'data' => $admin
        ]);
    } else {
        // No admin found
        echo json_encode([
            'status' => 'error',
            'message' => 'Admin not found'
        ]);
    }
} catch (PDOException $e) {
    // Return error message
    echo json_encode([
        'status' => 'error',
        'message' => 'Database error: ' . $e->getMessage()
    ]);
}
