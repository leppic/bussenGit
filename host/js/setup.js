$(document).ready(function(){
//    Generate a random roomNumber. Var is global!
    roomNumber = makeid();
//    Roomnumber is displayed on screen
    $('h2#roomNumber').text(roomNumber);
//    Startbutton is activated
    clicksStart();
//    Open a room with the generated number as name
    
//    Temporary disabled for testing
    openRoom(roomNumber);
    
    
//    Set up a list with players to check
//    wether a new player joined
    playerList = [];
//    The three main values for the game to know what to do: 
//    the round, the amount of players and wich turn it is in the round
    room=roomNumber;
    round = 0;
    turn = 0;
    playerAmount = 0;
    
    started='false';
});

function makeid(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for( var i=0; i < 4; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}


function clicksStart(){
    $('button#startGame').click(function(){
//        Makes the script stop checking for new players
        if(playerList.length==0){
            alert('Geen spelers');
            return false;
        }
        started='true';
        loginOut();
        
        playerAmount = playerList.length;
        round=1;
        startRound();
        //Visual
        //Show the playingboard
        
    });
}
function openRoom(roomNumber){
    $.ajax({
        type: "POST",
        data: {roomNumber:roomNumber},
        url: "php/openRoom.php",
        success: function(data){
            console.log('Room opened: '+data);
//            The room is opened. We need to check every three seconds wether a new
//            player joined
//            Because I cant get auto_increment to work, 
//            we need to manualy update the players ID's
            checkPlayers(roomNumber)
        }
    });
}
function checkPlayers(roomNumber){
//    Set timeout for every 3 seconds
    setTimeout(function(){
        //If the game is started, stop the loop
        if (started=='true'){return false}
//        Restart the loop
        checkPlayers(roomNumber);
        $.ajax({
            type: "POST",
            data: {roomNumber:roomNumber},
            url: "php/checkPlayers.php",
            success: function(data){
//                Check for new players
                checkWetherNew(data)
            }
        });
    }, 3000);    
}

function checkWetherNew(data){
    var ndata = data.split('-')
    console.log(ndata.length)
    console.log(playerList.length)
    if(playerList.length==(ndata.length-2)){
        console.log('No one new');
        console.log(playerList)
    } else {
        $(ndata).each(function(i,val){
            if(val=='client'||val=="  "){
                //Do nothing
            } else if(i==(playerList.length+1)){
//                Add playername to list. The position should correspond with 
//                its ID
                playerList.push(val);
                updateID(i,roomNumber,val);
                //Visual
                //Add the players to the sidebar
                addPlayerSide(val,i);
            }
        })
    }
}


function updateID(i,roomNumber,val){
     $.ajax({type: "POST", data: {playID:i,roomNumber:roomNumber, name:val},url: "php/adid.php",success: function(data)  {console.log(data)}});
}

// Random Number function
function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}