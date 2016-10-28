function startRound(){
    //Check for turn and wait
    round=0;
    globCards='';
    waitForHost();
}

function waitForHost(){
//    Refresh every second
    setTimeout(function(){ 
        //Check wether it's your turn. Turn is yourTurn=1. 
        //If yourTurn is 1, continue. Otherwise loop
         $.ajax({
            type: "POST",
            data: {room:roomNum,player:playerName},
            url: "php/getCards.php",
            success: function(data){
                console.log(data);
                if(data.split('|')[0]==1){
                    var cards = data.split('|')[1];
                    globCards = cards;
                    var cardsArr = cards.split('_')                    
                    //Check the amount of cards to determin the round
                    round = (cardsArr.length-1);
                    //Visual
                    //Send the data to the visuals
                    enterCard(cards);
                    
                    //Show choice buttons
                    //Two vars are the two choices
                    var ch1 = '';
                    var ch2 = '';
                    if(round==1){
                        ch1 = 'Rood'
                        ch2 = 'Zwart'
                    }
                    if(round==2){
                        ch1 = 'Hoger'
                        ch2 = 'Lager'
                    }
                    if(round==3){
                        ch1 = 'Binnen'
                        ch2 = 'Buiten'
                    }
                    if(round==4){
                        ch1 = 'Al wel'
                        ch2 = 'Nog niet'
                    }
                    showChoices(ch1,ch2)
                }else if(data.split('|')[0]==5){
                    setup5();
                }else if(data.split('|')[0]==6){
                    alert('Round 6 started')
                }else {
                    waitForHost()
                }
            }
         })
    }, 1000);  
}
function postChoice(choice){
    $.ajax({
        type: "POST",
        data: {room:roomNum,player:playerName,choice:choice},
        url: "php/postChoice.php",
        success: function(data){
            console.log(data);
//            after posting start listining again
            waitForHost();
        }
    });
}