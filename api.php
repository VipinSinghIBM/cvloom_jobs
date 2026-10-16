<?php
/**
 * ====================================================================
 * Sarkari Global & PurposeHire - Unified REST API Backend (PHP/MySQL)
 * ====================================================================
 * Single-file PHP API that powers jobs, blogs, notifications/blinker, 
 * candidate applications, logo uploads, and site settings.
 */

// Cross-Origin Resource Sharing (CORS) headers for subfolder/subdomain access
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Pragma: no-cache");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/config/db.php';

$action = $_GET['action'] ?? $_POST['action'] ?? '';

// Helper to read JSON request body
function getJsonInput() {
    $raw = file_get_contents('php://input');
    return json_decode($raw, true) ?? [];
}

switch ($action) {

    // 1. Database Connection & System Health Check
    case 'check_db':
        echo json_encode([
            'success' => true,
            'message' => 'Mubarak ho! Database successfully connected hai!',
            'php_version' => phpversion(),
            'server_time' => date('Y-m-d H:i:s')
        ], JSON_UNESCAPED_UNICODE);
        break;

    // 2. GET ALL: Single fast query to load all content (Jobs, Blogs, Blinker/Notifications, Settings)
    case 'get_all':
        try {
            // A. Jobs
            $stmtJobs = $pdo->query("SELECT * FROM `sarkari_jobs` ORDER BY `createdAt` DESC");
            $jobs = $stmtJobs->fetchAll();
            foreach ($jobs as &$job) {
                $job['applicationFees'] = json_decode($job['applicationFees'] ?? '[]', true) ?: [];
                $job['vacancyDetailsTable'] = json_decode($job['vacancyDetailsTable'] ?? '[]', true) ?: [];
                $job['documentsRequired'] = json_decode($job['documentsRequired'] ?? '[]', true) ?: [];
                $job['faqs'] = json_decode($job['faqs'] ?? '[]', true) ?: [];
                $job['buttons'] = json_decode($job['buttons'] ?? '[]', true) ?: [];
                $job['isFeatured'] = (bool)$job['isFeatured'];
                $job['views'] = (int)$job['views'];
                $job['totalVacancies'] = (int)$job['totalVacancies'];
            }

            // B. Blogs
            $stmtBlogs = $pdo->query("SELECT * FROM `sarkari_blogs` ORDER BY `publishDate` DESC");
            $blogs = $stmtBlogs->fetchAll();
            foreach ($blogs as &$b) {
                $b['tags'] = !empty($b['tags']) ? explode(',', $b['tags']) : [];
                $b['comments'] = json_decode($b['comments'] ?? '[]', true) ?: [];
                $b['viewsCount'] = (int)$b['viewsCount'];
                $b['isTrending'] = (bool)$b['isTrending'];
                $b['isPopular'] = (bool)$b['isPopular'];
                $b['isRecent'] = (bool)$b['isRecent'];
            }

            // C. Notifications / Blinker Ticker
            $stmtNotifs = $pdo->query("SELECT * FROM `sarkari_notifications` ORDER BY `createdAt` DESC");
            $notifs = $stmtNotifs->fetchAll();
            foreach ($notifs as &$n) {
                $n['isTicker'] = (bool)$n['isTicker'];
            }

            // D. Site Settings
            $stmtSettings = $pdo->query("SELECT * FROM `sarkari_settings`");
            $settingsRows = $stmtSettings->fetchAll();
            $settings = [];
            $adminPwd = 'sarkari2026';
            foreach ($settingsRows as $r) {
                if ($r['key_name'] === 'admin_password') {
                    $adminPwd = $r['key_value'];
                    continue;
                }
                $val = json_decode($r['key_value'], true);
                $settings[$r['key_name']] = ($val !== null) ? $r['key_value'] : $r['key_value'];
            }

            echo json_encode([
                'success' => true,
                'jobs' => $jobs,
                'blogs' => $blogs,
                'notifications' => $notifs,
                'settings' => $settings,
                'admin_password' => $adminPwd
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
        break;

    // 3. Get All Jobs
    case 'get_jobs':
        try {
            $cat = $_GET['category'] ?? '';
            $search = $_GET['search'] ?? '';

            $sql = "SELECT * FROM `sarkari_jobs` WHERE 1=1";
            $params = [];

            if (!empty($cat) && $cat !== 'All') {
                $sql .= " AND (`category` = :cat OR `subCategory` = :cat OR `jobType` = :cat)";
                $params[':cat'] = $cat;
            }
            if (!empty($search)) {
                $sql .= " AND (`title` LIKE :s OR `organization` LIKE :s OR `postName` LIKE :s OR `qualification` LIKE :s)";
                $params[':s'] = "%" . $search . "%";
            }

            $sql .= " ORDER BY `createdAt` DESC";
            $stmt = $pdo->prepare($sql);
            $stmt->execute($params);
            $jobs = $stmt->fetchAll();

            foreach ($jobs as &$job) {
                $job['applicationFees'] = json_decode($job['applicationFees'] ?? '[]', true) ?: [];
                $job['vacancyDetailsTable'] = json_decode($job['vacancyDetailsTable'] ?? '[]', true) ?: [];
                $job['documentsRequired'] = json_decode($job['documentsRequired'] ?? '[]', true) ?: [];
                $job['faqs'] = json_decode($job['faqs'] ?? '[]', true) ?: [];
                $job['buttons'] = json_decode($job['buttons'] ?? '[]', true) ?: [];
                $job['isFeatured'] = (bool)$job['isFeatured'];
                $job['views'] = (int)$job['views'];
                $job['totalVacancies'] = (int)$job['totalVacancies'];
            }

            echo json_encode(['success' => true, 'total' => count($jobs), 'data' => $jobs]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
        break;

    // 4. Get Single Job by ID
    case 'get_job':
        try {
            $id = $_GET['id'] ?? '';
            if (empty($id)) {
                echo json_encode(['success' => false, 'error' => 'Job ID is required']);
                exit;
            }

            $pdo->prepare("UPDATE `sarkari_jobs` SET `views` = `views` + 1 WHERE `id` = :id")->execute([':id' => $id]);

            $stmt = $pdo->prepare("SELECT * FROM `sarkari_jobs` WHERE `id` = :id LIMIT 1");
            $stmt->execute([':id' => $id]);
            $job = $stmt->fetch();

            if (!$job) {
                echo json_encode(['success' => false, 'error' => 'Job not found']);
                exit;
            }

            $job['applicationFees'] = json_decode($job['applicationFees'] ?? '[]', true) ?: [];
            $job['vacancyDetailsTable'] = json_decode($job['vacancyDetailsTable'] ?? '[]', true) ?: [];
            $job['documentsRequired'] = json_decode($job['documentsRequired'] ?? '[]', true) ?: [];
            $job['faqs'] = json_decode($job['faqs'] ?? '[]', true) ?: [];
            $job['buttons'] = json_decode($job['buttons'] ?? '[]', true) ?: [];
            $job['isFeatured'] = (bool)$job['isFeatured'];
            $job['views'] = (int)$job['views'];
            $job['totalVacancies'] = (int)$job['totalVacancies'];

            echo json_encode(['success' => true, 'data' => $job]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
        break;

    // 5. Save Job (Single)
    case 'save_job':
        try {
            $data = getJsonInput();
            if (empty($data['id'])) {
                $data['id'] = 'job-' . time() . '-' . rand(100, 999);
            }
            if (empty($data['createdAt'])) {
                $data['createdAt'] = date('Y-m-d H:i:s');
            }

            $sql = "INSERT INTO `sarkari_jobs` (
                `id`, `title`, `postName`, `organization`, `department`, `advertisementNumber`,
                `totalVacancies`, `salary`, `ageLimit`, `qualification`, `selectionProcess`,
                `applicationFees`, `applicationStartDate`, `applicationEndDate`, `notificationDate`,
                `examDate`, `admitCardDate`, `resultDate`, `state`, `category`, `subCategory`,
                `jobType`, `location`, `experience`, `applicationMode`, `officialWebsite`,
                `shortDescription`, `detailedDescription`, `eligibility`, `vacancyDetailsTable`,
                `documentsRequired`, `howToApply`, `importantInstructions`, `faqs`, `seoTitle`,
                `seoKeywords`, `seoDescription`, `status`, `isFeatured`, `buttons`, `logoUrl`,
                `createdAt`, `views`
            ) VALUES (
                :id, :title, :postName, :organization, :department, :advertisementNumber,
                :totalVacancies, :salary, :ageLimit, :qualification, :selectionProcess,
                :applicationFees, :applicationStartDate, :applicationEndDate, :notificationDate,
                :examDate, :admitCardDate, :resultDate, :state, :category, :subCategory,
                :jobType, :location, :experience, :applicationMode, :officialWebsite,
                :shortDescription, :detailedDescription, :eligibility, :vacancyDetailsTable,
                :documentsRequired, :howToApply, :importantInstructions, :faqs, :seoTitle,
                :seoKeywords, :seoDescription, :status, :isFeatured, :buttons, :logoUrl,
                :createdAt, :views
            ) ON DUPLICATE KEY UPDATE
                `title` = VALUES(`title`), `postName` = VALUES(`postName`), `organization` = VALUES(`organization`),
                `department` = VALUES(`department`), `advertisementNumber` = VALUES(`advertisementNumber`),
                `totalVacancies` = VALUES(`totalVacancies`), `salary` = VALUES(`salary`), `ageLimit` = VALUES(`ageLimit`),
                `qualification` = VALUES(`qualification`), `selectionProcess` = VALUES(`selectionProcess`),
                `applicationFees` = VALUES(`applicationFees`), `applicationStartDate` = VALUES(`applicationStartDate`),
                `applicationEndDate` = VALUES(`applicationEndDate`), `notificationDate` = VALUES(`notificationDate`),
                `examDate` = VALUES(`examDate`), `admitCardDate` = VALUES(`admitCardDate`), `resultDate` = VALUES(`resultDate`),
                `state` = VALUES(`state`), `category` = VALUES(`category`), `subCategory` = VALUES(`subCategory`),
                `jobType` = VALUES(`jobType`), `location` = VALUES(`location`), `experience` = VALUES(`experience`),
                `applicationMode` = VALUES(`applicationMode`), `officialWebsite` = VALUES(`officialWebsite`),
                `shortDescription` = VALUES(`shortDescription`), `detailedDescription` = VALUES(`detailedDescription`),
                `eligibility` = VALUES(`eligibility`), `vacancyDetailsTable` = VALUES(`vacancyDetailsTable`),
                `documentsRequired` = VALUES(`documentsRequired`), `howToApply` = VALUES(`howToApply`),
                `importantInstructions` = VALUES(`importantInstructions`), `faqs` = VALUES(`faqs`),
                `seoTitle` = VALUES(`seoTitle`), `seoKeywords` = VALUES(`seoKeywords`),
                `seoDescription` = VALUES(`seoDescription`), `status` = VALUES(`status`),
                `isFeatured` = VALUES(`isFeatured`), `buttons` = VALUES(`buttons`), `logoUrl` = VALUES(`logoUrl`)";

            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                ':id' => $data['id'],
                ':title' => $data['title'] ?? '',
                ':postName' => $data['postName'] ?? '',
                ':organization' => $data['organization'] ?? '',
                ':department' => $data['department'] ?? '',
                ':advertisementNumber' => $data['advertisementNumber'] ?? '',
                ':totalVacancies' => (int)($data['totalVacancies'] ?? 0),
                ':salary' => $data['salary'] ?? '',
                ':ageLimit' => $data['ageLimit'] ?? '',
                ':qualification' => $data['qualification'] ?? '',
                ':selectionProcess' => $data['selectionProcess'] ?? '',
                ':applicationFees' => is_string($data['applicationFees'] ?? '') ? $data['applicationFees'] : json_encode($data['applicationFees'] ?? []),
                ':applicationStartDate' => $data['applicationStartDate'] ?? '',
                ':applicationEndDate' => $data['applicationEndDate'] ?? '',
                ':notificationDate' => $data['notificationDate'] ?? '',
                ':examDate' => $data['examDate'] ?? '',
                ':admitCardDate' => $data['admitCardDate'] ?? '',
                ':resultDate' => $data['resultDate'] ?? '',
                ':state' => $data['state'] ?? 'All India',
                ':category' => $data['category'] ?? 'Govt Jobs',
                ':subCategory' => $data['subCategory'] ?? '',
                ':jobType' => $data['jobType'] ?? 'Central',
                ':location' => $data['location'] ?? '',
                ':experience' => $data['experience'] ?? '',
                ':applicationMode' => $data['applicationMode'] ?? 'Online',
                ':officialWebsite' => $data['officialWebsite'] ?? '',
                ':shortDescription' => $data['shortDescription'] ?? '',
                ':detailedDescription' => $data['detailedDescription'] ?? '',
                ':eligibility' => $data['eligibility'] ?? '',
                ':vacancyDetailsTable' => is_string($data['vacancyDetailsTable'] ?? '') ? $data['vacancyDetailsTable'] : json_encode($data['vacancyDetailsTable'] ?? []),
                ':documentsRequired' => is_string($data['documentsRequired'] ?? '') ? $data['documentsRequired'] : json_encode($data['documentsRequired'] ?? []),
                ':howToApply' => $data['howToApply'] ?? '',
                ':importantInstructions' => $data['importantInstructions'] ?? '',
                ':faqs' => is_string($data['faqs'] ?? '') ? $data['faqs'] : json_encode($data['faqs'] ?? []),
                ':seoTitle' => $data['seoTitle'] ?? '',
                ':seoKeywords' => $data['seoKeywords'] ?? '',
                ':seoDescription' => $data['seoDescription'] ?? '',
                ':status' => $data['status'] ?? 'Published',
                ':isFeatured' => !empty($data['isFeatured']) ? 1 : 0,
                ':buttons' => is_string($data['buttons'] ?? '') ? $data['buttons'] : json_encode($data['buttons'] ?? []),
                ':logoUrl' => $data['logoUrl'] ?? '',
                ':createdAt' => $data['createdAt'],
                ':views' => (int)($data['views'] ?? 0)
            ]);

            echo json_encode(['success' => true, 'id' => $data['id'], 'message' => 'Job saved successfully!']);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
        break;

    // 6. Save Jobs (Bulk Array Sync from Frontend)
    case 'save_jobs':
        try {
            $jobsList = getJsonInput();
            if (!is_array($jobsList)) {
                echo json_encode(['success' => false, 'error' => 'Expected array of jobs']);
                exit;
            }

            // Sync deleted jobs: delete records not in the incoming list
            $ids = array_filter(array_column($jobsList, 'id'));
            if (!empty($ids)) {
                $placeholders = implode(',', array_fill(0, count($ids), '?'));
                $delStmt = $pdo->prepare("DELETE FROM `sarkari_jobs` WHERE `id` NOT IN ($placeholders)");
                $delStmt->execute(array_values($ids));
            }

            $sql = "INSERT INTO `sarkari_jobs` (
                `id`, `title`, `postName`, `organization`, `department`, `advertisementNumber`,
                `totalVacancies`, `salary`, `ageLimit`, `qualification`, `selectionProcess`,
                `applicationFees`, `applicationStartDate`, `applicationEndDate`, `notificationDate`,
                `examDate`, `admitCardDate`, `resultDate`, `state`, `category`, `subCategory`,
                `jobType`, `location`, `experience`, `applicationMode`, `officialWebsite`,
                `shortDescription`, `detailedDescription`, `eligibility`, `vacancyDetailsTable`,
                `documentsRequired`, `howToApply`, `importantInstructions`, `faqs`, `seoTitle`,
                `seoKeywords`, `seoDescription`, `status`, `isFeatured`, `buttons`, `logoUrl`,
                `createdAt`, `views`
            ) VALUES (
                :id, :title, :postName, :organization, :department, :advertisementNumber,
                :totalVacancies, :salary, :ageLimit, :qualification, :selectionProcess,
                :applicationFees, :applicationStartDate, :applicationEndDate, :notificationDate,
                :examDate, :admitCardDate, :resultDate, :state, :category, :subCategory,
                :jobType, :location, :experience, :applicationMode, :officialWebsite,
                :shortDescription, :detailedDescription, :eligibility, :vacancyDetailsTable,
                :documentsRequired, :howToApply, :importantInstructions, :faqs, :seoTitle,
                :seoKeywords, :seoDescription, :status, :isFeatured, :buttons, :logoUrl,
                :createdAt, :views
            ) ON DUPLICATE KEY UPDATE
                `title` = VALUES(`title`), `postName` = VALUES(`postName`), `organization` = VALUES(`organization`),
                `department` = VALUES(`department`), `advertisementNumber` = VALUES(`advertisementNumber`),
                `totalVacancies` = VALUES(`totalVacancies`), `salary` = VALUES(`salary`), `ageLimit` = VALUES(`ageLimit`),
                `qualification` = VALUES(`qualification`), `selectionProcess` = VALUES(`selectionProcess`),
                `applicationFees` = VALUES(`applicationFees`), `applicationStartDate` = VALUES(`applicationStartDate`),
                `applicationEndDate` = VALUES(`applicationEndDate`), `notificationDate` = VALUES(`notificationDate`),
                `examDate` = VALUES(`examDate`), `admitCardDate` = VALUES(`admitCardDate`), `resultDate` = VALUES(`resultDate`),
                `state` = VALUES(`state`), `category` = VALUES(`category`), `subCategory` = VALUES(`subCategory`),
                `jobType` = VALUES(`jobType`), `location` = VALUES(`location`), `experience` = VALUES(`experience`),
                `applicationMode` = VALUES(`applicationMode`), `officialWebsite` = VALUES(`officialWebsite`),
                `shortDescription` = VALUES(`shortDescription`), `detailedDescription` = VALUES(`detailedDescription`),
                `eligibility` = VALUES(`eligibility`), `vacancyDetailsTable` = VALUES(`vacancyDetailsTable`),
                `documentsRequired` = VALUES(`documentsRequired`), `howToApply` = VALUES(`howToApply`),
                `importantInstructions` = VALUES(`importantInstructions`), `faqs` = VALUES(`faqs`),
                `seoTitle` = VALUES(`seoTitle`), `seoKeywords` = VALUES(`seoKeywords`),
                `seoDescription` = VALUES(`seoDescription`), `status` = VALUES(`status`),
                `isFeatured` = VALUES(`isFeatured`), `buttons` = VALUES(`buttons`), `logoUrl` = VALUES(`logoUrl`)";

            $stmt = $pdo->prepare($sql);
            foreach ($jobsList as $data) {
                $stmt->execute([
                    ':id' => $data['id'],
                    ':title' => $data['title'] ?? '',
                    ':postName' => $data['postName'] ?? '',
                    ':organization' => $data['organization'] ?? '',
                    ':department' => $data['department'] ?? '',
                    ':advertisementNumber' => $data['advertisementNumber'] ?? '',
                    ':totalVacancies' => (int)($data['totalVacancies'] ?? 0),
                    ':salary' => $data['salary'] ?? '',
                    ':ageLimit' => $data['ageLimit'] ?? '',
                    ':qualification' => $data['qualification'] ?? '',
                    ':selectionProcess' => $data['selectionProcess'] ?? '',
                    ':applicationFees' => is_string($data['applicationFees'] ?? '') ? $data['applicationFees'] : json_encode($data['applicationFees'] ?? []),
                    ':applicationStartDate' => $data['applicationStartDate'] ?? '',
                    ':applicationEndDate' => $data['applicationEndDate'] ?? '',
                    ':notificationDate' => $data['notificationDate'] ?? '',
                    ':examDate' => $data['examDate'] ?? '',
                    ':admitCardDate' => $data['admitCardDate'] ?? '',
                    ':resultDate' => $data['resultDate'] ?? '',
                    ':state' => $data['state'] ?? 'All India',
                    ':category' => $data['category'] ?? 'Govt Jobs',
                    ':subCategory' => $data['subCategory'] ?? '',
                    ':jobType' => $data['jobType'] ?? 'Central',
                    ':location' => $data['location'] ?? '',
                    ':experience' => $data['experience'] ?? '',
                    ':applicationMode' => $data['applicationMode'] ?? 'Online',
                    ':officialWebsite' => $data['officialWebsite'] ?? '',
                    ':shortDescription' => $data['shortDescription'] ?? '',
                    ':detailedDescription' => $data['detailedDescription'] ?? '',
                    ':eligibility' => $data['eligibility'] ?? '',
                    ':vacancyDetailsTable' => is_string($data['vacancyDetailsTable'] ?? '') ? $data['vacancyDetailsTable'] : json_encode($data['vacancyDetailsTable'] ?? []),
                    ':documentsRequired' => is_string($data['documentsRequired'] ?? '') ? $data['documentsRequired'] : json_encode($data['documentsRequired'] ?? []),
                    ':howToApply' => $data['howToApply'] ?? '',
                    ':importantInstructions' => $data['importantInstructions'] ?? '',
                    ':faqs' => is_string($data['faqs'] ?? '') ? $data['faqs'] : json_encode($data['faqs'] ?? []),
                    ':seoTitle' => $data['seoTitle'] ?? '',
                    ':seoKeywords' => $data['seoKeywords'] ?? '',
                    ':seoDescription' => $data['seoDescription'] ?? '',
                    ':status' => $data['status'] ?? 'Published',
                    ':isFeatured' => !empty($data['isFeatured']) ? 1 : 0,
                    ':buttons' => is_string($data['buttons'] ?? '') ? $data['buttons'] : json_encode($data['buttons'] ?? []),
                    ':logoUrl' => $data['logoUrl'] ?? '',
                    ':createdAt' => $data['createdAt'] ?? date('Y-m-d H:i:s'),
                    ':views' => (int)($data['views'] ?? 0)
                ]);
            }

            echo json_encode(['success' => true, 'count' => count($jobsList), 'message' => 'All jobs synchronized!']);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
        break;

    // 7. Delete Job
    case 'delete_job':
        try {
            $id = $_GET['id'] ?? (getJsonInput()['id'] ?? '');
            if (empty($id)) {
                echo json_encode(['success' => false, 'error' => 'Job ID is required']);
                exit;
            }
            $stmt = $pdo->prepare("DELETE FROM `sarkari_jobs` WHERE `id` = :id");
            $stmt->execute([':id' => $id]);
            echo json_encode(['success' => true, 'message' => 'Job deleted successfully!']);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
        break;

    // 8. Get Blogs
    case 'get_blogs':
        try {
            $stmt = $pdo->query("SELECT * FROM `sarkari_blogs` ORDER BY `publishDate` DESC");
            $blogs = $stmt->fetchAll();
            foreach ($blogs as &$b) {
                $b['tags'] = !empty($b['tags']) ? explode(',', $b['tags']) : [];
                $b['comments'] = json_decode($b['comments'] ?? '[]', true) ?: [];
                $b['viewsCount'] = (int)$b['viewsCount'];
                $b['isTrending'] = (bool)$b['isTrending'];
                $b['isPopular'] = (bool)$b['isPopular'];
                $b['isRecent'] = (bool)$b['isRecent'];
            }
            echo json_encode(['success' => true, 'data' => $blogs]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
        break;

    // 9. Get Single Blog
    case 'get_blog':
        try {
            $id = $_GET['id'] ?? '';
            $slug = $_GET['slug'] ?? '';

            $sql = "SELECT * FROM `sarkari_blogs` WHERE `id` = :id OR `slug` = :slug LIMIT 1";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([':id' => $id, ':slug' => $slug ?: $id]);
            $blog = $stmt->fetch();

            if (!$blog) {
                echo json_encode(['success' => false, 'error' => 'Blog article not found']);
                exit;
            }

            $pdo->prepare("UPDATE `sarkari_blogs` SET `viewsCount` = `viewsCount` + 1 WHERE `id` = :id")->execute([':id' => $blog['id']]);

            $blog['tags'] = !empty($blog['tags']) ? explode(',', $blog['tags']) : [];
            $blog['comments'] = json_decode($blog['comments'] ?? '[]', true) ?: [];
            $blog['viewsCount'] = (int)$blog['viewsCount'] + 1;
            $blog['isTrending'] = (bool)$blog['isTrending'];
            $blog['isPopular'] = (bool)$blog['isPopular'];
            $blog['isRecent'] = (bool)$blog['isRecent'];

            echo json_encode(['success' => true, 'data' => $blog]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
        break;

    // 10. Save Blog (Single)
    case 'save_blog':
        try {
            $data = getJsonInput();
            if (empty($data['id'])) {
                $data['id'] = 'blog-' . time();
            }
            if (empty($data['publishDate'])) {
                $data['publishDate'] = date('Y-m-d');
            }

            $tags = is_array($data['tags'] ?? []) ? implode(',', $data['tags']) : ($data['tags'] ?? '');
            $comments = is_array($data['comments'] ?? []) ? json_encode($data['comments']) : '[]';

            $sql = "INSERT INTO `sarkari_blogs` (
                `id`, `title`, `slug`, `content`, `excerpt`, `category`, `author`,
                `publishDate`, `featuredImage`, `tags`, `readingTime`, `viewsCount`,
                `isTrending`, `isPopular`, `isRecent`, `comments`, `seoTitle`, `seoDescription`
            ) VALUES (
                :id, :title, :slug, :content, :excerpt, :category, :author,
                :publishDate, :featuredImage, :tags, :readingTime, :viewsCount,
                :isTrending, :isPopular, :isRecent, :comments, :seoTitle, :seoDescription
            ) ON DUPLICATE KEY UPDATE
                `title` = VALUES(`title`), `slug` = VALUES(`slug`), `content` = VALUES(`content`),
                `excerpt` = VALUES(`excerpt`), `category` = VALUES(`category`), `author` = VALUES(`author`),
                `publishDate` = VALUES(`publishDate`), `featuredImage` = VALUES(`featuredImage`),
                `tags` = VALUES(`tags`), `readingTime` = VALUES(`readingTime`),
                `isTrending` = VALUES(`isTrending`), `isPopular` = VALUES(`isPopular`),
                `isRecent` = VALUES(`isRecent`), `seoTitle` = VALUES(`seoTitle`),
                `seoDescription` = VALUES(`seoDescription`)";

            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                ':id' => $data['id'],
                ':title' => $data['title'] ?? '',
                ':slug' => $data['slug'] ?? preg_replace('/[^a-z0-9]+/i', '-', strtolower($data['title'] ?? '')),
                ':content' => $data['content'] ?? '',
                ':excerpt' => $data['excerpt'] ?? substr(strip_tags($data['content'] ?? ''), 0, 180),
                ':category' => $data['category'] ?? 'Career Guidance',
                ':author' => $data['author'] ?? 'Editorial Team',
                ':publishDate' => $data['publishDate'],
                ':featuredImage' => $data['featuredImage'] ?? '',
                ':tags' => $tags,
                ':readingTime' => $data['readingTime'] ?? '5 min read',
                ':viewsCount' => (int)($data['viewsCount'] ?? 0),
                ':isTrending' => !empty($data['isTrending']) ? 1 : 0,
                ':isPopular' => !empty($data['isPopular']) ? 1 : 0,
                ':isRecent' => !empty($data['isRecent']) ? 1 : 0,
                ':comments' => $comments,
                ':seoTitle' => $data['seoTitle'] ?? '',
                ':seoDescription' => $data['seoDescription'] ?? ''
            ]);

            echo json_encode(['success' => true, 'id' => $data['id'], 'message' => 'Blog article saved!']);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
        break;

    // 11. Save Blogs (Bulk Array Sync from Frontend)
    case 'save_blogs':
        try {
            $blogsList = getJsonInput();
            if (!is_array($blogsList)) {
                echo json_encode(['success' => false, 'error' => 'Expected array of blogs']);
                exit;
            }

            // Sync deleted blogs: delete records not in the incoming list
            $bids = array_filter(array_column($blogsList, 'id'));
            if (!empty($bids)) {
                $placeholders = implode(',', array_fill(0, count($bids), '?'));
                $delStmt = $pdo->prepare("DELETE FROM `sarkari_blogs` WHERE `id` NOT IN ($placeholders)");
                $delStmt->execute(array_values($bids));
            }

            $sql = "INSERT INTO `sarkari_blogs` (
                `id`, `title`, `slug`, `content`, `excerpt`, `category`, `author`,
                `publishDate`, `featuredImage`, `tags`, `readingTime`, `viewsCount`,
                `isTrending`, `isPopular`, `isRecent`, `comments`, `seoTitle`, `seoDescription`
            ) VALUES (
                :id, :title, :slug, :content, :excerpt, :category, :author,
                :publishDate, :featuredImage, :tags, :readingTime, :viewsCount,
                :isTrending, :isPopular, :isRecent, :comments, :seoTitle, :seoDescription
            ) ON DUPLICATE KEY UPDATE
                `title` = VALUES(`title`), `slug` = VALUES(`slug`), `content` = VALUES(`content`),
                `excerpt` = VALUES(`excerpt`), `category` = VALUES(`category`), `author` = VALUES(`author`),
                `publishDate` = VALUES(`publishDate`), `featuredImage` = VALUES(`featuredImage`),
                `tags` = VALUES(`tags`), `readingTime` = VALUES(`readingTime`),
                `isTrending` = VALUES(`isTrending`), `isPopular` = VALUES(`isPopular`),
                `isRecent` = VALUES(`isRecent`), `seoTitle` = VALUES(`seoTitle`),
                `seoDescription` = VALUES(`seoDescription`)";

            $stmt = $pdo->prepare($sql);
            foreach ($blogsList as $data) {
                $tags = is_array($data['tags'] ?? []) ? implode(',', $data['tags']) : ($data['tags'] ?? '');
                $comments = is_array($data['comments'] ?? []) ? json_encode($data['comments']) : '[]';

                $stmt->execute([
                    ':id' => $data['id'],
                    ':title' => $data['title'] ?? '',
                    ':slug' => $data['slug'] ?? preg_replace('/[^a-z0-9]+/i', '-', strtolower($data['title'] ?? '')),
                    ':content' => $data['content'] ?? '',
                    ':excerpt' => $data['excerpt'] ?? substr(strip_tags($data['content'] ?? ''), 0, 180),
                    ':category' => $data['category'] ?? 'Career Guidance',
                    ':author' => $data['author'] ?? 'Editorial Team',
                    ':publishDate' => $data['publishDate'] ?? date('Y-m-d'),
                    ':featuredImage' => $data['featuredImage'] ?? '',
                    ':tags' => $tags,
                    ':readingTime' => $data['readingTime'] ?? '5 min read',
                    ':viewsCount' => (int)($data['viewsCount'] ?? 0),
                    ':isTrending' => !empty($data['isTrending']) ? 1 : 0,
                    ':isPopular' => !empty($data['isPopular']) ? 1 : 0,
                    ':isRecent' => !empty($data['isRecent']) ? 1 : 0,
                    ':comments' => $comments,
                    ':seoTitle' => $data['seoTitle'] ?? '',
                    ':seoDescription' => $data['seoDescription'] ?? ''
                ]);
            }

            echo json_encode(['success' => true, 'count' => count($blogsList), 'message' => 'All blogs synchronized!']);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
        break;

    // 12. Delete Blog
    case 'delete_blog':
        try {
            $id = $_GET['id'] ?? (getJsonInput()['id'] ?? '');
            $stmt = $pdo->prepare("DELETE FROM `sarkari_blogs` WHERE `id` = :id");
            $stmt->execute([':id' => $id]);
            echo json_encode(['success' => true, 'message' => 'Blog article deleted!']);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
        break;

    // 13. Get Notifications / Blinker Ticker
    case 'get_notifications':
    case 'get_blinker':
        try {
            $stmt = $pdo->query("SELECT * FROM `sarkari_notifications` ORDER BY `createdAt` DESC");
            $notifs = $stmt->fetchAll();
            foreach ($notifs as &$n) {
                $n['isTicker'] = (bool)$n['isTicker'];
            }
            echo json_encode(['success' => true, 'data' => $notifs]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
        break;

    // 14. Save Notifications / Blinker Ticker (Bulk Array Sync from Frontend)
    case 'save_notifications':
    case 'save_blinker':
        try {
            $notifs = getJsonInput();
            if (!is_array($notifs)) {
                echo json_encode(['success' => false, 'error' => 'Expected array of notifications']);
                exit;
            }

            // Replace all notifications with incoming array to keep in perfect sync
            $pdo->exec("TRUNCATE TABLE `sarkari_notifications`");

            $sql = "INSERT INTO `sarkari_notifications` (`id`, `message`, `link`, `type`, `isTicker`, `createdAt`) 
                    VALUES (:id, :message, :link, :type, :isTicker, :createdAt)";
            $stmt = $pdo->prepare($sql);

            foreach ($notifs as $n) {
                $stmt->execute([
                    ':id' => $n['id'] ?? ('notif-' . time() . '-' . rand(10, 99)),
                    ':message' => $n['message'] ?? '',
                    ':link' => $n['link'] ?? '#',
                    ':type' => $n['type'] ?? 'update',
                    ':isTicker' => !empty($n['isTicker']) ? 1 : 0,
                    ':createdAt' => $n['createdAt'] ?? date('Y-m-d H:i:s')
                ]);
            }

            echo json_encode(['success' => true, 'count' => count($notifs), 'message' => 'Notifications/Blinker updated!']);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
        break;

    // 15. Save Single Notification / Blinker
    case 'save_notification':
        try {
            $n = getJsonInput();
            $sql = "INSERT INTO `sarkari_notifications` (`id`, `message`, `link`, `type`, `isTicker`, `createdAt`) 
                    VALUES (:id, :message, :link, :type, :isTicker, :createdAt)
                    ON DUPLICATE KEY UPDATE `message` = VALUES(`message`), `link` = VALUES(`link`), 
                    `type` = VALUES(`type`), `isTicker` = VALUES(`isTicker`)";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                ':id' => $n['id'] ?? ('notif-' . time()),
                ':message' => $n['message'] ?? '',
                ':link' => $n['link'] ?? '#',
                ':type' => $n['type'] ?? 'update',
                ':isTicker' => !empty($n['isTicker']) ? 1 : 0,
                ':createdAt' => $n['createdAt'] ?? date('Y-m-d H:i:s')
            ]);
            echo json_encode(['success' => true, 'message' => 'Notification saved!']);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
        break;

    // 16. Delete Notification
    case 'delete_notification':
        try {
            $id = $_GET['id'] ?? (getJsonInput()['id'] ?? '');
            $stmt = $pdo->prepare("DELETE FROM `sarkari_notifications` WHERE `id` = :id");
            $stmt->execute([':id' => $id]);
            echo json_encode(['success' => true, 'message' => 'Notification deleted!']);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
        break;

    // 17. Upload Logo / Graphic File (Saves to /uploads/ folder)
    case 'upload_logo':
    case 'upload_image':
        try {
            if (!isset($_FILES['logo']) && !isset($_FILES['image']) && !isset($_FILES['file'])) {
                echo json_encode(['success' => false, 'error' => 'No image file uploaded']);
                exit;
            }

            $file = $_FILES['logo'] ?? $_FILES['image'] ?? $_FILES['file'];
            if ($file['error'] !== UPLOAD_ERR_OK) {
                echo json_encode(['success' => false, 'error' => 'Upload error code: ' . $file['error']]);
                exit;
            }

            // Create uploads directory if not exists
            $uploadDir = __DIR__ . '/uploads/';
            if (!is_dir($uploadDir)) {
                @mkdir($uploadDir, 0755, true);
            }

            $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
            $allowedExts = ['png', 'jpg', 'jpeg', 'svg', 'webp', 'gif'];
            if (!in_array($ext, $allowedExts)) {
                echo json_encode(['success' => false, 'error' => 'Allowed formats: PNG, JPG, JPEG, SVG, WEBP, GIF']);
                exit;
            }

            $safeFilename = 'logo_' . time() . '_' . rand(100, 999) . '.' . $ext;
            $destination = $uploadDir . $safeFilename;

            if (!move_uploaded_file($file['tmp_name'], $destination)) {
                echo json_encode(['success' => false, 'error' => 'Failed to move uploaded file. Check folder permissions.']);
                exit;
            }

            // Return relative URL for storage in db
            $relativeUrl = 'uploads/' . $safeFilename;
            echo json_encode([
                'success' => true,
                'url' => $relativeUrl,
                'filename' => $safeFilename,
                'message' => 'Logo uploaded successfully!'
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
        break;

    // 18. Get Site Settings (Banners, Logo, Navbars, Password)
    case 'get_settings':
        try {
            $stmt = $pdo->query("SELECT * FROM `sarkari_settings`");
            $rows = $stmt->fetchAll();
            $settings = [];
            foreach ($rows as $r) {
                $val = json_decode($r['key_value'], true);
                $settings[$r['key_name']] = ($val !== null) ? $val : $r['key_value'];
            }
            echo json_encode(['success' => true, 'data' => $settings]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
        break;

    // 19. Save Site Settings
    case 'save_settings':
        try {
            $data = getJsonInput();
            $stmt = $pdo->prepare("INSERT INTO `sarkari_settings` (`key_name`, `key_value`) VALUES (:k, :v) ON DUPLICATE KEY UPDATE `key_value` = VALUES(`key_value`)");
            foreach ($data as $k => $v) {
                $valStr = is_string($v) ? $v : json_encode($v);
                $stmt->execute([':k' => $k, ':v' => $valStr]);
            }
            echo json_encode(['success' => true, 'message' => 'Settings updated successfully!']);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
        break;

    // 20. Save Admin Password
    case 'save_password':
        try {
            $data = getJsonInput();
            $newPwd = $data['password'] ?? '';
            if (empty($newPwd)) {
                echo json_encode(['success' => false, 'error' => 'Password cannot be empty']);
                exit;
            }
            $stmt = $pdo->prepare("INSERT INTO `sarkari_settings` (`key_name`, `key_value`) VALUES ('admin_password', :pwd) ON DUPLICATE KEY UPDATE `key_value` = VALUES(`key_value`)");
            $stmt->execute([':pwd' => $newPwd]);
            echo json_encode(['success' => true, 'message' => 'Admin password updated in MySQL database!']);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
        break;

    // 21. Candidate Application Submission
    case 'submit_application':
        try {
            $data = getJsonInput();
            if (empty($data['applicant_name']) || empty($data['applicant_email'])) {
                echo json_encode(['success' => false, 'error' => 'Name and email are required']);
                exit;
            }

            $stmt = $pdo->prepare("INSERT INTO `sarkari_applications` 
                (`job_id`, `job_title`, `applicant_name`, `applicant_email`, `applicant_phone`, `qualification`, `experience_years`, `resume_link`, `cover_message`)
                VALUES (:jid, :jtitle, :name, :email, :phone, :qual, :exp, :resume, :note)");
            $stmt->execute([
                ':jid' => $data['job_id'] ?? 'general',
                ':jtitle' => $data['job_title'] ?? 'Direct Application',
                ':name' => $data['applicant_name'],
                ':email' => $data['applicant_email'],
                ':phone' => $data['applicant_phone'] ?? '',
                ':qual' => $data['qualification'] ?? '',
                ':exp' => $data['experience_years'] ?? '',
                ':resume' => $data['resume_link'] ?? '',
                ':note' => $data['cover_message'] ?? ''
            ]);

            echo json_encode(['success' => true, 'message' => 'Application submitted successfully!']);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
        break;

    // 22. Get Candidate Applications (for Admin)
    case 'get_applications':
        try {
            $stmt = $pdo->query("SELECT * FROM `sarkari_applications` ORDER BY `applied_at` DESC");
            $apps = $stmt->fetchAll();
            echo json_encode(['success' => true, 'data' => $apps]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
        break;

    // 23. Newsletter Subscription
    case 'subscribe':
        try {
            $data = getJsonInput();
            $email = trim($data['email'] ?? '');
            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                echo json_encode(['success' => false, 'error' => 'Invalid email address']);
                exit;
            }

            $stmt = $pdo->prepare("INSERT IGNORE INTO `sarkari_subscribers` (`email`) VALUES (:email)");
            $stmt->execute([':email' => $email]);

            echo json_encode(['success' => true, 'message' => 'Successfully subscribed to job alerts!']);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }
        break;

    default:
        echo json_encode([
            'status' => 'online',
            'api' => 'Sarkari Global PurposeHire REST API',
            'database' => 'connected',
            'endpoints' => [
                'check_db' => 'GET api.php?action=check_db',
                'get_all'  => 'GET api.php?action=get_all',
                'get_jobs' => 'GET api.php?action=get_jobs',
                'get_job'  => 'GET api.php?action=get_job&id=...',
                'save_job' => 'POST api.php?action=save_job',
                'save_jobs' => 'POST api.php?action=save_jobs',
                'delete_job' => 'POST api.php?action=delete_job&id=...',
                'get_blogs' => 'GET api.php?action=get_blogs',
                'get_blog' => 'GET api.php?action=get_blog&id=...',
                'save_blog' => 'POST api.php?action=save_blog',
                'save_blogs' => 'POST api.php?action=save_blogs',
                'delete_blog' => 'POST api.php?action=delete_blog&id=...',
                'get_notifications (blinker)' => 'GET api.php?action=get_notifications',
                'save_notifications' => 'POST api.php?action=save_notifications',
                'upload_logo' => 'POST api.php?action=upload_logo (multipart)',
                'get_settings' => 'GET api.php?action=get_settings',
                'save_settings' => 'POST api.php?action=save_settings',
                'save_password' => 'POST api.php?action=save_password',
                'submit_application' => 'POST api.php?action=submit_application',
                'get_applications' => 'GET api.php?action=get_applications',
                'subscribe' => 'POST api.php?action=subscribe'
            ]
        ]);
        break;
}
