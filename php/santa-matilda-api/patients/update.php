
<?php
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: PUT, OPTIONS');
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

// Get database connection
$conn = require '../config/database.php';

// Get JSON data from request
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Validate patient ID
if (!isset($data['id']) || !is_numeric($data['id'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Patient ID is required']);
    exit;
}

$patient_id = $data['id'];

// Access control - check permissions
if ($_SESSION['user_role'] === 'patient') {
    // Patients can only update their own info
    $check_stmt = $conn->prepare("SELECT user_id FROM patients WHERE id = ?");
    $check_stmt->bind_param("i", $patient_id);
    $check_stmt->execute();
    $check_result = $check_stmt->get_result();
    
    if ($check_result->num_rows === 0) {
        http_response_code(404);
        echo json_encode(['error' => 'Patient not found']);
        exit;
    }
    
    $patient_data = $check_result->fetch_assoc();
    $check_stmt->close();
    
    if ($patient_data['user_id'] != $_SESSION['user_id']) {
        http_response_code(403);
        echo json_encode(['error' => 'You can only update your own information']);
        exit;
    }
}

// Validate required fields
$required_fields = ['firstName', 'lastName', 'email', 'phone', 'dateOfBirth', 'address', 'city', 'state', 'zipCode'];
foreach ($required_fields as $field) {
    if (!isset($data[$field]) || empty($data[$field])) {
        http_response_code(400);
        echo json_encode(['error' => "Missing required field: $field"]);
        exit;
    }
}

// Update patient information
$stmt = $conn->prepare("UPDATE patients SET 
    first_name = ?,
    last_name = ?,
    email = ?,
    phone = ?,
    date_of_birth = ?,
    address = ?,
    city = ?,
    state = ?,
    zip_code = ?,
    insurance_provider = ?,
    insurance_number = ?,
    emergency_contact_name = ?,
    emergency_contact_phone = ?
    WHERE id = ?");

$stmt->bind_param(
    "sssssssssssssi",
    $data['firstName'],
    $data['lastName'],
    $data['email'],
    $data['phone'],
    $data['dateOfBirth'],
    $data['address'],
    $data['city'],
    $data['state'],
    $data['zipCode'],
    $data['insuranceProvider'],
    $data['insuranceNumber'],
    $data['emergencyContactName'],
    $data['emergencyContactPhone'],
    $patient_id
);

if ($stmt->execute()) {
    // Also update the user record if email or name changed
    $user_stmt = $conn->prepare("
        UPDATE users 
        SET name = ?, email = ?
        WHERE id = (SELECT user_id FROM patients WHERE id = ?)
    ");
    $full_name = $data['firstName'] . ' ' . $data['lastName'];
    $user_stmt->bind_param("ssi", $full_name, $data['email'], $patient_id);
    $user_stmt->execute();
    $user_stmt->close();
    
    // Return the updated patient details
    echo json_encode([
        'id' => $patient_id,
        'firstName' => $data['firstName'],
        'lastName' => $data['lastName'],
        'email' => $data['email'],
        'phone' => $data['phone'],
        'dateOfBirth' => $data['dateOfBirth'],
        'address' => $data['address'],
        'city' => $data['city'],
        'state' => $data['state'],
        'zipCode' => $data['zipCode'],
        'insuranceProvider' => $data['insuranceProvider'] ?? null,
        'insuranceNumber' => $data['insuranceNumber'] ?? null,
        'emergencyContactName' => $data['emergencyContactName'] ?? null,
        'emergencyContactPhone' => $data['emergencyContactPhone'] ?? null
    ]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to update patient: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
