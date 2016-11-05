//Take 15 cards row of 5, row of 4, row of 3, row of 2, row of 1
//Place them on the table
//Open first card
//Let players choose their cards
//Check if player cards match
//If they match, the player must choose someone to drink
//Row 1 (5 cards) they can give 1 drink. Row 2 (4 cards) they can give 2 drinks (can be different players)
//Ends with in de bus
round5AnswerList = []
round5GiveDrinkList =[]

function startRoundFive(){
    console.log('startRoundFive')
    //Visual
    //This doesn't work propperly. There is a 'promise' needed. 
    //The getFifteenCards() is called inside the round5Message as an temporary workaround
    if(round5Message()){
        getFifteenCards()
    }
    //TO DO:
    //Update the players round to let the clients know round 5 has started (DONE)
}
//This works :P
function waitForPlayer5(IDarray){
    console.log('waitForPlayer5')
    if (IDarray.length==0){
//        alert('all Players answered');
        //If the IDarray is empty the loop is ended and the next step should be taken
        
        checkAnswers5()
        return false;
    }
    //Check if all players have answerd
    //If they send nothing, the answer is 5, otherwise 5_Cz5_Dz2 (example)
    $.each(IDarray, function(i, val){
        //For each of the items in the array the code checks if the answer is not 0 and then post the answer
        $.ajax({
            type: "POST",
            data: {room:room, turn:val},
            url: "php/getChoice5.php",
            success: function(data){
//                console.log(data)
                if(data.split('|')[0]==5){
                    IDarray.splice( $.inArray(val,IDarray) ,1 );
//                    alert('player'+val+' answered');
                    //TO DO
                    //Add the answer to some kind of array
                    //The val determines the position in the list
                    round5AnswerList[val] = data
                }
            }
        })
    })
    setTimeout(function(){
        waitForPlayer5(IDarray);
    },1000)
}

function getFifteenCards(){
    console.log('getFifteenCards')
    $.ajax({
        type: "POST",
        data: {room:room},
        url: "php/getFifteenCards.php",
        success: function(data){
//                console.log(data)
            //Create the 15 card array
            var fifteenArray = [];
            // Data is the cards. Split them to get an array of cards
            var splitData = data.split('_')
            //Get 15 random cards
            for (i = 0; i < 15; i++) { 
                var random = randomNum(0, (splitData.length-1));
                var singleCard = splitData.splice(random, 1);
                fifteenArray.push(singleCard[0]);
            }
            // fifteenArray are the fifteen cards (in an array)
//            console.log(fifteenArray)
            //Place the fifteen cards on the deck
            //Visual
            placeFifteenCards(fifteenArray);
            //Wait till the cards are placed on the table and flip the first card
            setTimeout(function(){
                //Let the users know round 5 has started
                updateTurn(5);
                console.log(round5Turn)
                flipFifteenCard(round5Turn)
//                round5Turn+=1;
            },6500);
            
            // Splitdata are the rest of the cards
            console.log(splitData)
            //Place the remaining cards back
            //NOT REALLY NEEDED SINCE THE CARDS WON"T BE USED AGAIN
            
            //The 15 cards aren't communicated to the database. The check is done when the player submits his cards
            
            //Wait for the players to send their answer
            
        }
    });
}

function updateTurn(turnRound){
    console.log('updateTurn')
    //for each player the updateTurn php is called. This way each player should get a 5 as round and yourTurn
//    console.log(playerAmount)
    for (var i = 1; i <= playerAmount; i++) { 
        $.ajax({
            type: "POST",
            data: {room:room,userID:i,round:turnRound},
            url: "php/updateTurn.php",
            success: function(data){
//                console.log(data)
                //Get visuals in order and wait for player
            }
        });
    }
    //Empty the round5 answer list to prevent mixups
    round5AnswerList = [];
    //Create an array with all the player ID's
    var IDarray = [];
    for (i = 1; i <= playerAmount; i++) { 
        IDarray.push(i)
    }
    waitForPlayer5(IDarray)
}
function checkAnswers5(){
    console.log('checkAnswers5')
    //Check the number of the playedcard
    var playedCard = $('#r5c'+round5Turn+' img').attr('src')
    playedCard = playedCard.split('/')[3]
    playedCard = playedCard.split('.')[0]
    var playedCardNumber = playedCard.split('-')[1]

    //Loop through the answer list and check every player
    //Keep in mind that a each loop starts at 0, but the first player ID is 1. The first hit will be empty.
    //Also, the total length of the list will be one higher then the total amount of players
    $.each(round5AnswerList, function(i, val){
        if(i==0){
            //Ignore,the first hit is always empty
        }else if (val=="5"){
            //Ignore, the player didn't post any cards
        }else{
            //The player posted some cards! Will look something like this (5|Dz11|Cz6)
            var playerCards = val.split('|')
            //The player has to get some answer back from the server. Which cards where played correctly, which weren't? Do I have to drink? May he give some shots?
            //I propose: (amounts of shots to give away)+'|'+(amounts of shots to drink)+'|'+cardname+'_'+(right or wrong)+'|'+cardname+'_'+(right or wrong)+'|'+etc...
            var answerForPlayer = ''
            var amountToGive = 0;
            var amountToDrink = 0;
            var cardsYoN = ''
            $.each(playerCards, function(j,jal){
                if(j==0){
                    //ignore
                }else{
                    var jalSplit = jal.split('z')[1]
                    jalSplit=jalSplit.replace(/\s+/g, '')
                    console.log(jalSplit)
                    console.log(playedCardNumber)
                    if(jalSplit==playedCardNumber){
                        //Player is correct and may give a shot away (amount dependand on the round)
                        amountToGive += round5Amount;
                        cardsYoN = cardsYoN+'|'+jal+'_right'
                    }else{
                        //Player played a wrong card an has to drink himself!
                        amountToDrink += round5Amount;
                        cardsYoN = cardsYoN+'|'+jal+'_wrong'
                        //Visuals
                        //It should be let known which players are liars!
                    }
                }
            });
            answerForPlayer = amountToGive+'|'+amountToDrink+cardsYoN;
                        
            //Check wether stuff is correct immediately and give feedback
            setTimeout(function(){
                //Send the answer to the database 
                sendAnsForPlayer(answerForPlayer,i)
                //Visual
                showFeedback5(answerForPlayer,i)
            },(4000*i))
            
            //If amountToGive is more then 1, at the player to the list to check for answers
            if(amountToGive>0){
                round5GiveDrinkList.push(i)
            }            
        }
//        console.log(i)
//        console.log(val)
    })
    var playerDrinkChoices=[]
    waitForPlayer5Drinks(playerDrinkChoices)
}

function sendAnsForPlayer(answerForPlayer,i){
    console.log('sendAnsForPlayer')
    $.ajax({
        type: "POST",
        data: {room:room,userID:i,ans:answerForPlayer},
        url: "php/sendAnsForPlayer.php",
        success: function(data){
//            console.log(data)
            //Get visuals in order and wait for player
        }
    });
}
function waitForPlayer5Drinks(playerDrinkChoices){
    console.log('waitForPlayer5Drinks')
    if(round5GiveDrinkList.length==0){        
        setTimeout(function(){
            showFeedback5Drinks(playerDrinkChoices);
        },(4000*playerAmount)+2000)
        return false;
    }
    $.each(round5GiveDrinkList, function(i, val){
        $.ajax({
            type: "POST",
            data: {room:room,userID:val},
            url: "php/waitForPlayer5Drinks.php",
            success: function(data){
//                console.log(data);
                if(data.split('|')[0]!=5){
                    round5GiveDrinkList.splice( $.inArray(val,round5GiveDrinkList) ,1 );
                    playerDrinkChoices.push(data)
//                    console.log(round5GiveDrinkList)
                }
            }
        });
    })
    setTimeout(function(){
        if(round5GiveDrinkList.length>0){        
            waitForPlayer5Drinks(playerDrinkChoices)            
        }else{
//            console.log(playerDrinkChoices)
            showFeedback5Drinks(playerDrinkChoices);
            return false;
        }
    },1000)
}
function showFeedback5Drinks(playerDrinkChoices){
    //This code show who should drink how many
    console.log(playerDrinkChoices)
    if(playerDrinkChoices.length==0){
        //nothing
        nobodyDrinks();
        setTimeout(function(){
            cleanupDatabase();
        },2000)
    }else{
        var totalDrinks = ['','','','','','','','','']
        $.each(playerDrinkChoices, function(i,val){
            //Each val could look something like this: 1_0|2_1|4_1
            $.each(val.split('|'), function(j,jal){
                //Each val could look something like this: 1_0
                var jal0 = jal.split('_')[0]
                var jal1 = jal.split('_')[1]
                jal0 = jal0.replace(/\s+/g, '');
                jal0 = parseInt(jal0)
                jal1 = jal1.replace(/\s+/g, '');
                jal1 = parseInt(jal1)
                var ff = totalDrinks[jal0]
                if(ff==undefined||ff==''){ff=0}
                totalDrinks[jal0]=ff+jal1
            })
        })
        //If one player gives out drinks, his own number will be ignored
        //So the array might contain a undefined. No worries, just replace the undefined with a 0
        //Visuals
        round5drinks(totalDrinks)
        //cleanupDatabase() will be called from visuals
    }
    
}
function cleanupDatabase(){
    console.log('cleanupDatabase')
    $.each(playerList, function(i,val){
        $.ajax({
            type: "POST",
            data: {room:room,userID:(i+1)},
            url: "php/cleanupDatabase.php",
            success: function(data){
//                console.log('Cleanup for '+(i+1)+' is: succes')
//                console.log(data)
                if((i+1)==playerAmount){
                    updateTurn(5);
                    round5Turn+=1;
                    if(round5Turn==5){
                        round5Amount=2
                    }
                    if(round5Turn==9){
                        round5Amount=3
                    }
                    if(round5Turn==12){
                        round5Amount=4
                    }
                    if(round5Turn==14){
                        round5Amount=5
                    }
                    flipFifteenCard(round5Turn)
//                    console.log('last Cleaned up')
                }
            }
        });
    });
}