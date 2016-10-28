<?php 
require_once "../../config.php";
$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
$userID = $_POST["userID"];
$roomNumber = $_POST["room"];
$round = $_POST["round"];


$sql = "
UPDATE $roomNumber SET round='$round', yourTurn='$round' WHERE UserID = '$userID'
";

$result = mysqli_query($conn, $sql);
if($result){  
    echo "Succes";
} else {
    echo $sql;
}

$conn->close();
?>