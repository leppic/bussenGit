<?php 
require_once "../config.php";
$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
$roomNumber = $_POST["room"];
$player = $_POST["player"];
$choice = $_POST["choice"];

$sql = "
UPDATE $roomNumber SET choice='$choice' WHERE userName = '$player'
";
$result = mysqli_query($conn, $sql);
if($result){  
    echo 'Succes!';
} else {
    echo $sql;
}

$conn->close();
?>