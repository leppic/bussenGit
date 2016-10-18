<?php 
require_once "../../config.php";
$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$allcards = "Az1_Az2_Az3_Az4_Az5_Az6_Az7_Az8_Az9_Az10_Az11_Az12_Az13_Bz1_Bz2_Bz3_Bz4_Bz5_Bz6_Bz7_Bz8_Bz9_Bz10_Bz11_Bz12_Bz13_Cz1_Cz2_Cz3_Cz4_Cz5_Cz6_Cz7_Cz8_Cz9_Cz10_Cz11_Cz12_Cz13_Dz1_Dz2_Dz3_Dz4_Dz5_Dz6_Dz7_Dz8_Dz9_Dz10_Dz11_Dz12_Dz13";
$dataID = $_POST["roomNumber"];
    
$sql="
CREATE TABLE IF NOT EXISTS `$dataID` (
`room` varchar(4) NOT NULL,
`UserID` int(1) NOT NULL,
`userName` varchar(16) NOT NULL,
`userCards` varchar(512) NOT NULL,
`round` int(1) NOT NULL,
`yourTurn` int(1) NOT NULL,
`score` int(4) NOT NULL,
`choice` varchar(512) NOT NULL,
`result` varchar(512) NOT NULL
);
";
$sql2="
INSERT INTO `$dataID` (`room`, `UserID`, `userName`, `userCards`, `round`, `yourTurn`, `score`, `choice`, `result`) VALUES ('$dataID', 0, 'client', '$allcards', 0, 0, 0, '', '');
";

//$result = $conn->query($sql);
$result = mysqli_query($conn, $sql);
if($result){
    $result2 = mysqli_query($conn, $sql2);
    if($result2){    
        echo 'succes';
    } else {
        echo $sql2;
    }
} else {
    echo $sql;
}

$conn->close();
?>