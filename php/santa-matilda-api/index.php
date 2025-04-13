
<?php
// Required headers for API
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");

// Return basic API information
echo json_encode([
    'status' => 'success',
    'message' => 'Santa Matilda API is running',
    'version' => '1.0.0',
    'timestamp' => date('Y-m-d H:i:s')
]);
