<?php 
require_once "../../config.php";
$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
$userID = $_POST["userID"];
$roomNumber = $_POST["roomNumber"];
$cards = $_POST["cards"];

$sql = "
UPDATE $roomNumber SET round = '5', userCards='$cards' WHERE UserID = '$userID'
";
$result = mysqli_query($conn, $sql);
if($result){  
    echo $sql;
} else {
    echo $sql;
}

$conn->close();
?>