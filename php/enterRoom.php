<?php 
require_once "../config.php";
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$room = $_POST["room"];
$name = $_POST["name"];
//UserCards is added because it can't be empty
$sql="INSERT INTO $room(room, userName, userCards) 
VALUES ('$room', '$name', 'Az0')";
    

$result = $conn->query($sql);
if($result){
    echo $room."||".$name;
}else{echo "fail";};
?>