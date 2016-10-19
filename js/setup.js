//This script only checks for the start button. If pressed the information is send to the data base and if the room exists the player is added
startButton()
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
            alert('Fill everything in')
        }else{
//            Otherwise continue and post the information to the room
//            There should be a different message if the room doesn't exist
//            Use the PHP script enterRoom to enter
            $.ajax({
                type: "POST",
                data: {room:roomNum,name:playerName},
                url: "php/enterRoom.php",
                success: function(data){
                    if(data=='fail'){
                        alert('this room does not exist')
                    }else{
                        hideLogin();
                        startRound();
                        changeName(playerName);
                    }
                }
            });
        }
    })
}