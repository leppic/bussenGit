function startRound(){
    //If the turn var is higher then the amount of players
    //we went full circle and the next round should be started
    if(turn==playerAmount){
        turn=0;
        round=round+1;
        console.log('Round: '+round)
        startRound();
        return false
    } else {
        turn=turn+1;
//        Let the player know its his turn by updating his 'yourTurn'
//        Show wich players turn it is
//        Visual
        setPlayerActive();
        showInstructions();
//        The turn var is the userID
//        Give his card at the same time
        $.ajax({
            type: "POST",
            data: {room:room},
            url: "php/getCards.php",
            success: function(data){
//                console.log(data)
                // Data is the cards. Take one en put the rest back
                var splitData = data.split('_')
                var random = randomNum(0, splitData.length);
                var singleCard = splitData.splice(random, 1);
                //The taken card
                console.log(singleCard[0]);
                //The remaining stack
                console.log(splitData);
                var newStack = ''
                $.each(splitData,function(i,val){
                    if(i==(splitData.length-1)){
                        newStack = newStack+val+'';
                        return false;
                    }
                    newStack = newStack+val+'_'
                })
                giveCard(singleCard[0],newStack)
            }
        });
    }
}
function giveCard(singleCard,newStack){
    $.ajax({
        type: "POST",
        data: {turn:turn,room:room,card:singleCard,round:round,newStack:newStack},
        url: "php/giveCard.php",
        success: function(data){
            console.log(data)
            //Visual
            //Get visuals in order and wait for player
            waitForPlayer()
        }
    });
};
function waitForPlayer(){
//    Refresh every second
    setTimeout(function(){ 
        //Check wether a choice is posted. Turn is player ID. 
        //If choice is not empty, continue. Otherwise loop
         $.ajax({
            type: "POST",
            data: {room:room,turn:turn},
            url: "php/getChoice.php",
            success: function(data){
                console.log(data);
                var splitData = data.split('|')
                if(splitData[0]==1||splitData[0]==2){
                     //Send the data to the mechanics
                    //Located in mechanics.js
                    var answerWas = checkAnswer(splitData[0],splitData[1]);
                    var newCard = splitData[1].split('_')[round];
                    //Checks wheter the response is true or false
                    //add visuals and drinks 
                    showFeedback(answerWas);
                    flipCard(newCard);
                    addScore(answerWas);                       
                    //Choice has to be set back to empty. 
                    //Wait for four seconds to let visuals play out
                    setTimeout(function(){
                        resetChoice();
                    }, 4000)
                }else{
                    waitForPlayer()
                }
            }
         })
    }, 1000);  
}
function addScore(ans){
    if(ans==false){
        var curAm = parseInt( $('.playerTurn .drinks p').text() );
        $('.playerTurn .drinks p').text(curAm+round);
    }
}
function resetChoice(){
    $.ajax({
            type: "POST",
            data: {room:room,turn:turn},
            url: "php/resetChoice.php",
            success: function(data){
                startRound();
            }
    });
}