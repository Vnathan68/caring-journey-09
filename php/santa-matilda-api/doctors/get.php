
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

// Check if ID was provided
if (!isset($_GET['id']) || empty($_GET['id'])) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Missing doctor ID'
    ]);
    exit;
}

$doctor_id = $_GET['id'];

try {
    // Prepare a SQL query to get the doctor
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
        WHERE 
            d.id = :doctor_id
    ";
    
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':doctor_id', $doctor_id);
    $stmt->execute();
    
    // Check if doctor exists
    if ($stmt->rowCount() > 0) {
        // Fetch doctor data
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        
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
        
        // Get doctor availability
        $availabilityQuery = "
            SELECT 
                day_of_week,
                start_time,
                end_time
            FROM 
                doctor_availability
            WHERE 
                doctor_id = :doctor_id
                AND is_available = 1
        ";
        
        $availStmt = $conn->prepare($availabilityQuery);
        $availStmt->bindParam(':doctor_id', $doctor_id);
        $availStmt->execute();
        
        $availability = [];
        
        while ($availRow = $availStmt->fetch(PDO::FETCH_ASSOC)) {
            $availability[] = [
                'dayOfWeek' => $availRow['day_of_week'],
                'startTime' => $availRow['start_time'],
                'endTime' => $availRow['end_time']
            ];
        }
        
        $doctor['availability'] = $availability;
        
        // Return the doctor data
        echo json_encode([
            'status' => 'success',
            'data' => $doctor
        ]);
    } else {
        // Doctor not found
        echo json_encode([
            'status' => 'error',
            'message' => 'Doctor not found'
        ]);
    }
} catch (PDOException $e) {
    // Return error message
    echo json_encode([
        'status' => 'error',
        'message' => 'Database error: ' . $e->getMessage()
    ]);
}
