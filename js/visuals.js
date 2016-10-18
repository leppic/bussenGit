function hideLogin(){
    $('.login').hide();
}
function showChoices(ch1,ch2){
    $('#choice1').text(ch1);
    $('#choice2').text(ch2);    
    $('.buttons').fadeIn();    
}
function hideChoices(){
    $('.buttons').fadeOut();    
}
function showCard(cards){
    console.log(cards)
    var cardsArr = cards.split('_');
    var thisCard = cardsArr[round];
    var thisCard = thisCard.replace(/\s+/g, '');
    var thisCard = thisCard.replace('z', '-');
    var cardPlace = $('.container').find('.card'+round+'Idle')
    $(cardPlace).append('<img src ="assets/svg/'+thisCard+'.svg">');
}