function checkDrinks(){
    $.ajax({
        type: "POST",
        data: {room:roomNum,player:playerName},
        url: "php/checkDrinks.php",
        success: function(data){
            if(parseInt(data)!=0){
                var text = '';
                if (parseInt(data)==1){
                    text = '1 <span class="drinkinH2">slok</span>'
                }else {text = data+'<span class="drinkinH2">slokken</span>'}
                $('.takeDrink h2').html(text)
                $('.takeDrink').fadeIn();
            }
            if(parseInt(data)==0){
                $('.takeDrink').fadeOut();
            }
            setTimeout(function(){
                checkDrinks();
            },1000)
        }
    })
}

$('#takeDrink').click(function(){
    //Remove on drink from the choice value in the database
    var curPoints = $('.points p').text();
    curPoints = parseInt(curPoints);
    curPoints+=1;
    $('.points p').text(curPoints)
    $(this).fadeOut();
    setTimeout(function(){
        $('#takeDrink').fadeIn()
    },1200)
    $.ajax({
        type: "POST",
        data: {room:roomNum,player:playerName},
        url: "php/removeDrink.php",
        success: function(data){
        }
    })
})