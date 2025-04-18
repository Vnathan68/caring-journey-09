# XAMPP Integration Guide for Santa Matilda Clinic

This document provides step-by-step instructions for integrating your React application with XAMPP to handle authentication and database operations.

## Prerequisites

- [XAMPP](https://www.apachefriends.org/download.html) installed on your system
- Basic knowledge of PHP and MySQL
- Node.js and npm installed for React development

## Step 1: Set Up XAMPP and MySQL Database

1. **Start XAMPP Services:**
   - Launch XAMPP Control Panel
   - Start Apache and MySQL services
   - Verify both are running (green indicators)

2. **Create Database:**
   - Open http://localhost/phpmyadmin in your browser
   - Click "New" on the left sidebar
   - Enter "santa_matilda" as the database name
   - Set collation to "utf8mb4_unicode_ci"
   - Click "Create"

3. **Import Database Structure:**
   - Navigate to the created database
   - Click "Import" in the top menu
   - Choose the `santa_matilda.sql` file from the project files (if available)
   - If the SQL file is not available, manually create tables according to your application's needs

## Step 2: Set Up PHP API Files

1. **Copy API Files to XAMPP:**
   - Navigate to XAMPP installation directory (`C:\xampp` on Windows, `/Applications/XAMPP` on Mac, or `/opt/lampp` on Linux)
   - Go to the `htdocs` directory
   - Create a folder named `santa-matilda-api`
   - Copy all PHP files from the `php/santa-matilda-api` folder in your project to this new folder

2. **Configure Database Connection:**
   - Open `santa-matilda-api/config/database.php`
   - Verify database credentials match your XAMPP setup:
     ```php
     private $host = "localhost";
     private $db_name = "santa_matilda";
     private $username = "root";
     private $password = ""; // Default XAMPP has no password
     ```

3. **Test API Connection:**
   - Open http://localhost/santa-matilda-api/ in your browser
   - You should see a welcome message or JSON response indicating the API is working

## Step 3: Configure React Application

1. **Set API Base URL:**
   - Ensure the API base URL in `src/services/api-service.ts` is correctly pointing to your XAMPP API:
     ```javascript
     const API_BASE_URL = 'http://localhost/santa-matilda-api';
     ```

2. **Build React Application:**
   - Open terminal in your React project directory
   - Run `npm run build` to create production build
   - This will generate a `dist` directory with your built React app

3. **Deploy to XAMPP:**
   - Copy all contents from the `dist` directory to a new folder in XAMPP's `htdocs` directory (e.g., `htdocs/santa-matilda-app`)
   - Alternatively, you can set up your vite.config.ts to build directly to the XAMPP htdocs directory:
     ```typescript
     export default defineConfig({
       // Other config options...
       build: {
         outDir: 'C:/xampp/htdocs/santa-matilda-app', // Adjust path according to your XAMPP installation
       },
     });
     ```

## Step 4: Configure Apache for React Routing

1. **Create .htaccess File:**
   - Create a file named `.htaccess` in your React app's directory in htdocs
   - Add the following content:
     ```
     <IfModule mod_rewrite.c>
       RewriteEngine On
       RewriteBase /santa-matilda-app/
       RewriteRule ^index\.html$ - [L]
       RewriteCond %{REQUEST_FILENAME} !-f
       RewriteCond %{REQUEST_FILENAME} !-d
       RewriteRule . /santa-matilda-app/index.html [L]
     </IfModule>
     ```
   - This enables React Router to handle client-side routing

2. **Enable Apache mod_rewrite:**
   - Open XAMPP Control Panel
   - Click "Config" for Apache
   - Select "httpd.conf"
   - Find and uncomment the line: `LoadModule rewrite_module modules/mod_rewrite.so` (remove #)
   - Save and restart Apache

## Step 5: Testing the Integration

1. **Access Your React App:**
   - Open http://localhost/santa-matilda-app in your browser
   - The React app should load and be able to communicate with the PHP API

2. **Test Authentication:**
   - Try logging in with test credentials:
     - Email: admin@example.com
     - Password: password123
   - The app should connect to the PHP API, which validates against the MySQL database

3. **Troubleshooting Connection Issues:**
   - Check browser console for CORS errors
   - Verify API endpoints are correctly set up
   - Confirm database connection is working

## Step 6: Setting Up for Production

For production deployment:

1. **Set up proper domain and HTTPS**
2. **Update API URLs to production values**
3. **Implement proper security measures**
4. **Consider using environment variables for configuration**

## Common Issues and Solutions

### CORS Issues
- Ensure proper CORS headers are set in both PHP API and Apache config
- Check that credentials handling is consistent

### Database Connection Errors
- Verify MySQL service is running
- Confirm database credentials are correct
- Test connection with PHPMyAdmin

### Routing Issues
- Check .htaccess file configuration
- Ensure mod_rewrite is enabled
- Verify file paths in configuration

### Authentication Problems
- Test API endpoints directly using tools like Postman
- Check PHP session configuration
- Verify cookie handling is working correctly

For additional support, refer to the project documentation or contact the development team.
