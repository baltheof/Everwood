<?php
// Database connection
$servername = "localhost"; // your database server
$username = "root"; // your database username
$password = ""; // your database password
$dbname = "everwood"; // your database name

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

session_start(); // Start session to manage login state

// Variables for error or success messages
$success_message = "";
$error_message = "";

// Handle sign up
if (isset($_POST['signup'])) {
    $surname = $_POST['surname'];
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT); // Hash the password

    // Check if email already exists
    $sql = "SELECT * FROM users WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        $error_message = "Email already exists!";
    } else {
        // Insert new user into the database
        $sql = "INSERT INTO users (surname, email, password) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sss", $surname, $email, $password);
        if ($stmt->execute()) {
            $success_message = "User registered successfully!";
        } else {
            $error_message = "Error: " . $stmt->error;
        }
    }
}

// Handle login
if (isset($_POST['login'])) {
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Check if email exists
    $sql = "SELECT * FROM users WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        
        // Verify password
        if (password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_email'] = $user['email'];
            header("Location: ../index.html");
            exit(); // Ensures the script stops after the redirect
            
        } else {
            $error_message = "Incorrect password!";
        }
    } else {
        $error_message = "No user found with this email!";
    }
}

$conn->close();
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login & Sign Up</title>
    <style>
        /* Body background and styling */
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-image: url('../img/4/7.jpg'); /* Add your image path here */
            background-size: cover;
            background-position: center;
            color: white; /* Make text white for better contrast */
        }

        .container {
            background: rgba(0, 0, 0, 0.7); /* Black with transparency */
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            width: 300px;
        }

        h2 {
            text-align: center;
            color: white; /* Make heading white */
        }

        .form-group {
            margin-bottom: 15px;
        }

        .form-group input {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
            background-color: #333; /* Dark background for input fields */
            color: white; /* White text inside inputs */
        }

        .form-group button {
            width: 100%;
            padding: 10px;
            background-color: #28a745;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }

        .form-group button:hover {
            background-color: #218838;
        }

        .form-toggle {
            text-align: center;
            margin-top: 15px;
        }

        .error-message, .success-message {
            color: red;
            text-align: center;
            margin-top: 15px;
            font-size: 14px;
        }

        .success-message {
            color: green;
        }
    </style>
</head>
<body>

<div class="container">
    <!-- Signup Form -->
    <h2>Sign Up</h2>
    <form method="POST" action="">
        <div class="form-group">
            <input type="text" name="surname" placeholder="Surname" required>
        </div>
        <div class="form-group">
            <input type="email" name="email" placeholder="Email" required>
        </div>
        <div class="form-group">
            <input type="password" name="password" placeholder="Password" required>
        </div>
        <div class="form-group">
            <button type="submit" name="signup">Sign Up</button>
        </div>
    </form>

    <!-- Display Success or Error Messages for Signup -->
    <?php if ($success_message): ?>
        <div class="success-message"><?php echo $success_message; ?></div>
    <?php elseif ($error_message): ?>
        <div class="error-message"><?php echo $error_message; ?></div>
    <?php endif; ?>

    <div class="form-toggle">
        <p>Already have an account? <a href="#loginForm" onclick="document.getElementById('loginForm').style.display='block'; document.getElementById('signupForm').style.display='none';">Login here</a></p>
    </div>

    <!-- Login Form (Initially Hidden) -->
    <div id="loginForm" style="display:none;">
        <h2>Login</h2>
        <form method="POST" action="">
            <div class="form-group">
                <input type="email" name="email" placeholder="Email" required>
            </div>
            <div class="form-group">
                <input type="password" name="password" placeholder="Password" required>
            </div>
            <div class="form-group">
                <button type="submit" name="login">Login</button>
            </div>
        </form>

        <!-- Display Error Message for Login -->
        <?php if ($error_message): ?>
            <div class="error-message"><?php echo $error_message; ?></div>
        <?php endif; ?>

        <div class="form-toggle">
            <p>Don't have an account? <a href="#signupForm" onclick="document.getElementById('signupForm').style.display='block'; document.getElementById('loginForm').style.display='none';">Sign up here</a></p>
        </div>
    </div>
</div>

</body>
</html>
