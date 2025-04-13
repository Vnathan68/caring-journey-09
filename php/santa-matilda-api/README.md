
# Santa Matilda API - PHP Backend Setup

This document provides instructions for setting up the PHP backend for the Santa Matilda clinic management system.

## Prerequisites

- PHP 7.4 or higher
- MySQL/MariaDB
- Apache web server
- PDO PHP extension

## Setup Instructions

1. Copy the `santa-matilda-api` folder to your web server's document root (e.g., `htdocs` for XAMPP, `www` for WAMP).

2. Create a new MySQL database called `santa_matilda`.

3. Import the database schema:
   - Run the schema files in the `config` directory to create necessary tables.
   - You can import them manually or use a tool like phpMyAdmin.

4. Configure the database connection:
   - Open `config/database.php` and update the connection details if necessary.
   - By default, it uses:
     - Host: localhost
     - DB Name: santa_matilda
     - Username: root
     - Password: (blank)

5. Test the API:
   - Visit `http://localhost/santa-matilda-api/` in your browser.
   - You should see a JSON response indicating that the API is running.

## API Endpoints

The API provides the following endpoints:

### Authentication
- `/auth/login` - User login
- `/auth/register` - User registration
- More auth endpoints available

### Patients
- `/patients/list` - Get all patients
- `/patients/get` - Get a specific patient
- More patient endpoints available

### Doctors
- `/doctors/list` - Get all doctors
- `/doctors/get` - Get a specific doctor
- More doctor endpoints available

### Secretary/Nurses
- `/secretary-nurses/list` - Get all secretary/nurses
- `/secretary-nurses/get` - Get a specific secretary/nurse
- More secretary/nurse endpoints available

### Admins
- `/admins/list` - Get all admins
- `/admins/get` - Get a specific admin
- More admin endpoints available

## Troubleshooting

If you encounter issues:

1. Check that your web server is running.
2. Ensure your database is properly configured.
3. Look for error logs in your web server's error log.
4. Check file permissions on the API directory.
5. Verify that all required PHP extensions are enabled.
