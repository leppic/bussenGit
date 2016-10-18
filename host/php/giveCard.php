<?php 
require_once "../../config.php";
$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
$turn = $_POST["turn"];
$roomNumber = $_POST["room"];
$card = $_POST["card"];
$round = $_POST["round"];
$newStack = $_POST["newStack"];


$sql = "
UPDATE $roomNumber SET userCards = '$newStack', round='$round', yourTurn='0' WHERE UserID = '0'
";
$sql1 = "
SELECT `userCards` FROM `$roomNumber` WHERE `UserID`=$turn
";

$result1 = mysqli_query($conn, $sql1);
while($row = $result1->fetch_assoc()) {
    $result11 = $row["userCards"];
}
$newset = $result11.'_'.$card;

$sql2 = "
UPDATE $roomNumber SET userCards = '$newset', round='$round', yourTurn='1' WHERE UserID = '$turn'
";
$result = mysqli_query($conn, $sql);
if($result1){  
    $result2 = mysqli_query($conn, $sql2);
} else {
    echo $sql;
}

$conn->close();
?>