
# Santa Matilda Clinic Web Application Setup Guide

## Prerequisites

- [XAMPP](https://www.apachefriends.org/download.html) installed
- Node.js and npm installed
- Basic understanding of React, PHP, and MySQL

## Detailed Setup Process

### 1. Database Setup

1.1 Open XAMPP Control Panel
- Start Apache and MySQL services

1.2 Create Database
- Open phpMyAdmin: http://localhost/phpmyadmin
- Click "New" database
- Name: `santa_matilda`
- Collation: `utf8mb4_unicode_ci`
- Click "Create"

1.3 Import Database Schema
- Select `santa_matilda` database
- Go to "Import" tab
- Choose `santa_matilda.sql` file from project's PHP directory
- Click "Go"

### 2. React Application Build

2.1 Prepare Build Configuration
- Open `vite.config.ts`
- Ensure build settings are correct:
  ```typescript
  build: {
    outDir: './dist',  // Output directory for build files
    emptyOutDir: true,
    sourcemap: mode === 'development'
  }
  ```

2.2 Build React Application
```bash
npm run build
```

### 3. Deployment to XAMPP

3.1 Copy React Build Files
- Navigate to XAMPP's `htdocs` directory
- Create a new folder: `santa-matilda-app`
- Copy ALL contents from `dist/` folder to `santa-matilda-app`

3.2 Copy PHP API Files
- Copy `php/santa-matilda-api/` to XAMPP's `htdocs/santa-matilda-api/`

3.3 Configure `.htaccess`
- Ensure proper CORS and routing configuration
- Sample configuration in project's `.htaccess` file

### 4. Apache Configuration

4.1 Enable Required Modules
- Open Apache's `httpd.conf`
- Uncomment/enable:
  ```
  LoadModule rewrite_module modules/mod_rewrite.so
  LoadModule headers_module modules/mod_headers.so
  ```

4.2 Restart Apache Service
- Stop and restart Apache in XAMPP Control Panel

### 5. Debugging and Testing

5.1 Check Deployment
- Open http://localhost/santa-matilda-app
- Verify React app loads correctly

5.2 API Testing
- Test login at http://localhost/santa-matilda-api/auth/login
- Check browser console for any errors

### 6. Common Troubleshooting

- Verify file permissions
- Check PHP error logs
- Ensure matching CORS origins
- Validate database connections

### 7. Security Recommendations

- Use environment variables for sensitive data
- Implement proper input validation
- Keep software and dependencies updated

## Recommended Development Workflow

1. Develop locally with `npm run dev`
2. Build with `npm run build`
3. Deploy build to XAMPP
4. Test thoroughly

## Additional Resources

- Project GitHub Repository
- XAMPP Documentation
- PHP MySQL Integration Guide
