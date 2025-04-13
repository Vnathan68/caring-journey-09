
<?php
/**
 * Sample data for doctors table
 * 
 * This script creates sample doctor records in the database for testing
 */

// Include database connection file
include_once 'database.php';

// Create a new database connection
$database = new Database();
$conn = $database->getConnection();

// Begin transaction
$conn->beginTransaction();

try {
    // Create sample user accounts for doctors
    $userQuery = "INSERT INTO users (name, email, password, role) VALUES (:name, :email, :password, 'doctor')";
    $userStmt = $conn->prepare($userQuery);
    
    $hashedPassword = password_hash('doctor123', PASSWORD_DEFAULT);
    
    $sampleDoctors = [
        [
            'name' => 'Dr. Maria Santos',
            'email' => 'maria.santos@santamatilda.com',
            'first_name' => 'Maria',
            'last_name' => 'Santos',
            'phone' => '(555) 123-4567',
            'specialty' => 'Obstetrics',
            'bio' => 'Dr. Santos specializes in prenatal care and high-risk pregnancies.',
            'consultation_fee' => 150.00,
            'license_number' => 'MED12345',
            'start_date' => '2015-03-15',
            'status' => 'active'
        ],
        [
            'name' => 'Dr. Ana Ramirez',
            'email' => 'ana.ramirez@santamatilda.com',
            'first_name' => 'Ana',
            'last_name' => 'Ramirez',
            'phone' => '(555) 234-5678',
            'specialty' => 'Gynecology',
            'bio' => 'Dr. Ramirez specializes in gynecological surgeries and women\'s health.',
            'consultation_fee' => 175.00,
            'license_number' => 'MED23456',
            'start_date' => '2013-06-01',
            'status' => 'active'
        ],
        [
            'name' => 'Dr. Elena Castro',
            'email' => 'elena.castro@santamatilda.com',
            'first_name' => 'Elena',
            'last_name' => 'Castro',
            'phone' => '(555) 345-6789',
            'specialty' => 'Reproductive Medicine',
            'bio' => 'Dr. Castro is an expert in fertility treatments and assisted reproduction.',
            'consultation_fee' => 200.00,
            'license_number' => 'MED34567',
            'start_date' => '2018-09-12',
            'status' => 'active'
        ],
        [
            'name' => 'Dr. Carlos Rodriguez',
            'email' => 'carlos.rodriguez@santamatilda.com',
            'first_name' => 'Carlos',
            'last_name' => 'Rodriguez',
            'phone' => '(555) 456-7890',
            'specialty' => 'Maternal-Fetal Medicine',
            'bio' => 'Dr. Rodriguez focuses on high-risk pregnancies and prenatal diagnostics.',
            'consultation_fee' => 225.00,
            'license_number' => 'MED45678',
            'start_date' => '2010-04-22',
            'status' => 'on_leave'
        ],
        [
            'name' => 'Dr. Isabella Morales',
            'email' => 'isabella.morales@santamatilda.com',
            'first_name' => 'Isabella',
            'last_name' => 'Morales',
            'phone' => '(555) 567-8901',
            'specialty' => 'Gynecologic Oncology',
            'bio' => 'Dr. Morales specializes in the diagnosis and treatment of gynecologic cancers.',
            'consultation_fee' => 250.00,
            'license_number' => 'MED56789',
            'start_date' => '2012-11-05',
            'status' => 'inactive'
        ]
    ];
    
    foreach ($sampleDoctors as $doctor) {
        // Insert user account
        $userStmt->bindParam(':name', $doctor['name']);
        $userStmt->bindParam(':email', $doctor['email']);
        $userStmt->bindParam(':password', $hashedPassword);
        $userStmt->execute();
        
        $userId = $conn->lastInsertId();
        
        // Insert doctor record
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
                :status
            )
        ";
        
        $doctorStmt = $conn->prepare($doctorQuery);
        
        $doctorStmt->bindParam(':user_id', $userId);
        $doctorStmt->bindParam(':first_name', $doctor['first_name']);
        $doctorStmt->bindParam(':last_name', $doctor['last_name']);
        $doctorStmt->bindParam(':email', $doctor['email']);
        $doctorStmt->bindParam(':phone', $doctor['phone']);
        $doctorStmt->bindParam(':specialty', $doctor['specialty']);
        $doctorStmt->bindParam(':bio', $doctor['bio']);
        $doctorStmt->bindParam(':consultation_fee', $doctor['consultation_fee']);
        $doctorStmt->bindParam(':license_number', $doctor['license_number']);
        $doctorStmt->bindParam(':start_date', $doctor['start_date']);
        $doctorStmt->bindParam(':status', $doctor['status']);
        
        $doctorStmt->execute();
        
        $doctorId = $conn->lastInsertId();
        
        // Insert availability
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
        
        $weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
        $startTimes = ['09:00:00', '10:00:00', '08:30:00', '09:30:00', '08:00:00'];
        $endTimes = ['17:00:00', '18:00:00', '16:30:00', '17:30:00', '16:00:00'];
        
        for ($i = 0; $i < count($weekdays); $i++) {
            // Randomize which days the doctor works
            if (rand(0, 1)) {
                $availStmt->bindParam(':doctor_id', $doctorId);
                $availStmt->bindParam(':day_of_week', $weekdays[$i]);
                $availStmt->bindParam(':start_time', $startTimes[$i % count($startTimes)]);
                $availStmt->bindParam(':end_time', $endTimes[$i % count($endTimes)]);
                $availStmt->execute();
            }
        }
    }
    
    // Commit the transaction
    $conn->commit();
    
    echo json_encode([
        'status' => 'success',
        'message' => 'Sample doctor data created successfully'
    ]);
    
} catch (PDOException $e) {
    // Rollback the transaction on error
    $conn->rollBack();
    
    echo json_encode([
        'status' => 'error',
        'message' => 'Database error: ' . $e->getMessage()
    ]);
}
