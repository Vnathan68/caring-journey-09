
-- phpMyAdmin SQL Dump
-- Santa Matilda Clinic Database Setup

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `santa_matilda`
--
CREATE DATABASE IF NOT EXISTS `santa_matilda` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `santa_matilda`;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','doctor','secretary_nurse','patient') NOT NULL DEFAULT 'patient',
  `two_factor_enabled` tinyint(1) NOT NULL DEFAULT '0',
  `two_factor_secret` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE IF NOT EXISTS `admins` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `role` enum('system_admin','clinic_admin') NOT NULL DEFAULT 'system_admin',
  `last_login` datetime DEFAULT NULL,
  `profile_image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `admin_user_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `doctors`
--

CREATE TABLE IF NOT EXISTS `doctors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `specialty` varchar(255) NOT NULL,
  `bio` text,
  `consultation_fee` decimal(10,2) DEFAULT NULL,
  `license_number` varchar(50) NOT NULL,
  `start_date` date NOT NULL,
  `profile_image` varchar(255) DEFAULT NULL,
  `status` enum('active','on_leave','inactive') NOT NULL DEFAULT 'active',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `doctor_user_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `doctor_availability`
--

CREATE TABLE IF NOT EXISTS `doctor_availability` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `doctor_id` int(11) NOT NULL,
  `day_of_week` tinyint(1) NOT NULL COMMENT '0=Sunday, 1=Monday, ..., 6=Saturday',
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `is_available` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `doctor_id` (`doctor_id`),
  CONSTRAINT `availability_doctor_fk` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `patients`
--

CREATE TABLE IF NOT EXISTS `patients` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `date_of_birth` date NOT NULL,
  `address` varchar(255) NOT NULL,
  `city` varchar(100) NOT NULL,
  `state` varchar(100) NOT NULL,
  `zip_code` varchar(20) NOT NULL,
  `insurance_provider` varchar(255) DEFAULT NULL,
  `insurance_number` varchar(50) DEFAULT NULL,
  `emergency_contact_name` varchar(255) DEFAULT NULL,
  `emergency_contact_phone` varchar(20) DEFAULT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `patient_user_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `secretary_nurses`
--

CREATE TABLE IF NOT EXISTS `secretary_nurses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `position` varchar(100) NOT NULL,
  `department` varchar(100) NOT NULL,
  `is_nurse` tinyint(1) NOT NULL DEFAULT '0',
  `hire_date` date NOT NULL,
  `profile_image` varchar(255) DEFAULT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `secretary_nurse_user_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

-- Insert demo admin user (password: password123)
INSERT INTO `users` (`name`, `email`, `password`, `role`) VALUES
('Admin User', 'admin@example.com', '$2y$10$9X8xEAiKY6A/hJyukSlud.ft3JfbsXAYVw7xwFguj.qNyvT0KQ5P.', 'admin');

-- Insert admin record
INSERT INTO `admins` (`user_id`, `first_name`, `last_name`, `email`, `phone`, `role`) VALUES
(1, 'Admin', 'User', 'admin@example.com', '555-123-4567', 'system_admin');

-- Insert demo doctor user (password: password123)
INSERT INTO `users` (`name`, `email`, `password`, `role`) VALUES
('Dr. Maria Santos', 'doctor@example.com', '$2y$10$9X8xEAiKY6A/hJyukSlud.ft3JfbsXAYVw7xwFguj.qNyvT0KQ5P.', 'doctor');

-- Insert doctor record
INSERT INTO `doctors` (`user_id`, `first_name`, `last_name`, `email`, `phone`, `specialty`, `bio`, `consultation_fee`, `license_number`, `start_date`) VALUES
(2, 'Maria', 'Santos', 'doctor@example.com', '555-987-6543', 'Obstetrics & Gynecology', 'Experienced OB-GYN with 15 years of practice', 150.00, 'MD12345678', '2008-06-15');

-- Insert demo secretary/nurse user (password: password123)
INSERT INTO `users` (`name`, `email`, `password`, `role`) VALUES
('Reception Staff', 'cashier@example.com', '$2y$10$9X8xEAiKY6A/hJyukSlud.ft3JfbsXAYVw7xwFguj.qNyvT0KQ5P.', 'secretary_nurse');

-- Insert secretary/nurse record
INSERT INTO `secretary_nurses` (`user_id`, `first_name`, `last_name`, `email`, `phone`, `position`, `department`, `is_nurse`, `hire_date`) VALUES
(3, 'Reception', 'Staff', 'cashier@example.com', '555-456-7890', 'Receptionist', 'Front Desk', 0, '2020-03-10');

-- Insert demo patient user (password: password123)
INSERT INTO `users` (`name`, `email`, `password`, `role`) VALUES
('Test Patient', 'patient@example.com', '$2y$10$9X8xEAiKY6A/hJyukSlud.ft3JfbsXAYVw7xwFguj.qNyvT0KQ5P.', 'patient');

-- Insert patient record
INSERT INTO `patients` (`user_id`, `first_name`, `last_name`, `email`, `phone`, `date_of_birth`, `address`, `city`, `state`, `zip_code`, `insurance_provider`, `insurance_number`) VALUES
(4, 'Test', 'Patient', 'patient@example.com', '555-789-0123', '1990-01-15', '123 Main St', 'Anytown', 'California', '12345', 'HealthCare Inc.', 'HC123456789');
