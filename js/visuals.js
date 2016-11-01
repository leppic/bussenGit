function hideLogin(){
    $('.login').hide();
}
function showChoices(ch1,ch2,cards){
    $('#choice1').text(ch1);
    $('#choice2').text(ch2);    
    $('.buttons').fadeIn();    
}
function hideChoices(){
    $('.buttons').fadeOut();    
}
function enterCard(cards){
    var cardsArr = cards.split('_');
    var thisCard = cardsArr[round];
    var thisCard = thisCard.replace(/\s+/g, '');
    var thisCardConv = thisCard.replace('z', '-');
    $('.container').append('<div class="card closed outside"></div>');
    $('.outside').append('<img src ="assets/svg/'+thisCardConv+'.svg">');
    $('.outside').attr('card-id',thisCard);
    setTimeout(function(){ $('.outside').removeClass('outside'); }, 200);  
}
function turnCard(){
    $('.closed').addClass('flipping'); 
    setTimeout(function(){ 
        $('.closed').addClass('current'); 
        $('.closed').removeClass('flipping'); 
        $('.closed').removeClass('closed'); 
    }, 200);
    //Show the text whether it is a win
    //Controlled by mechanics.js
}
function inHand(){
    $('.current').addClass('inHand').css({left:((round-1)*24+4)+'vw'});
    $('.current').removeClass('current');
}

function showCard(cards){
    console.log(cards)
    var cardsArr = cards.split('_');
    var thisCard = cardsArr[round];
    var cardPlace = $('.container').find('.card'+round+'Idle');
    thisCard = thisCard.replace(/\s+/g, '');
    $(cardPlace).attr('card-id',thisCard);
    thisCard = thisCard.replace('z', '-');
    $(cardPlace).append('<img src ="assets/svg/'+thisCard+'.svg">');
}
function choiceFeedback(correct){
    if(correct==true){
        console.log(correct)
    } else {
        console.log(correct)
    }
    setTimeout(function(){ inHand() },1200);  
}
function changeName(name){
    $('header h2').text(name)
}
function changeAvatar(){
    //Get propper ID from database
    $('header img').attr('src', 'assets/avatars/av1.png')
}
function r5HideOrShow(card,ans){
    card = card.replace(/\s+/g, '')
    ans = ans.replace(/\s+/g, '')
    if(ans=='wrong'){
        console.log(card+' shown again')
        $('div[card-id="'+card+'"]').fadeIn(function(){
            $(this).removeClass('selected')
        })
    }else if(ans=='right'){
        console.log(card+' should be removed')
        $('div[card-id="'+card+'"]').remove();
    }
}