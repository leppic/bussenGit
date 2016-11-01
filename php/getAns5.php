<?php
require_once "../config.php";
$conn = mysqli_connect($servername, $username, $password, $dbname);

$room = $_POST["room"];
$player = $_POST["player"];

// Check connection
if ($conn->connect_error) {
     die("Connection failed: " . $conn->connect_error);
} 

$sql = "SELECT `yourTurn`, `result` FROM `$room` WHERE userName='$player' limit 1";
$sql2 = "
UPDATE `$room` SET `yourTurn`=0 WHERE userName='$player' limit 1
";

$result = mysqli_query($conn, $sql);

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        echo $row["result"];
        if($row["yourTurn"]=='5'){
            $result2 = mysqli_query($conn, $sql2);
        }
    }
} else {
    echo "failed";
}

$conn->close();
?>  