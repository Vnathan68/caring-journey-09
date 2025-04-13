
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

// Get the posted data
$data = json_decode(file_get_contents("php://input"));

// Check if data is complete
if (
    !isset($data->firstName) || 
    !isset($data->lastName) || 
    !isset($data->email) || 
    !isset($data->phone) || 
    !isset($data->specialty) || 
    !isset($data->licenseNumber) || 
    !isset($data->startDate)
) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Missing required fields'
    ]);
    exit;
}

try {
    // First, check if email already exists
    $emailCheckQuery = "SELECT COUNT(*) FROM doctors WHERE email = :email";
    $emailStmt = $conn->prepare($emailCheckQuery);
    $emailStmt->bindParam(':email', $data->email);
    $emailStmt->execute();
    
    if ($emailStmt->fetchColumn() > 0) {
        echo json_encode([
            'status' => 'error',
            'message' => 'Email already registered'
        ]);
        exit;
    }
    
    // Begin transaction
    $conn->beginTransaction();
    
    // Create a new user account for the doctor
    $userQuery = "INSERT INTO users (name, email, password, role) VALUES (:name, :email, :password, 'doctor')";
    $userStmt = $conn->prepare($userQuery);
    
    // Generate a random password
    $tempPassword = bin2hex(random_bytes(8));
    $hashedPassword = password_hash($tempPassword, PASSWORD_DEFAULT);
    $fullName = $data->firstName . ' ' . $data->lastName;
    
    $userStmt->bindParam(':name', $fullName);
    $userStmt->bindParam(':email', $data->email);
    $userStmt->bindParam(':password', $hashedPassword);
    $userStmt->execute();
    
    $userId = $conn->lastInsertId();
    
    // Now create the doctor record
    $doctorQuery = "
        INSERT INTO doctors (
            user_id, 
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
        ) VALUES (
            :user_id,
            :first_name,
            :last_name,
            :email,
            :phone,
            :specialty,
            :bio,
            :consultation_fee,
            :license_number,
            :start_date,
            :profile_image,
            :status
        )
    ";
    
    $doctorStmt = $conn->prepare($doctorQuery);
    
    // Set parameters
    $doctorStmt->bindParam(':user_id', $userId);
    $doctorStmt->bindParam(':first_name', $data->firstName);
    $doctorStmt->bindParam(':last_name', $data->lastName);
    $doctorStmt->bindParam(':email', $data->email);
    $doctorStmt->bindParam(':phone', $data->phone);
    $doctorStmt->bindParam(':specialty', $data->specialty);
    $doctorStmt->bindParam(':bio', $data->bio ?? null);
    $doctorStmt->bindParam(':consultation_fee', $data->consultationFee ?? null);
    $doctorStmt->bindParam(':license_number', $data->licenseNumber);
    $doctorStmt->bindParam(':start_date', $data->startDate);
    $doctorStmt->bindParam(':profile_image', $data->profileImage ?? null);
    $doctorStmt->bindParam(':status', $data->status ?? 'active');
    
    $doctorStmt->execute();
    
    $doctorId = $conn->lastInsertId();
    
    // Add availability if provided
    if (isset($data->availability) && is_array($data->availability)) {
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
                $availStmt->bindParam(':doctor_id', $doctorId);
                $availStmt->bindParam(':day_of_week', $avail->dayOfWeek);
                $availStmt->bindParam(':start_time', $avail->startTime);
                $availStmt->bindParam(':end_time', $avail->endTime);
                $availStmt->execute();
            }
        }
    }
    
    // Commit transaction
    $conn->commit();
    
    // Get the newly created doctor
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
    $selectStmt->bindParam(':doctor_id', $doctorId);
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
        'status' => $doctorData['status'],
        'tempPassword' => $tempPassword // Include temporary password in response
    ];
    
    // Return success response
    echo json_encode([
        'status' => 'success',
        'message' => 'Doctor registered successfully',
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
