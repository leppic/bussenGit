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
    var thisCard = thisCard.replace('z', '-');
    $('.container').append('<div class="card closed outside"></div>');
    $('.outside').append('<img src ="assets/svg/'+thisCard+'.svg">');
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
    thisCard = thisCard.replace(/\s+/g, '');
    thisCard = thisCard.replace('z', '-');
    var cardPlace = $('.container').find('.card'+round+'Idle')
    $(cardPlace).append('<img src ="assets/svg/'+thisCard+'.svg">');
}
function choiceFeedback(correct){
    if(correct==true){
        console.log(correct)
    } else {
        console.log(correct)
    }
    setTimeout(function(){ inHand() },700);  
}