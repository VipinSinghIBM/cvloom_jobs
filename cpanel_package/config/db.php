<?php
/**
 * ====================================================================
 * Sarkari Global & PurposeHire Recruitment Portal - Database Config
 * ====================================================================
 * 
 * INSTRUCTIONS / HIDAYAT:
 * 1. cPanel me jaakar "MySQL Databases" ya "MySQL Database Wizard" se
 *    ek naya database banayein aur ek user create karke sari permissions de dein.
 * 2. Niche diye gaye 4 parameters ko apne cPanel details se badal dein:
 *    - DB_NAME: Aapke cPanel database ka pura naam (jaise: username_sarkaridb)
 *    - DB_USER: Aapke database user ka pura naam (jaise: username_dbuser)
 *    - DB_PASS: Jo password aapne create karte samay set kiya tha
 *    - DB_HOST: Usually 'localhost' hi rehta hai
 */

define('DB_HOST', 'localhost');
define('DB_NAME', 'YOUR_CPANEL_DATABASE_NAME'); // yaha apna database name dalein
define('DB_USER', 'YOUR_CPANEL_DATABASE_USER'); // yaha apna database username dalein
define('DB_PASS', 'YOUR_CPANEL_DATABASE_PASS'); // yaha apna database password dalein

// Set response header to JSON for API calls
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

try {
    $pdo = new PDO(
        "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
        DB_USER,
        DB_PASS,
        [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ]
    );
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error'   => 'Database Connection Error: ' . $e->getMessage(),
        'hint'    => 'Kripya config/db.php me apna database name, user aur password check karein.'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}
