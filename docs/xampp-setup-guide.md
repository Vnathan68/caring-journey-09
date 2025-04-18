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
   - Choose the `santa_matilda.sql` file from the PHP folder (`php/santa-matilda-api/config/santa_matilda.sql`)
   - Click "Go" to import the database structure

## Step 2: Set Up PHP API Files

1. **Copy API Files to XAMPP:**
   - Navigate to XAMPP installation directory (`C:\xampp` on Windows, `/Applications/XAMPP` on Mac, or `/opt/lampp` on Linux)
   - Go to the `htdocs` directory
   - Create a folder named `santa-matilda-api`
   - Copy all PHP files from the `php/santa-matilda-api` folder in your project to this new folder:
     ```
     copy php/santa-matilda-api/* C:/xampp/htdocs/santa-matilda-api/
     ```
     (On Mac/Linux: `cp -r php/santa-matilda-api/* /Applications/XAMPP/htdocs/santa-matilda-api/`)

2. **Verify File Permissions:**
   - Ensure PHP files have the correct permissions:
     - Windows: Right-click folder → Properties → Security → Edit → Allow "Read & Execute" and "Read"
     - Mac/Linux: `chmod -R 755 /path/to/htdocs/santa-matilda-api`

3. **Configure Database Connection:**
   - Open `santa-matilda-api/config/database.php`
   - Verify database credentials match your XAMPP setup:
     ```php
     private $host = "localhost";
     private $db_name = "santa_matilda";
     private $username = "root";
     private $password = ""; // Default XAMPP has no password
     ```

4. **Test API Connection:**
   - Open http://localhost/santa-matilda-api/ in your browser
   - You should see a welcome message or JSON response indicating the API is working
   - If not, check Apache error logs in XAMPP control panel

## Step 3: Enable Apache Modules and Configuration

1. **Enable Required Apache Modules:**
   - Open XAMPP Control Panel
   - Click "Config" for Apache
   - Select "httpd.conf"
   - Ensure these modules are uncommented (no # at the start):
     ```
     LoadModule rewrite_module modules/mod_rewrite.so
     LoadModule headers_module modules/mod_headers.so
     ```
   - Save the file and restart Apache

2. **Configure Apache for CORS and PHP:**
   - Make sure your `.htaccess` file is properly set up in the `santa-matilda-api` folder
   - If you get CORS errors, verify that the Access-Control-Allow-Origin header is correctly set to your React app's URL

## Step 4: Build and Deploy React Application

1. **Configure React for Production Build:**
   - Verify your `vite.config.ts` uses relative paths:
     ```typescript
     base: './',
     build: {
       outDir: './dist',
       // Other build settings...
     }
     ```

2. **Build React Application:**
   - Run `npm run build` in your project directory
   - This creates optimized files in the `dist` folder

3. **Deploy to XAMPP:**
   - Create a folder for your app in htdocs (e.g., `santa-matilda-app`)
   - Copy all contents from `dist` to this folder:
     ```
     copy dist/* C:/xampp/htdocs/santa-matilda-app/
     ```
     (On Mac/Linux: `cp -r dist/* /Applications/XAMPP/htdocs/santa-matilda-app/`)

4. **Set Up React Routing for Apache:**
   - Create a `.htaccess` file in your React app folder with:
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

## Step 5: Troubleshooting Common Issues

### API Returns HTML Instead of JSON
If you see "Unexpected token '<', '<!DOCTYPE...'" errors:
1. Check your PHP files for HTML output before headers
2. View the raw API response in browser dev tools to see what's being returned
3. Ensure PHP errors are not being displayed (use error logging instead)
4. Add `ini_set('display_errors', 0);` at the top of your PHP files

### CORS Errors
If you get CORS errors:
1. Verify `.htaccess` in your API folder has correct CORS headers
2. Check that Origin header exactly matches your app's URL (including http/https)
3. Ensure mod_headers is enabled in Apache
4. Check each PHP file has proper CORS headers before any output

### API Not Found (404) Errors
1. Check file paths and URL parameters
2. Verify URL rewriting is working correctly
3. Check Apache configuration and enable mod_rewrite

### Database Connection Issues
1. Check database credentials in config file
2. Verify MySQL service is running
3. Test database connection with a simple PHP script
4. Check MySQL user permissions

## Step 6: Testing Your Setup

1. **Access Your React App:**
   - Open http://localhost/santa-matilda-app in your browser
   - The app should load and function properly

2. **Test Authentication:**
   - Use test credentials from the sample database:
     - Admin: admin@example.com / password123
     - Doctor: doctor@example.com / password123
     - Patient: patient@example.com / password123

3. **Debug Mode:**
   - For development testing, enable console logs in your API service
   - Check browser console for detailed error information
   - Use browser network tab to inspect API requests and responses

## Conclusion

Your Santa Matilda Clinic application should now be fully integrated with XAMPP, with authentication and database operations working properly. If you encounter issues, review the troubleshooting section or consult the XAMPP documentation.
