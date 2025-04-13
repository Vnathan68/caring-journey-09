
<?php
class Database {
    // Database connection parameters
    private $host = "localhost";
    private $db_name = "santa_matilda";
    private $username = "root";
    private $password = "";
    private $conn;
    
    // Get database connection
    public function getConnection() {
        $this->conn = null;
        
        try {
            $this->conn = new PDO(
                "mysql:host=" . $this->host . ";dbname=" . $this->db_name,
                $this->username,
                $this->password
            );
            $this->conn->exec("set names utf8");
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $exception) {
            echo "Connection error: " . $exception->getMessage();
        }
        
        return $this->conn;
    }
}

// For direct inclusion in other PHP files
if (basename($_SERVER['PHP_SELF']) == basename(__FILE__)) {
    // This code runs only when this file is accessed directly, not when included
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    
    $database = new Database();
    $conn = $database->getConnection();
    
    if ($conn) {
        echo json_encode(["message" => "Database connection successful"]);
    } else {
        echo json_encode(["message" => "Failed to connect to database"]);
    }
}

return new Database();
