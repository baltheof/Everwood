<?php
include 'db_config.php';

$data = json_decode(file_get_contents('php://input'), true);

// Get the user_id and room_id from the request body
$user_id = $data['user_id'];
$room_id = $data['room_id'];

try {
    // Check if the room is already in the user's favorites
    $stmt = $pdo->prepare("SELECT * FROM favorites WHERE user_id = :user_id AND room_id = :room_id");
    $stmt->execute(['user_id' => $user_id, 'room_id' => $room_id]);
    
    if ($stmt->rowCount() > 0) {
        echo json_encode(['success' => false, 'message' => 'Room already in favorites']);
        exit;
    }

    // Insert into the favorites table
    $stmt = $pdo->prepare("INSERT INTO favorites (user_id, room_id) VALUES (:user_id, :room_id)");
    $stmt->execute(['user_id' => $user_id, 'room_id' => $room_id]);

    echo json_encode(['success' => true]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
}
?>
