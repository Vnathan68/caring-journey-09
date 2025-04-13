
<?php
// Required headers for API
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: PUT");

// Include database connection file
include_once '../config/database.php';

// Create a new database connection
$database = new Database();
$conn = $database->getConnection();

// Get the posted data
$data = json_decode(file_get_contents("php://input"));

// Check if data is complete
if (
    !isset($data->id) || 
    !isset($data->firstName) || 
    !isset($data->lastName) || 
    !isset($data->email) || 
    !isset($data->phone) || 
    !isset($data->specialty) || 
    !isset($data->licenseNumber)
) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Missing required fields'
    ]);
    exit;
}

try {
    // Begin transaction
    $conn->beginTransaction();
    
    // Update the doctor record
    $query = "
        UPDATE 
            doctors
        SET 
            first_name = :first_name,
            last_name = :last_name,
            email = :email,
            phone = :phone,
            specialty = :specialty,
            bio = :bio,
            consultation_fee = :consultation_fee,
            license_number = :license_number,
            start_date = :start_date,
            profile_image = :profile_image,
            status = :status
        WHERE 
            id = :id
    ";
    
    $stmt = $conn->prepare($query);
    
    // Set parameters
    $stmt->bindParam(':id', $data->id);
    $stmt->bindParam(':first_name', $data->firstName);
    $stmt->bindParam(':last_name', $data->lastName);
    $stmt->bindParam(':email', $data->email);
    $stmt->bindParam(':phone', $data->phone);
    $stmt->bindParam(':specialty', $data->specialty);
    $stmt->bindParam(':bio', $data->bio ?? null);
    $stmt->bindParam(':consultation_fee', $data->consultationFee ?? null);
    $stmt->bindParam(':license_number', $data->licenseNumber);
    $stmt->bindParam(':start_date', $data->startDate ?? null);
    $stmt->bindParam(':profile_image', $data->profileImage ?? null);
    $stmt->bindParam(':status', $data->status ?? 'active');
    
    $stmt->execute();
    
    // If there's availability data, first delete existing availability
    if (isset($data->availability) && is_array($data->availability)) {
        $deleteQuery = "DELETE FROM doctor_availability WHERE doctor_id = :doctor_id";
        $deleteStmt = $conn->prepare($deleteQuery);
        $deleteStmt->bindParam(':doctor_id', $data->id);
        $deleteStmt->execute();
        
        // Then insert the new availability
        $availabilityQuery = "
            INSERT INTO doctor_availability (
                doctor_id,
                day_of_week,
                start_time,
                end_time,
                is_available
            ) VALUES (
                :doctor_id,
                :day_of_week,
                :start_time,
                :end_time,
                1
            )
        ";
        
        $availStmt = $conn->prepare($availabilityQuery);
        
        foreach ($data->availability as $avail) {
            if (isset($avail->dayOfWeek) && isset($avail->startTime) && isset($avail->endTime)) {
                $availStmt->bindParam(':doctor_id', $data->id);
                $availStmt->bindParam(':day_of_week', $avail->dayOfWeek);
                $availStmt->bindParam(':start_time', $avail->startTime);
                $availStmt->bindParam(':end_time', $avail->endTime);
                $availStmt->execute();
            }
        }
    }
    
    // Commit transaction
    $conn->commit();
    
    // Get the updated doctor
    $selectQuery = "
        SELECT 
            id, 
            first_name, 
            last_name, 
            email, 
            phone, 
            specialty, 
            bio, 
            consultation_fee,
            license_number,
            start_date,
            profile_image,
            status
        FROM 
            doctors
        WHERE 
            id = :doctor_id
    ";
    
    $selectStmt = $conn->prepare($selectQuery);
    $selectStmt->bindParam(':doctor_id', $data->id);
    $selectStmt->execute();
    
    $doctorData = $selectStmt->fetch(PDO::FETCH_ASSOC);
    
    // Format doctor data for response
    $doctor = [
        'id' => $doctorData['id'],
        'firstName' => $doctorData['first_name'],
        'lastName' => $doctorData['last_name'],
        'email' => $doctorData['email'],
        'phone' => $doctorData['phone'],
        'specialty' => $doctorData['specialty'],
        'bio' => $doctorData['bio'],
        'consultationFee' => $doctorData['consultation_fee'],
        'licenseNumber' => $doctorData['license_number'],
        'startDate' => $doctorData['start_date'],
        'profileImage' => $doctorData['profile_image'],
        'status' => $doctorData['status']
    ];
    
    // Return success response
    echo json_encode([
        'status' => 'success',
        'message' => 'Doctor updated successfully',
        'data' => $doctor
    ]);
    
} catch (PDOException $e) {
    // Rollback transaction on error
    $conn->rollBack();
    
    // Return error message
    echo json_encode([
        'status' => 'error',
        'message' => 'Database error: ' . $e->getMessage()
    ]);
}
