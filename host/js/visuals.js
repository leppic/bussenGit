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
    $('#'+card).addClass('flipping');
    setTimeout(function(){
        //Wait till the card is half flipped, then flip it back by removing the flipping class. Also make the card-image visable
        $('#'+card).removeClass('flipping');
        //Background image has to be removed (code below doens't do it)
        $('#'+card+' img').css({backgroundImage: ''});
        //Show image
        $('#'+card+' img').css({display: 'block'});
    },400);
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