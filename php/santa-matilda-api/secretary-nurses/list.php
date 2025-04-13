
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
    // Prepare a SQL query to get all secretary/nurses
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
        ORDER BY 
            s.last_name ASC, 
            s.first_name ASC
    ";
    
    $stmt = $conn->prepare($query);
    $stmt->execute();
    
    // Check if any secretary/nurses exist
    if ($stmt->rowCount() > 0) {
        // Initialize an array for the secretary/nurses
        $secretaryNurses = [];
        
        // Fetch all secretary/nurses and add to array
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
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
            
            $secretaryNurses[] = $secretaryNurse;
        }
        
        // Return the secretary/nurses
        echo json_encode([
            'status' => 'success',
            'data' => $secretaryNurses
        ]);
    } else {
        // No secretary/nurses found
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
