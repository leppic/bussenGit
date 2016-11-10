<?php 
require_once "../config.php";
$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$roomNumber = $_POST["room"];
$player = $_POST["player"];

//Get choice value from player
//Subtract 1 and put back
//About 2 queries needed

$sql1 = "
SELECT `score` FROM `$roomNumber` WHERE `userName`= '$player'
";
echo $sql1;

$result1 = mysqli_query($conn, $sql1);
while($row = $result1->fetch_assoc()) {
    $result11 = $row["score"];
}
$newNum = intval($result11) - 1;

$sql2 = "
UPDATE $roomNumber SET score = '$newNum' WHERE `userName` = '$player'
";

if($result1){  
    $result2 = mysqli_query($conn, $sql2);
    echo 'succes';
} else {
    echo $sql;
}

$conn->close();
?>