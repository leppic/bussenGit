<?php 
require_once "../config.php";
$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
$roomNumber = $_POST["room"];


$sql = "
SELECT `userName` FROM `$roomNumber`
";
$result = mysqli_query($conn, $sql);

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        echo $row["userName"].'|split|'; 
    }
} else {
    echo "fail";
}

$conn->close();
?>