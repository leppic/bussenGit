<?php
require_once "../../config.php";
$conn = mysqli_connect($servername, $username, $password, $dbname);

$room = $_POST["room"];

// Check connection
if ($conn->connect_error) {
     die("Connection failed: " . $conn->connect_error);
} 

$sql = "SELECT userCards FROM `$room` WHERE userName='client' limit 1";
$result = mysqli_query($conn, $sql);

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        echo $row["userCards"];
    }
} else {
    echo "failed";
}

$conn->close();
?>  