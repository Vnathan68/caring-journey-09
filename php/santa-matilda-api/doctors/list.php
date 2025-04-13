
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
    // Prepare a SQL query to get all doctors
    $query = "
        SELECT 
            d.id, 
            d.first_name, 
            d.last_name, 
            d.email, 
            d.phone, 
            d.specialty, 
            d.bio, 
            d.consultation_fee,
            d.license_number,
            d.start_date,
            d.profile_image,
            d.status
        FROM 
            doctors d
        ORDER BY 
            d.last_name ASC, 
            d.first_name ASC
    ";
    
    $stmt = $conn->prepare($query);
    $stmt->execute();
    
    // Check if any doctors exist
    if ($stmt->rowCount() > 0) {
        // Initialize an array for the doctors
        $doctors = [];
        
        // Fetch all doctors and add to array
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $doctor = [
                'id' => $row['id'],
                'firstName' => $row['first_name'],
                'lastName' => $row['last_name'],
                'email' => $row['email'],
                'phone' => $row['phone'],
                'specialty' => $row['specialty'],
                'bio' => $row['bio'],
                'consultationFee' => $row['consultation_fee'],
                'licenseNumber' => $row['license_number'],
                'startDate' => $row['start_date'],
                'profileImage' => $row['profile_image'],
                'status' => $row['status']
            ];
            
            $doctors[] = $doctor;
        }
        
        // Return the doctors
        echo json_encode([
            'status' => 'success',
            'data' => $doctors
        ]);
    } else {
        // No doctors found
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
