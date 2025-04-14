
<?php
// Required headers for API
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, OPTIONS, POST, PUT, DELETE");

// Handle OPTIONS request for CORS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Database check
$database_status = 'unknown';
$database_message = '';
try {
    require_once 'config/database.php';
    $database = new Database();
    $conn = $database->getConnection();
    
    if ($conn) {
        $database_status = 'connected';
        $database_message = 'Database connection successful';
    } else {
        $database_status = 'error';
        $database_message = 'Failed to connect to database';
    }
} catch (Exception $e) {
    $database_status = 'error';
    $database_message = 'Database error: ' . $e->getMessage();
}

// PHP version check
$php_version = phpversion();
$required_version = '7.4.0';
$php_version_status = version_compare($php_version, $required_version, '>=') ? 'ok' : 'outdated';

// Extensions check
$required_extensions = ['pdo', 'pdo_mysql', 'json'];
$missing_extensions = [];

foreach ($required_extensions as $ext) {
    if (!extension_loaded($ext)) {
        $missing_extensions[] = $ext;
    }
}

$extensions_status = empty($missing_extensions) ? 'ok' : 'missing';

// Return API information
echo json_encode([
    'status' => 'success',
    'message' => 'Santa Matilda API is running',
    'version' => '1.0.0',
    'timestamp' => date('Y-m-d H:i:s'),
    'environment' => [
        'php_version' => $php_version,
        'php_version_status' => $php_version_status,
        'required_php_version' => $required_version,
        'extensions_status' => $extensions_status,
        'missing_extensions' => $missing_extensions,
        'server_software' => $_SERVER['SERVER_SOFTWARE'] ?? 'Unknown'
    ],
    'database' => [
        'status' => $database_status,
        'message' => $database_message
    ]
]);
