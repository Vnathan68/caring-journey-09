
<?php
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: POST, OPTIONS');
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

// Only admin and secretary/nurse roles can register patients
if ($_SESSION['user_role'] !== 'admin' && $_SESSION['user_role'] !== 'secretary_nurse') {
    http_response_code(403);
    echo json_encode(['error' => 'Insufficient permissions']);
    exit;
}

// Get database connection
$conn = require '../config/database.php';

// Include the patient schema
require_once '../config/patient_schema.php';
create_patient_tables($conn);

// Get JSON data from request
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Validate required fields
$required_fields = ['firstName', 'lastName', 'email', 'phone', 'dateOfBirth', 'address', 'city', 'state', 'zipCode'];
foreach ($required_fields as $field) {
    if (!isset($data[$field]) || empty($data[$field])) {
        http_response_code(400);
        echo json_encode(['error' => "Missing required field: $field"]);
        exit;
    }
}

// Check if user account exists
$stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
$stmt->bind_param("s", $data['email']);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();
$stmt->close();

$user_id = null;

// If user doesn't exist, create one
if (!$user) {
    // Generate a random password
    $random_password = bin2hex(random_bytes(8));
    $hashed_password = password_hash($random_password, PASSWORD_DEFAULT);
    
    $user_stmt = $conn->prepare("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, 'patient')");
    $full_name = $data['firstName'] . ' ' . $data['lastName'];
    $user_stmt->bind_param("sss", $full_name, $data['email'], $hashed_password);
    
    if (!$user_stmt->execute()) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to create user account: ' . $user_stmt->error]);
        exit;
    }
    
    $user_id = $user_stmt->insert_id;
    $user_stmt->close();
} else {
    $user_id = $user['id'];
}

// Check if patient already exists
$check_stmt = $conn->prepare("SELECT id FROM patients WHERE email = ?");
$check_stmt->bind_param("s", $data['email']);
$check_stmt->execute();
$check_result = $check_stmt->get_result();
$check_stmt->close();

if ($check_result->num_rows > 0) {
    http_response_code(409);
    echo json_encode(['error' => 'A patient with this email already exists']);
    exit;
}

// Insert patient data
$stmt = $conn->prepare("INSERT INTO patients (
    user_id, first_name, last_name, email, phone, date_of_birth, 
    address, city, state, zip_code, insurance_provider, insurance_number, 
    emergency_contact_name, emergency_contact_phone
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

$stmt->bind_param(
    "isssssssssssss",
    $user_id,
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
    $data['emergencyContactPhone']
);

if ($stmt->execute()) {
    $patient_id = $stmt->insert_id;
    
    // Return the new patient details
    $response = [
        'id' => (string)$patient_id,
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
        'emergencyContactPhone' => $data['emergencyContactPhone'] ?? null,
        'status' => 'active'
    ];
    
    echo json_encode($response);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to register patient: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
