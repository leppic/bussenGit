//Take 15 cards row of 5, row of 4, row of 3, row of 2, row of 1
//Place them on the table
//Open first card
//Let players choose their cards
//Check if player cards match
//If they match, the player must choose someone to drink
//Row 1 (5 cards) they can give 1 drink. Row 2 (4 cards) they can give 2 drinks (can be different players)
//Ends with in de bus

function startRoundFive(){
    //Visual
    //This doesn't work propperly. There is a 'promise' needed. 
    //The getFifteenCards() is called inside the round5Message as an temporary workaround
    if(round5Message()){
        getFifteenCards()
    }
    //TO DO:
    //Update the players round to let the clients know round 5 has started 
}

function getFifteenCards(){
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
            console.log(fifteenArray)
            //Place the fifteen cards on the deck
            //Visual
            placeFifteenCards(fifteenArray);
            //Wait till the cards are placed on the table and flip the first card
            setTimeout(function(){
                flipFifteenCard(round5Turn)
                round5Turn=+1;
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