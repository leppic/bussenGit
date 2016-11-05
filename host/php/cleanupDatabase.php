<?php 
require_once "../../config.php";
$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
$userID = $_POST["userID"];
$roomNumber = $_POST["room"];

$sql = "
UPDATE $roomNumber SET yourTurn='0', choice='', result='' WHERE UserID = '$userID'
";

$result = mysqli_query($conn, $sql);
if($result){  
    echo $sql;
} else {
    echo $sql;
}

$conn->close();
?>