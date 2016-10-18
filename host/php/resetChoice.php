<?php 
require_once "../../config.php";
$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
$roomNumber = $_POST["room"];
$turn = $_POST["turn"];

$sql = "
UPDATE $roomNumber SET choice='0' WHERE UserID = '$turn'
";
$result = mysqli_query($conn, $sql);
if($result){  
    echo 'Succes!';
} else {
    echo $sql;
}

$conn->close();
?>