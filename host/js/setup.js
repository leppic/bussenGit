$(document).ready(function(){
//    Generate a random roomNumber. Var is global!
    roomNumber = makeid();
//    Roomnumber is displayed on screen
    $('h2#roomNumber').text(roomNumber);
//    Startbutton is activated
    clicksStart();
//    Open a room with the generated number as name
    //variables for muted music and sound
    soundMute = false;
    musicMute = false;
    
    
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
    round5Turn = 0;
    round5Amount = 1;
    
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

function skipStart(){
    //Skip the first three rounds. Use before pressing start!
    //The card set the host uses won't be used, so it's possible there will be a duplicates. But that shouldn't be a problem in the code so fk it
    for (var i = 0; i < playerList.length; i++) { 
        skipStartFill(i+1)
    }
    setTimeout(function(){
        started='true';
        loginOut();
        
        playerAmount = playerList.length;
        round=5;
        startRound();
    },3000)
}
function skipStartFill(i){
    var cards='';
    if(i==1){cards='Az0_Az2_Az3_Bz4_Cz5'}
    if(i==2){cards='Az0_Az6_Az7_Bz8_Cz9'}
    if(i==3){cards='Az0_Az10_Az11_Bz12_Cz13'}
    if(i==4){cards='Az0_Az1_Az5_Bz6_Cz7'}
    if(i==5){cards='Az0_Az8_Az9_Bz10_Cz11'}
    if(i==6){cards='Az0_Az2_Az3_Bz4_Cz5'}
    $.ajax({
        type: "POST",
        data: {roomNumber:roomNumber, userID:i,cards:cards},
        url: "php/skipStartFill.php",
        success: function(data){
            console.log(data)
        }
    });
}
function muteSound(){
    if(soundMute){
        soundMute=false;
    }else {
        soundMute=true
    }
    $('.soundMute').toggleClass('muted')
    $('.sound').prop("muted", soundMute);
}

function muteMusic(){
    if(musicMute){
        musicMute=false;
        
    }else {
        musicMute=true
    }
    $('.musicMute').toggleClass('muted')
    $('.music').prop("muted", musicMute);
}
