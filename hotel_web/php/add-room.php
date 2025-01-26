<?php

// This is where the form is submitted
document.getElementById('custom-room-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    
    // Create FormData from the form
    const formData = new FormData(this);
    
    // Send the data to the server using fetch
    fetch('add-room.php', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        // Log the raw response to debug
        return response.text(); // Get the raw text first to debug
    })
    .then(text => {
        console.log('Server response:', text); // Log the response text

        try {
            const data = JSON.parse(text); // Try parsing the response manually

            if (data.success) {
                alert('Room added successfully!');
                document.getElementById('book-now-popup').style.display = 'none';
                location.reload(); // Reload the page to update with the new room
            } else {
                alert('Error adding room: ' + data.error);
            }
        } catch (e) {
            // If the response is not valid JSON, catch the error
            console.error('Error parsing JSON:', e);
            alert('Error: Invalid response from server');
        }
    })
    .catch(error => {
        // Handle any errors that occur during the fetch
        console.error('There was a problem with the fetch operation:', error);
    });
});


header('Content-Type: application/json');

// Assuming you’re processing the form data (e.g., room name, price, description, image)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if form data is set and process it (add to database)
    $roomName = $_POST['roomName'] ?? '';
    $roomPrice = $_POST['roomPrice'] ?? '';
    $roomDescription = $_POST['roomDescription'] ?? '';
    $roomImage = $_FILES['roomImage'] ?? null;

    // Example logic for adding the room to the database
    if ($roomName && $roomPrice && $roomDescription && $roomImage) {
        // Add room to database (e.g., using PDO, MySQLi, etc.)
        // Assume $roomAddedSuccessfully is a boolean that indicates success

        // Simulate successful database insertion
        $roomAddedSuccessfully = true;

        // Send success response
        echo json_encode(["success" => $roomAddedSuccessfully]);
    } else {
        // Send error response if data is missing
        echo json_encode(["success" => false, "error" => "Missing room data"]);
    }
} else {
    // Send an error response if it's not a POST request
    echo json_encode(["success" => false, "error" => "Invalid request method"]);
}
?>
