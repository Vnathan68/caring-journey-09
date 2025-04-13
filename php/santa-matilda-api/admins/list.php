
<?php
// Required headers for API
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");

// Include database connection file
include_once '../config/database.php';

// Create a new database connection
$database = new Database();
$conn = $database->getConnection();

try {
    // Prepare a SQL query to get all admins
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
        ORDER BY 
            a.last_name ASC, 
            a.first_name ASC
    ";
    
    $stmt = $conn->prepare($query);
    $stmt->execute();
    
    // Check if any admins exist
    if ($stmt->rowCount() > 0) {
        // Initialize an array for the admins
        $admins = [];
        
        // Fetch all admins and add to array
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
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
            
            $admins[] = $admin;
        }
        
        // Return the admins
        echo json_encode([
            'status' => 'success',
            'data' => $admins
        ]);
    } else {
        // No admins found
        echo json_encode([
            'status' => 'success',
            'data' => []
        ]);
    }
} catch (PDOException $e) {
    // Return error message
    echo json_encode([
        'status' => 'error',
        'message' => 'Database error: ' . $e->getMessage()
    ]);
}
