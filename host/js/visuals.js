function loginOut(){
    $('.login').fadeOut();
}

function addPlayerSide(name,i){
    var playerImg = '../assets/avatars/av'+i+'.png'
    var playerDiv = '<div class="player" player-id="'+i+'"><img src="'+playerImg+'" class="avatar"><h2>'+name+'</h2><div class="drinks"><p>0</p></div><div class="playerCards"></div></div>';
    $('.player-cont').append(playerDiv);
}
function setPlayerActive(){
    $('.playerTurn').removeClass('playerTurn')
    $("div[player-id='" +turn+"']").addClass('playerTurn');
}

function showInstructions(){
    //Variable instructions have to be added
    //The round var can determine what the text should be
    var instruc = 'Is de kaart hoger of lager?';
    var name = $('.playerTurn h2').text();
    if(round==1){instruc = name+', is de kaart rood of zwart?' };
    if(round==2){instruc = name+', is de kaart hoger of lager dan de vorige kaart?' };
    if(round==3){instruc = name+', ligt de waarde van de kaart binnen of buiten de vorige twee kaarten?' };
    if(round==4){instruc = name+', heb je het plaatje van de kaart al wel of nog niet in je hand?' };
    $('.instructions').append('<h3>'+instruc+'</h3>').fadeIn();
    placeCard();
}
function placeCard(){
    //newCard is positioned in the CSS. It should be the same as .cardStack
    var newCard = '<div class="card newCard"></div>'
    $('.container').append(newCard);
    
    setTimeout(function(){
        $('.newCard').addClass('activeCard');
    },100)
};

function showFeedback(ans){
    //Got to fade in, get bigger and fade out. In about 3000ms
    var feed='';
    if (ans){
        feed = 'Correct!'
    }else {
        feed='Fout! DRINKEN!';
        setTimeout(function(){
            $('.drinkContainer').show();
            $('.feedback h3').remove();
            setTimeout(function(){
                $('.drinkContainer').hide();
            },2000);
        },2000);
        
    }
    $('.feedback').append('<h3>'+feed+'</h3>')
    setTimeout(function(){
        $('.feedback h3').remove();
    },2000)
}
function flipCard(newCard){
    //Remove the instructions
     $('.instructions').fadeOut(function(){ $('.instructions h3').remove() })
    //Get the card name as used in the assets
    $('.newCard').removeClass('newCard');
    console.log(newCard)
    newCard = newCard.replace(/\s+/g, '');
    newCard = newCard.replace('z', '-');
    //Place the image of the card (hidden by default)
    $('.card').append('<img src="../assets/svg/'+newCard+'.svg">');
    //Place a little version of the card inside the players avatar. It will be hidden and shown when the player gets his card
    //The numbers aren't correct to show, so they have to be converted
    var correctValue = correctValueNumber(newCard.split('-')[1]);
    $('.playerTurn .playerCards').append('<div class="playerCardsItem"><img src="assets/mini/mini'+newCard.split('-')[0]+'.png"><p>'+correctValue+'</p></div>')
    //Update the transition so the flipping will be a bit faster
    $('.card').css({transition: '0.4s ease-in-out'});
    //Make the card flip (CSS)
    $('.card').addClass('flipping');
    setTimeout(function(){
        //Wait till the card is half flipped, then flip it back by removing the flipping class. Also make the card-image visable
        $('.card').removeClass('flipping');
        $('.activeCard img').css({display: 'block'});
        //Send card away
        sendCardTo();
    },400);
}
function sendCardTo(){
    //Wait some time before removing the card
    setTimeout(function(){
        //Get postion of the current player (for some reason this isn't correct at all, so the left is calculated and the top added another 50px)
        var goal = $('.playerTurn').position();
        $('.activeCard').css({
            left: 'calc(100vw - 390px)',
            top: (goal.left + 50 )+'px',
            width: '20px',
            height: '29px'
        });
        //Wait till the animation is finished before deleting the card
        //Also, show the litte card icon in the player bar
        setTimeout(function(){
            $('.activeCard').remove();
        },400)
    },400);
}
function round5Message(){
    //First remove the playerturn
    $('.playerTurn').removeClass('playerTurn');
    var instruc = 'Tijd voor ronde 5!'
    var instruc2 = 'Als je de kaart die wordt geopend in je hand hebt mag je hem spelen.</br>Voor iedere kaart die je hebt mag je een shotje uitdelen.';
    var instruc3 = 'Voor de eerste rij een shotje, voor de tweede rij twee shotjes, enz.';
    var instruc4 = 'Laten we beginnen!';
    $('.instructions').append('<h3>'+instruc+'</h3>').fadeIn();
    setTimeout(function(){
        $('.instructions').fadeOut(function(){
            $('.instructions').empty();
            $('.instructions').append('<h3>'+instruc2+'</h3>').fadeIn();
            setTimeout(function(){
                $('.instructions').fadeOut(function(){
                    $('.instructions').empty();
                    $('.instructions').append('<h3>'+instruc3+'</h3>').fadeIn();
                    setTimeout(function(){
                        $('.instructions').fadeOut(function(){
                            $('.instructions').empty();
                            $('.instructions').append('<h3>'+instruc4+'</h3>').fadeIn();
                            setTimeout(function(){
                                $('.instructions').fadeOut(function(){
                                    $('.instructions').empty();
                                    //Temporary workaround, until the promise feature is figured out
                                    getFifteenCards()
                                    return true;
                                });
                            },2000)
                        });
                    },4000);
                });
            },5000);
        });
    },2000);
};
function placeFifteenCards(fifteenArray){
    //Hide the stack
    $('.cards').fadeOut();
    //For each item in the array the code's gonna preform an action
    //In the CSS there is a postion defined for each card based on it's ID wich is name is ('r5'+'c'+i);
    $.each(fifteenArray,function(i,val){
        val = val.replace(/\s+/g, '');
        val = val.replace('z', '-');
        $('.round5').append('<div class="round5card" id="rc'+i+'"><img src="../assets/svg/'+val+'.svg"></div')
        setTimeout(function(){
             $('#rc'+i).attr('id','r5c'+i)
        },(400*i))
    });
};
function flipFifteenCard(card){
    $('#r5c'+card).addClass('flipping');
    setTimeout(function(){
        //Wait till the card is half flipped, then flip it back by removing the flipping class. Also make the card-image visable
        $('#r5c'+card).removeClass('flipping');
        //Background image has to be removed (code below doens't do it)
        $('#r5c'+card+' img').css({backgroundImage: ''});
        //Show image
        $('#r5c'+card+' img').css({display: 'block'});
    },400);
}
//Show on screen if the player was right and what he's supposed to do
function showFeedback5(ans,i){
    var playerEle = $("div[player-id='"+i+"']")
    playerEle.addClass('playerTurn');
    //Try to get the right text
    var text = ''
    if (ans=='0|0'){
        //No cardsplayed, no shots
        text = '<p>geen kaarten gespeeld</p><p>Niets uitdelen</p>'
    } else {
        //Example: 0|2|Az2_wrong|Cz12  _wrong
        var ansSplit = ans.split('|');
        if(ansSplit[0]=='1'){
            text = '<p>1 shot uitdelen, '+ansSplit[1]+' zelf drinken</p>';
        }else{
            text = '<p>'+ansSplit[0]+' shots uitdelen, '+ansSplit[1]+' zelf drinken</p>'
        }
        var amountRight = 0;
        var amountWrong = 0;
        $.each(ansSplit, function(i, val){
            if(val.split('_')[1]=='right'){
                amountRight +=1;
            }
            if(val.split('_')[1]=='wrong'){
                amountWrong +=1;
            }
        });
        if(amountWrong==1){
            text = '1 kaart fout</p>'+text
        }else {
            text = amountWrong+' kaarten fout</p>'+text
        }
        if(amountRight==1){
            text = '<p>1 kaart goed, '+text
        }else {
           text = '<p>'+amountRight+' kaarten goed, '+text
        }
    }
    playerEle.append('<div class="persFeedback" style="display:none">'+text+'</div>');
    $('.persFeedback').fadeIn();
    setTimeout(function(){
        $('.persFeedback').fadeOut(function(){
            $(this).remove()
        });
        playerEle.removeClass('playerTurn')
    },3700)
}
//The numbers as used as the SVG names arent completely correct. The SVG set is all numbers and starts at 1. Normal card sets have numbers and letters and start at 2
function correctValueNumber(number){
    number = parseInt(number);
    if(number<10){
        var newNumber = number+1;
        return newNumber;
    }if(number==10){
        var newNumber = 'J';
        return newNumber;
    }if(number==11){
        var newNumber = 'Q';
        return newNumber;
    }if(number==12){
        var newNumber = 'K';
        return newNumber;
    }if(number==13){
        var newNumber = 'A';
        return newNumber;
    }
}