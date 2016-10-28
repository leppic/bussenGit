<?php 
require_once "../../config.php";
$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
$userID = $_POST["userID"];
$roomNumber = $_POST["room"];
$ans = $_POST["ans"];

$sql = "
UPDATE $roomNumber SET result = '$ans' WHERE UserID = '$userID'
";
$result = mysqli_query($conn, $sql);
if($result){  
    echo 'succes!';
} else {
    echo $sql;
}

$conn->close();
?>