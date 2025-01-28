<?php
header('Content-Type: application/json');
include 'db.php'; // Ensure this file contains the correct database connection logic

// Check if user_id is passed
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'User ID is required.']);
    exit();
}

$user_id = $data['user_id'];

// Query to fetch favorite rooms for this user
$sql = "SELECT r.room_id, r.name, r.description, r.price
        FROM rooms r
        INNER JOIN favorites f ON r.room_id = f.room_id
        WHERE f.user_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();

$result = $stmt->get_result();

$favorites = [];
while ($row = $result->fetch_assoc()) {
    $favorites[] = $row;
}

if ($favorites) {
    echo json_encode(['success' => true, 'favorites' => $favorites]);
} else {
    echo json_encode(['success' => false, 'message' => 'No favorite rooms found.']);
}

$stmt->close();
$conn->close();
?>
