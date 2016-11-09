function drinkDrink(){
    var obam1 = $('img.obam1')
    var obam2 = $('img.obam2')
    var obam3 = $('img.obam3')
    var drinkdrink = $('#drinkdrink')[0];
    var tooot = $('#tooot')[0];
    var timing = 350;
    $('.drinkingVisuals').show();
    $(obam1).css({
        left: '0vw'
    });
    drinkdrink.play();
    setTimeout(function(){
        $('.drink1').fadeIn()
    },timing);
    setTimeout(function(){
        $(obam2).css({
            top: '0vh'
        });
    },timing*1);
    setTimeout(function(){
        $('.drink2').fadeIn()
    },timing*2);
    setTimeout(function(){
        $(obam3).css({
            right: '0vw'
        });
    },timing*3);
    setTimeout(function(){
        $('.drink3').fadeIn()
    },timing*4);
    setTimeout(function(){
        $('.drink4').fadeIn();
        $('.drink4').css({
            fontSize: '24vw',
            transform: 'rotate(365deg)'
        });
    },timing*5);
    setTimeout(function(){
        tooot.play();
        $('.drinkingVisuals').css({
            transform: 'rotate(-1080deg) scale(5)'
        });
        setTimeout(function(){
            $('.drinkingVisuals').fadeOut(500,function(){
                $('.drinkingVisuals').css({
                    transform: 'rotate(0deg) scale(1)'
                });
                $(obam1).css({left: '-826px'})
                $(obam2).css({top: '-365px'})
                $(obam3).css({right: '-1014px'})
                $('.drink1').hide()
                $('.drink2').hide()
                $('.drink3').hide()
                $('.drink4').hide()
                $('.drink4').css({fontSize: '17vw',transform: 'rotate(-5deg)'})
            })
        },500)
    },(timing*5)+900);
}

