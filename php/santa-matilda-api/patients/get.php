
<?php
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Session check
session_start();
if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Authentication required']);
    exit;
}

// Get the requested patient ID from URL
$request_uri = $_SERVER['REQUEST_URI'];
$path_parts = explode('/', $request_uri);
$patient_id = end($path_parts);

if (!is_numeric($patient_id)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid patient ID']);
    exit;
}

// Get database connection
$conn = require '../config/database.php';

// If the user is a patient, they can only view their own data
if ($_SESSION['user_role'] === 'patient') {
    // Get the patient ID for the current user
    $user_stmt = $conn->prepare("SELECT id FROM patients WHERE user_id = ?");
    $user_stmt->bind_param("i", $_SESSION['user_id']);
    $user_stmt->execute();
    $user_result = $user_stmt->get_result();
    
    if ($user_result->num_rows === 0) {
        http_response_code(404);
        echo json_encode(['error' => 'Patient record not found']);
        exit;
    }
    
    $user_patient = $user_result->fetch_assoc();
    $user_stmt->close();
    
    // If the requested patient ID doesn't match the user's patient ID
    if ($user_patient['id'] != $patient_id) {
        http_response_code(403);
        echo json_encode(['error' => 'Insufficient permissions']);
        exit;
    }
}

// Get patient basic information
$stmt = $conn->prepare("SELECT * FROM patients WHERE id = ?");
$stmt->bind_param("i", $patient_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    http_response_code(404);
    echo json_encode(['error' => 'Patient not found']);
    exit;
}

$patient = $result->fetch_assoc();
$stmt->close();

// Get patient medical history
$history_stmt = $conn->prepare("SELECT * FROM medical_history WHERE patient_id = ? ORDER BY date DESC");
$history_stmt->bind_param("i", $patient_id);
$history_stmt->execute();
$history_result = $history_stmt->get_result();

$medical_history = [];
while ($history = $history_result->fetch_assoc()) {
    // Get attachments for this history item
    $attach_stmt = $conn->prepare("SELECT file_path, file_name FROM medical_attachments WHERE history_id = ?");
    $attach_stmt->bind_param("i", $history['id']);
    $attach_stmt->execute();
    $attach_result = $attach_stmt->get_result();
    
    $attachments = [];
    while ($attachment = $attach_result->fetch_assoc()) {
        $attachments[] = $attachment['file_path'];
    }
    $attach_stmt->close();
    
    $medical_history[] = [
        'id' => $history['id'],
        'type' => $history['type'],
        'date' => $history['date'],
        'description' => $history['description'],
        'doctorName' => $history['doctor_name'],
        'attachments' => $attachments
    ];
}
$history_stmt->close();

// Get pregnancy data if available
$preg_stmt = $conn->prepare("SELECT * FROM pregnancy_data WHERE patient_id = ? ORDER BY created_at DESC LIMIT 1");
$preg_stmt->bind_param("i", $patient_id);
$preg_stmt->execute();
$preg_result = $preg_stmt->get_result();

$pregnancy_data = null;
if ($preg_result->num_rows > 0) {
    $preg = $preg_result->fetch_assoc();
    $pregnancy_data = [
        'id' => $preg['id'],
        'isPregnant' => (bool)$preg['is_pregnant'],
        'gestationalAge' => $preg['gestational_age'],
        'dueDate' => $preg['due_date'],
        'lastCheckup' => $preg['last_checkup'],
        'notes' => $preg['notes']
    ];
}
$preg_stmt->close();

// Build the complete patient data response
$response = [
    'id' => $patient['id'],
    'firstName' => $patient['first_name'],
    'lastName' => $patient['last_name'],
    'email' => $patient['email'],
    'phone' => $patient['phone'],
    'dateOfBirth' => $patient['date_of_birth'],
    'address' => $patient['address'],
    'city' => $patient['city'],
    'state' => $patient['state'],
    'zipCode' => $patient['zip_code'],
    'insuranceProvider' => $patient['insurance_provider'],
    'insuranceNumber' => $patient['insurance_number'],
    'emergencyContactName' => $patient['emergency_contact_name'],
    'emergencyContactPhone' => $patient['emergency_contact_phone'],
    'medicalHistory' => $medical_history,
    'pregnancyData' => $pregnancy_data
];

echo json_encode($response);
$conn->close();
