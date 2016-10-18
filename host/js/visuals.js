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
        feed='Fout! DRINKEN!'
    }
    $('.feedback').append('<h3>'+feed+'</h3>')
    setTimeout(function(){
        $('.feedback h3').remove();
    },3000)
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