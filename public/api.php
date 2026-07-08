<?php
// Set headers for CORS and JSON response
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Admin-Token");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$dataPath = __DIR__ . '/data.json.php';
$uploadsDir = __DIR__ . '/uploads';

// Helper to read and decode JSON files with PHP security headers
function readSecureJson($path) {
    if (!file_exists($path)) {
        return [];
    }
    $content = file_get_contents($path);
    $pos = strpos($content, '?>');
    if ($pos === false) {
        return [];
    }
    $json = substr($content, $pos + 2);
    return json_decode(trim($json), true) ?: [];
}

// Helper to encode and write JSON files with PHP security headers
function writeSecureJson($path, $data) {
    $header = "<?php header('HTTP/1.0 403 Forbidden'); exit; ?>\n";
    $json = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
    return file_put_contents($path, $header . $json) !== false;
}

// Helper to get Admin Token from headers
function getAdminToken() {
    $headers = getallheaders();
    if (isset($headers['X-Admin-Token'])) {
        return $headers['X-Admin-Token'];
    }
    if (isset($headers['Authorization'])) {
        return str_replace('Bearer ', '', $headers['Authorization']);
    }
    return '';
}

// Helper to verify token
function verifyAdmin($dataPath) {
    $token = getAdminToken();
    if (empty($token)) {
        return false;
    }
    $data = readSecureJson($dataPath);
    if (!isset($data['active_tokens']) || !is_array($data['active_tokens'])) {
        return false;
    }
    if (isset($data['active_tokens'][$token])) {
        $expiry = $data['active_tokens'][$token];
        if ($expiry > time()) {
            return true;
        }
    }
    return false;
}

$action = isset($_GET['action']) ? $_GET['action'] : '';

switch ($action) {
    case 'get_data':
        $data = readSecureJson($dataPath);
        // Exclude password and active tokens from public output
        unset($data['password_hash']);
        unset($data['active_tokens']);
        echo json_encode(["status" => "success", "data" => $data]);
        break;

    case 'login':
        $input = json_decode(file_get_contents('php://input'), true);
        $password = isset($input['password']) ? $input['password'] : '';
        if (empty($password)) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Password required"]);
            exit();
        }

        $data = readSecureJson($dataPath);
        $storedHash = isset($data['password_hash']) ? $data['password_hash'] : '';

        $authenticated = false;
        // If stored hash is plaintext (default setup), update it to a proper hash on first login
        if ($storedHash === 'doctor123') {
            if ($password === 'doctor123') {
                $storedHash = password_hash('doctor123', PASSWORD_DEFAULT);
                $data['password_hash'] = $storedHash;
                $authenticated = true;
            }
        } else {
            if (password_verify($password, $storedHash)) {
                $authenticated = true;
            }
        }

        if ($authenticated) {
            // Generate token
            $token = bin2hex(openssl_random_pseudo_bytes(16));
            if (empty($token)) {
                $token = md5(uniqid(rand(), true));
            }
            
            // Set session token with 2-hour expiry
            if (!isset($data['active_tokens']) || !is_array($data['active_tokens'])) {
                $data['active_tokens'] = [];
            }
            // Prune expired tokens
            foreach ($data['active_tokens'] as $t => $exp) {
                if ($exp < time()) {
                    unset($data['active_tokens'][$t]);
                }
            }
            $data['active_tokens'][$token] = time() + (2 * 3600); // 2 hours
            writeSecureJson($dataPath, $data);

            echo json_encode(["status" => "success", "token" => $token]);
        } else {
            http_response_code(401);
            echo json_encode(["status" => "error", "message" => "Invalid password"]);
        }
        break;

    case 'update_profile':
        if (!verifyAdmin($dataPath)) {
            http_response_code(403);
            echo json_encode(["status" => "error", "message" => "Unauthorized"]);
            exit();
        }
        $input = json_decode(file_get_contents('php://input'), true);
        $doctorData = isset($input['doctor']) ? $input['doctor'] : null;
        if (!$doctorData) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Invalid profile data"]);
            exit();
        }

        $data = readSecureJson($dataPath);
        $data['doctor'] = $doctorData;
        if (writeSecureJson($dataPath, $data)) {
            echo json_encode(["status" => "success", "message" => "Profile updated"]);
        } else {
            http_response_code(500);
            echo json_encode(["status" => "error", "message" => "Failed to save profile"]);
        }
        break;

    case 'manage_team':
        if (!verifyAdmin($dataPath)) {
            http_response_code(403);
            echo json_encode(["status" => "error", "message" => "Unauthorized"]);
            exit();
        }
        $input = json_decode(file_get_contents('php://input'), true);
        $teamData = isset($input['team']) ? $input['team'] : null;
        if (!is_array($teamData)) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Invalid team data"]);
            exit();
        }

        $data = readSecureJson($dataPath);
        $data['team'] = $teamData;
        if (writeSecureJson($dataPath, $data)) {
            echo json_encode(["status" => "success", "message" => "Team updated"]);
        } else {
            http_response_code(500);
            echo json_encode(["status" => "error", "message" => "Failed to save team"]);
        }
        break;

    case 'manage_articles':
        if (!verifyAdmin($dataPath)) {
            http_response_code(403);
            echo json_encode(["status" => "error", "message" => "Unauthorized"]);
            exit();
        }
        $input = json_decode(file_get_contents('php://input'), true);
        $articlesData = isset($input['articles']) ? $input['articles'] : null;
        if (!is_array($articlesData)) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Invalid articles data"]);
            exit();
        }

        $data = readSecureJson($dataPath);
        $data['articles'] = $articlesData;
        if (writeSecureJson($dataPath, $data)) {
            echo json_encode(["status" => "success", "message" => "Articles updated"]);
        } else {
            http_response_code(500);
            echo json_encode(["status" => "error", "message" => "Failed to save articles"]);
        }
        break;

    case 'manage_blogs':
        if (!verifyAdmin($dataPath)) {
            http_response_code(403);
            echo json_encode(["status" => "error", "message" => "Unauthorized"]);
            exit();
        }
        $input = json_decode(file_get_contents('php://input'), true);
        $blogsData = isset($input['blogs']) ? $input['blogs'] : null;
        if (!is_array($blogsData)) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Invalid blogs data"]);
            exit();
        }

        $data = readSecureJson($dataPath);
        $data['blogs'] = $blogsData;
        if (writeSecureJson($dataPath, $data)) {
            echo json_encode(["status" => "success", "message" => "Blogs updated"]);
        } else {
            http_response_code(500);
            echo json_encode(["status" => "error", "message" => "Failed to save blogs"]);
        }
        break;

    case 'manage_videos':
        if (!verifyAdmin($dataPath)) {
            http_response_code(403);
            echo json_encode(["status" => "error", "message" => "Unauthorized"]);
            exit();
        }
        $input = json_decode(file_get_contents('php://input'), true);
        $videosData = isset($input['videos']) ? $input['videos'] : null;
        if (!is_array($videosData)) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Invalid videos data"]);
            exit();
        }

        $data = readSecureJson($dataPath);
        $data['videos'] = $videosData;
        if (writeSecureJson($dataPath, $data)) {
            echo json_encode(["status" => "success", "message" => "Videos updated"]);
        } else {
            http_response_code(500);
            echo json_encode(["status" => "error", "message" => "Failed to save videos"]);
        }
        break;

    case 'change_password':
        if (!verifyAdmin($dataPath)) {
            http_response_code(403);
            echo json_encode(["status" => "error", "message" => "Unauthorized"]);
            exit();
        }
        $input = json_decode(file_get_contents('php://input'), true);
        $newPassword = isset($input['new_password']) ? $input['new_password'] : '';
        if (empty($newPassword) || strlen($newPassword) < 6) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "New password must be at least 6 characters"]);
            exit();
        }

        $data = readSecureJson($dataPath);
        $data['password_hash'] = password_hash($newPassword, PASSWORD_DEFAULT);
        $data['active_tokens'] = [];
        if (writeSecureJson($dataPath, $data)) {
            echo json_encode(["status" => "success", "message" => "Password updated successfully"]);
        } else {
            http_response_code(500);
            echo json_encode(["status" => "error", "message" => "Failed to update password"]);
        }
        break;

    case 'upload_image':
        if (!verifyAdmin($dataPath)) {
            http_response_code(403);
            echo json_encode(["status" => "error", "message" => "Unauthorized"]);
            exit();
        }
        if (!isset($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "No file uploaded or upload error occurred."]);
            exit();
        }

        // Validate is image
        $check = getimagesize($_FILES['file']['tmp_name']);
        if ($check === false) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "File is not a valid image."]);
            exit();
        }

        if (!file_exists($uploadsDir)) {
            mkdir($uploadsDir, 0755, true);
        }

        $ext = strtolower(pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION));
        // Only allow standard images
        if (!in_array($ext, ['png', 'jpg', 'jpeg', 'webp', 'gif'])) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Invalid image extension. Only JPG, PNG, WEBP, and GIF are allowed."]);
            exit();
        }

        $filename = uniqid('img_', true) . '.' . $ext;
        $targetFile = $uploadsDir . '/' . $filename;

        if (move_uploaded_file($_FILES['file']['tmp_name'], $targetFile)) {
            // Return relative URL for static deployment
            $fileUrl = './uploads/' . $filename;
            echo json_encode(["status" => "success", "url" => $fileUrl]);
        } else {
            http_response_code(500);
            echo json_encode(["status" => "error", "message" => "Failed to save file on server."]);
        }
        break;

    case 'get_images':
        if (!verifyAdmin($dataPath)) {
            http_response_code(403);
            echo json_encode(["status" => "error", "message" => "Unauthorized"]);
            exit();
        }
        $images = [];
        if (file_exists($uploadsDir)) {
            $files = scandir($uploadsDir);
            foreach ($files as $file) {
                if (in_array(strtolower(pathinfo($file, PATHINFO_EXTENSION)), ['png', 'jpg', 'jpeg', 'webp', 'gif'])) {
                    $images[] = [
                        "name" => $file,
                        "url" => "./uploads/" . $file,
                        "time" => filemtime($uploadsDir . '/' . $file)
                    ];
                }
            }
            // Sort by time descending
            usort($images, function($a, $b) {
                return $b['time'] - $a['time'];
            });
        }
        echo json_encode(["status" => "success", "data" => $images]);
        break;

    case 'delete_image':
        if (!verifyAdmin($dataPath)) {
            http_response_code(403);
            echo json_encode(["status" => "error", "message" => "Unauthorized"]);
            exit();
        }
        $input = json_decode(file_get_contents('php://input'), true);
        $name = isset($input['name']) ? basename($input['name']) : '';
        if (empty($name)) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Filename required"]);
            exit();
        }
        $targetFile = $uploadsDir . '/' . $name;
        if (file_exists($targetFile)) {
            if (unlink($targetFile)) {
                echo json_encode(["status" => "success", "message" => "Image deleted"]);
            } else {
                http_response_code(500);
                echo json_encode(["status" => "error", "message" => "Failed to delete file on server"]);
            }
        } else {
            http_response_code(404);
            echo json_encode(["status" => "error", "message" => "File not found"]);
        }
        break;

    default:
        http_response_code(404);
        echo json_encode(["status" => "error", "message" => "Action not found"]);
        break;
}
?>
