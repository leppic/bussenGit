<?php 
require_once "../../config.php";
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
$playID = $_POST["playID"];
$roomNumber = $_POST["roomNumber"];
$name = $_POST["name"];
    
$sql="UPDATE $roomNumber SET UserID = $playID WHERE userName = '$name'";

$result = $conn->query($sql);
if($result){
    echo $sql;
}
$conn->close();
?>