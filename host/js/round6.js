//Round 6 first deterimes which player should be placed inside 'the bus'
//Durring round 5 the players played cards should be removed from the local card list (implemented)
//Round6 first checks the amount of cards. The highest amount should be placed inside the bus. If there is more then one player with the highest amount of cards the highest value card determines who is the loser. If this is the same, the second card will checked. If all cards are the same, there should be a shootout 
//Grab the card list, check the length, and determine who has the most cards
//TO DO:
//Let the clients know round6 has started (can be done by a client side counter)
//Round6 has started visuals
//Loser visuals
//Tie visuals
//Tie game
//Let the player know he's a loser or he has to play the tie game
//Actual round6 game
function startRound6(){
    //Get all the remaining cards
    if($('.playerCardsItem').length==0){
        //All players played all their cards. It's an ultra tie
        var losers = []
        for (var i = 0; i < playerAmount; i++) {
            losers.push(i+1)
        }
        itsaTie(losers)
        return false;
    }
    var remainingCards = []
    for (var i = 0; i < playerAmount; i++) { 
        var d = $('div[player-id="'+(i+1)+'"] .playerCards .playerCardsItem');
        $.each(d, function(j,jal){
            var k = $(jal).attr('card-id');
            k = parseInt(k.split('-')[1])
            if(j==0){
                remainingCards[(i+1)] = k
            } else {
                remainingCards[(i+1)] = remainingCards[(i+1)]+','+k;
            }
        });
    }
    var amountCards = []
    var highestAmount = 0;
    $.each(remainingCards, function(l,lal){
        console.log(lal)
        if(lal==undefined){
            //nothing
        }else if(lal=== parseInt(lal, 10)){
            amountCards[l]= 1
            if(1>highestAmount){
                highestAmount = 1;
            }
        }else {
            amountCards[l]= lal.split(',').length
            if(lal.split(',').length>highestAmount){
                highestAmount = lal.split(',').length;
            }
        }
    });
    var losers = []
    $.each(remainingCards, function(m,mal){
        if(mal==undefined){
            //nothing
        }else if(mal=== parseInt(mal, 10)){
            if(1==highestAmount){   
                losers.push(m)
            }
        }else {
            if(mal.split(',').length==highestAmount){   
                losers.push(m)
            }
        }
    });
    console.log(losers)
    if(losers.length==1){
        loserDet(losers[0])
        console.log('player '+losers[0]+' is the losers')
    }else {
        console.log('more then 1 loser, check the cards');
        moreLosers(remainingCards,losers,0)
    }
}
function moreLosers(remainingCards,losers,highestCard){
    if(highestCard!=0){
        $.each(remainingCards, function(i,val){
            if(val==undefined){
                //nothing
            }else{
                var newJal = ''
                $.each(val.split(','), function(j,jal){
                    if(jal!=highestCard){
                        newJal=jal+','+newJal
                    }
                })
                if(newJal==''){
                    console.log('all cards are apperently the same?');
                    itsaTie(losers);
                    die
                }
                newJal = newJal.slice(0, -1);
                remainingCards[i]=newJal;
            }
        });
    }
    console.log(remainingCards)
    highestCard = 0
    $.each(losers,function(i,val){
        var cards=remainingCards[val];
        $.each(cards.split(','),function(j,jal){
            if(highestCard<jal){
                highestCard=jal;
            }
        })
    });
    console.log(highestCard)
    var losers2 = [];
    
    $.each(remainingCards, function(k,kal){
        if(kal==undefined){
            //nothing
        }else {
            $.each(kal.split(','),function(l,lal){
                if(lal==highestCard){
                    losers2.push(k)
                }
            })
        }
    });
    if(losers2.length==1){
        loserDet(losers2[0])
        console.log('player '+losers2[0]+' is the losers')
    }else {
        console.log('more then 1 loser, check the cards');
        if(remainingCards[1]==0)
            {
                return false;
            }
        moreLosers(remainingCards,losers2,highestCard)
    }
}
function itsaTie(losers){
    console.log(losers)
    var message=''
    $.each(losers,function(i,val){
        console.log(val)
        if(i==0){
            message = $('div[player-id="'+val+'"] h2').text()
        }else{
            message=message+' vs '+$('div[player-id="'+val+'"] h2').text()
        }
    })
    console.log(message)
}
function loserDet(loserID){
    //Make visual spectacle!
    round6Visual(loserID)
}