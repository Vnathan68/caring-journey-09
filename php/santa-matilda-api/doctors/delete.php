
<?php
// Required headers for API
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: DELETE");

// Include database connection file
include_once '../config/database.php';

// Create a new database connection
$database = new Database();
$conn = $database->getConnection();

// Get the doctor ID from the URL
$parts = explode('/', $_SERVER['REQUEST_URI']);
$doctor_id = end($parts);

// Check if ID is valid
if (empty($doctor_id) || !is_numeric($doctor_id)) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid doctor ID'
    ]);
    exit;
}

try {
    // Begin transaction
    $conn->beginTransaction();
    
    // Get the user_id associated with this doctor
    $userQuery = "SELECT user_id FROM doctors WHERE id = :doctor_id";
    $userStmt = $conn->prepare($userQuery);
    $userStmt->bindParam(':doctor_id', $doctor_id);
    $userStmt->execute();
    
    $userId = null;
    if ($userRow = $userStmt->fetch(PDO::FETCH_ASSOC)) {
        $userId = $userRow['user_id'];
    } else {
        echo json_encode([
            'status' => 'error',
            'message' => 'Doctor not found'
        ]);
        exit;
    }
    
    // Delete doctor's availability
    $availQuery = "DELETE FROM doctor_availability WHERE doctor_id = :doctor_id";
    $availStmt = $conn->prepare($availQuery);
    $availStmt->bindParam(':doctor_id', $doctor_id);
    $availStmt->execute();
    
    // Delete the doctor
    $doctorQuery = "DELETE FROM doctors WHERE id = :doctor_id";
    $doctorStmt = $conn->prepare($doctorQuery);
    $doctorStmt->bindParam(':doctor_id', $doctor_id);
    $doctorStmt->execute();
    
    // Delete the associated user account
    $deleteUserQuery = "DELETE FROM users WHERE id = :user_id";
    $deleteUserStmt = $conn->prepare($deleteUserQuery);
    $deleteUserStmt->bindParam(':user_id', $userId);
    $deleteUserStmt->execute();
    
    // Commit transaction
    $conn->commit();
    
    // Return success response
    echo json_encode([
        'status' => 'success',
        'message' => 'Doctor deleted successfully'
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
