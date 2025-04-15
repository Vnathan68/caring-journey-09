
<?php
// Required headers for API - Correct CORS settings for React app
header("Access-Control-Allow-Origin: http://localhost:8080");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

// Handle OPTIONS request for CORS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

// Return basic API info
echo json_encode([
    'status' => 'success',
    'message' => 'Santa Matilda Clinic API is running',
    'version' => '1.0.0',
    'timestamp' => date('Y-m-d H:i:s')
]);
?>
