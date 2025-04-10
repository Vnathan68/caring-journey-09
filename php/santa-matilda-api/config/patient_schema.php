
<?php
/**
 * Patient database schema
 * This file creates the necessary tables for patient data management
 */

function create_patient_tables($conn) {
    // Patients table
    $patients_table = "
    CREATE TABLE IF NOT EXISTS patients (
        id INT(11) AUTO_INCREMENT PRIMARY KEY,
        user_id INT(11) NOT NULL,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        date_of_birth DATE NOT NULL,
        address VARCHAR(255) NOT NULL,
        city VARCHAR(100) NOT NULL,
        state VARCHAR(100) NOT NULL,
        zip_code VARCHAR(20) NOT NULL,
        insurance_provider VARCHAR(100),
        insurance_number VARCHAR(100),
        emergency_contact_name VARCHAR(200),
        emergency_contact_phone VARCHAR(20),
        status ENUM('active', 'inactive', 'pending') DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )";

    if (!mysqli_query($conn, $patients_table)) {
        die("Error creating patients table: " . mysqli_error($conn));
    }

    // Medical history table
    $medical_history_table = "
    CREATE TABLE IF NOT EXISTS medical_history (
        id INT(11) AUTO_INCREMENT PRIMARY KEY,
        patient_id INT(11) NOT NULL,
        type VARCHAR(100) NOT NULL,
        date DATE NOT NULL,
        description TEXT NOT NULL,
        doctor_name VARCHAR(200),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
    )";

    if (!mysqli_query($conn, $medical_history_table)) {
        die("Error creating medical_history table: " . mysqli_error($conn));
    }

    // Medical history attachments table
    $attachments_table = "
    CREATE TABLE IF NOT EXISTS medical_attachments (
        id INT(11) AUTO_INCREMENT PRIMARY KEY,
        history_id INT(11) NOT NULL,
        file_path VARCHAR(255) NOT NULL,
        file_name VARCHAR(255) NOT NULL,
        file_type VARCHAR(100) NOT NULL,
        uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (history_id) REFERENCES medical_history(id) ON DELETE CASCADE
    )";

    if (!mysqli_query($conn, $attachments_table)) {
        die("Error creating medical_attachments table: " . mysqli_error($conn));
    }

    // Pregnancy data table
    $pregnancy_table = "
    CREATE TABLE IF NOT EXISTS pregnancy_data (
        id INT(11) AUTO_INCREMENT PRIMARY KEY,
        patient_id INT(11) NOT NULL,
        is_pregnant TINYINT(1) NOT NULL DEFAULT 0,
        gestational_age INT(11),
        due_date DATE,
        last_checkup DATE,
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
    )";

    if (!mysqli_query($conn, $pregnancy_table)) {
        die("Error creating pregnancy_data table: " . mysqli_error($conn));
    }

    return true;
}
