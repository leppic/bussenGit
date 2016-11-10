<?php 
require_once "../config.php";
$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
$player = $_POST["player"];
$roomNumber = $_POST["room"];


$sql = "
SELECT `score` FROM `$roomNumber` WHERE userName = '$player' limit 1
";
$result = mysqli_query($conn, $sql);

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        echo $row["score"]; 
    }
} else {
    echo "failed";
}

$conn->close();
?>


