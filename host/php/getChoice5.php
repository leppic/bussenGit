<?php
require_once "../../config.php";
$conn = mysqli_connect($servername, $username, $password, $dbname);

$room = $_POST["room"];
$turn = $_POST["turn"];

// Check connection
if ($conn->connect_error) {
     die("Connection failed: " . $conn->connect_error);
} 

$sql = "SELECT choice FROM `$room` WHERE userID='$turn' limit 1";
$result = mysqli_query($conn, $sql);

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        echo $row["choice"];
    }
} else {
    echo "failed";
}

$conn->close();
?>  