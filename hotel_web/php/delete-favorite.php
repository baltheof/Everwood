<?php
include 'db_config.php';

$data = json_decode(file_get_contents('php://input'), true);

// Get the user_id and room_id from the request body
$user_id = $data['user_id'];
$room_id = $data['room_id'];

try {
    // Delete from the favorites table
    $stmt = $pdo->prepare("DELETE FROM favorites WHERE user_id = :user_id AND room_id = :room_id");
    $stmt->execute(['user_id' => $user_id, 'room_id' => $room_id]);

    echo json_encode(['success' => true]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
}
?>
