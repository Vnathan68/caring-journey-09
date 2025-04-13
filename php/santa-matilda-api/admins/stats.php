
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
    // Get total patients count
    $patients_query = "SELECT COUNT(*) as total FROM patients";
    $patients_stmt = $conn->prepare($patients_query);
    $patients_stmt->execute();
    $patients_row = $patients_stmt->fetch(PDO::FETCH_ASSOC);
    $total_patients = $patients_row['total'];
    
    // Get total doctors count
    $doctors_query = "SELECT COUNT(*) as total FROM doctors";
    $doctors_stmt = $conn->prepare($doctors_query);
    $doctors_stmt->execute();
    $doctors_row = $doctors_stmt->fetch(PDO::FETCH_ASSOC);
    $total_doctors = $doctors_row['total'];
    
    // Get total staff count
    $staff_query = "SELECT COUNT(*) as total FROM secretary_nurses";
    $staff_stmt = $conn->prepare($staff_query);
    $staff_stmt->execute();
    $staff_row = $staff_stmt->fetch(PDO::FETCH_ASSOC);
    $total_staff = $staff_row['total'];
    
    // Get appointments today count (assuming you have an appointments table)
    $today = date('Y-m-d');
    $appointments_query = "SELECT COUNT(*) as total FROM appointments WHERE DATE(appointment_date) = :today";
    $appointments_stmt = $conn->prepare($appointments_query);
    $appointments_stmt->bindParam(':today', $today);
    $appointments_stmt->execute();
    $appointments_row = $appointments_stmt->fetch(PDO::FETCH_ASSOC);
    $appointments_today = isset($appointments_row['total']) ? $appointments_row['total'] : 0;
    
    // Get new registrations this week
    $week_start = date('Y-m-d', strtotime('-7 days'));
    $registrations_query = "SELECT COUNT(*) as total FROM patients WHERE DATE(created_at) >= :week_start";
    $registrations_stmt = $conn->prepare($registrations_query);
    $registrations_stmt->bindParam(':week_start', $week_start);
    $registrations_stmt->execute();
    $registrations_row = $registrations_stmt->fetch(PDO::FETCH_ASSOC);
    $new_registrations = $registrations_row['total'];
    
    // Get revenue this month (mock data for demonstration)
    $revenue_this_month = 15000.00; // placeholder
    
    // Return the dashboard stats
    echo json_encode([
        'status' => 'success',
        'data' => [
            'totalPatients' => (int)$total_patients,
            'totalDoctors' => (int)$total_doctors,
            'totalStaff' => (int)$total_staff,
            'appointmentsToday' => (int)$appointments_today,
            'newRegistrationsThisWeek' => (int)$new_registrations,
            'revenueThisMonth' => (float)$revenue_this_month
        ]
    ]);
} catch (PDOException $e) {
    // Return error message
    echo json_encode([
        'status' => 'error',
        'message' => 'Database error: ' . $e->getMessage()
    ]);
}
