
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

// Only admin, doctors and secretary/nurse roles can view all patients
$allowed_roles = ['admin', 'doctor', 'secretary_nurse'];
if (!in_array($_SESSION['user_role'], $allowed_roles)) {
    http_response_code(403);
    echo json_encode(['error' => 'Insufficient permissions']);
    exit;
}

// Get database connection
$conn = require '../config/database.php';

// Optional filtering
$search = isset($_GET['search']) ? $_GET['search'] : '';
$status = isset($_GET['status']) ? $_GET['status'] : '';

// Build the query based on filters
$query = "SELECT id, first_name, last_name, email, phone, date_of_birth, 
          insurance_provider, status, created_at as last_visit FROM patients WHERE 1=1";

if (!empty($search)) {
    $search = "%$search%";
    $query .= " AND (first_name LIKE ? OR last_name LIKE ? OR email LIKE ? OR phone LIKE ?)";
}

if (!empty($status) && in_array($status, ['active', 'inactive', 'pending'])) {
    $query .= " AND status = ?";
}

$query .= " ORDER BY last_name, first_name";

// Prepare and execute the statement
$stmt = $conn->prepare($query);

// Bind parameters if needed
if (!empty($search) && !empty($status)) {
    $stmt->bind_param("sssss", $search, $search, $search, $search, $status);
} elseif (!empty($search)) {
    $stmt->bind_param("ssss", $search, $search, $search, $search);
} elseif (!empty($status)) {
    $stmt->bind_param("s", $status);
}

$stmt->execute();
$result = $stmt->get_result();

// Fetch all patients
$patients = [];
while ($row = $result->fetch_assoc()) {
    // Format date of birth
    $date_of_birth = $row['date_of_birth'];
    
    // Format lastVisit (created_at temporarily used as last_visit)
    $last_visit = date('Y-m-d', strtotime($row['last_visit']));
    
    // Build formatted patient data
    $patients[] = [
        'id' => $row['id'],
        'firstName' => $row['first_name'],
        'lastName' => $row['last_name'],
        'name' => $row['first_name'] . ' ' . $row['last_name'],
        'email' => $row['email'],
        'phone' => $row['phone'],
        'dateOfBirth' => $date_of_birth,
        'lastVisit' => $last_visit,
        'insuranceProvider' => $row['insurance_provider'],
        'status' => $row['status']
    ];
}

echo json_encode($patients);

$stmt->close();
$conn->close();
