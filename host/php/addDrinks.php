<?php 
require_once "../../config.php";
$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
$turn = $_POST["turn"];
$roomNumber = $_POST["room"];
$points = $_POST["points"];;

$sql1 = "
SELECT `score` FROM `$roomNumber` WHERE `UserID`= '$turn'
";
echo $sql1;

$result1 = mysqli_query($conn, $sql1);
while($row = $result1->fetch_assoc()) {
    $result11 = $row["score"];
}
$newNum = intval($result11) + intval($points);

$sql = "
UPDATE $roomNumber SET score = '$newNum' WHERE UserID = '$turn'
";

$result = mysqli_query($conn, $sql);
if($result){  
   echo "succes";
} else {
    echo $sql;
}

$conn->close();
?>


