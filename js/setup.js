//This script only checks for the start button. If pressed the information is send to the data base and if the room exists the player is added
startButton()
    //Change this value to false if the code is tested in it's totallity. 
    //As it is now, true means that when round 5 starts and the player doesn't have any cards, it wil show his cards
    //This is only relevant if you used skipStart() in the host
    //The code also makes it so that if a player has a empty hand in round 5, it gets refilled. This isn't supossed to happen
    production=false;

//Convert the text in the roompart to uppercase, so there is a match in the database
$('input[type=text]#room').keyup(function() {
    $(this).val($(this).val().toUpperCase());
});

function startButton(){
    $('.enterRoom').click(function(){
//        Get the filled in values
        roomNum = $('input#room').val();
        playerName= $('input#name').val();
        console.log(roomNum)
        console.log(playerName)
//        Check wether anything is empty
        if(roomNum==''||playerName==''){
//            Alert if one of them is empty
            alert('Velden mogen natuurlijk niet leeg zijn')
        }else{
//            Otherwise continue and post the information to the room
//            There should be a different message if the room doesn't exist
//            Use the PHP script enterRoom to enter
            //First check if the playername is allready taken
            $.ajax({
                type: "POST",
                data: {room:roomNum},
                url: "php/checkPlayers.php",
                success: function(data){
                    if(data=='fail'){
                        alert('Deze kamer bestaat niet');
                        return false;
                    }
                    var splitData = data.split('|split|');
                    $.each(splitData, function(i,val){
                        if(val==playerName){
                            alert('Er zit al iemand in deze kamer met die naam')
                            return false;
                        }
                        if(i==(splitData.length-1)){
                            enterRoom(i)
                        }
                    });
                }
            });
            
        }
    })
}
function enterRoom(i){
    $.ajax({
        type: "POST",
        data: {room:roomNum,name:playerName},
        url: "php/enterRoom.php",
        success: function(data){
            if(data=='fail'){
                alert('Deze kamer bestaat niet')
            }else{
                hideLogin();
                startRound();
                changeName(playerName);
                changeAvatar(i);
            }
        }
    });
}