
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
    // Prepare a SQL query to get secretary/nurse by ID
    $query = "
        SELECT 
            s.id, 
            s.first_name, 
            s.last_name, 
            s.email, 
            s.phone, 
            s.position,
            s.department,
            s.is_nurse,
            s.nursing_license,
            s.profile_image,
            s.status,
            s.hire_date
        FROM 
            secretary_nurses s
        WHERE 
            s.id = :id
    ";
    
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':id', $id);
    $stmt->execute();
    
    // Check if secretary/nurse exists
    if ($stmt->rowCount() > 0) {
        // Fetch the secretary/nurse data
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        
        $secretaryNurse = [
            'id' => $row['id'],
            'firstName' => $row['first_name'],
            'lastName' => $row['last_name'],
            'email' => $row['email'],
            'phone' => $row['phone'],
            'position' => $row['position'],
            'department' => $row['department'],
            'isNurse' => (bool)$row['is_nurse'],
            'nursingLicense' => $row['nursing_license'],
            'profileImage' => $row['profile_image'],
            'status' => $row['status'],
            'hireDate' => $row['hire_date']
        ];
        
        // Return the secretary/nurse data
        echo json_encode([
            'status' => 'success',
            'data' => $secretaryNurse
        ]);
    } else {
        // No secretary/nurse found
        echo json_encode([
            'status' => 'error',
            'message' => 'Secretary/Nurse not found'
        ]);
    }
} catch (PDOException $e) {
    // Return error message
    echo json_encode([
        'status' => 'error',
        'message' => 'Database error: ' . $e->getMessage()
    ]);
}
