function setup5(){
    //Add button
    $('header').after('<div class="button5"><button id="round5">Ik heb niets</button></div>')
    //Change buttontext when none or any number of cards are selected
    $('.inHand').click(function(){
        //Used to determine wether there should be a fade
        var oldLength = $('.selected').length;
        //Make cards selectable
        $(this).toggleClass('selected');
        if($('.selected').length==0){
            $('button#round5').fadeOut(function(){
                $('button#round5').text('Ik heb niets').fadeIn();
            });
        } else if(oldLength==0) {
            $('button#round5').fadeOut(function(){
                $('button#round5').text('Deze waarde matchen').fadeIn();
            });
        }
    });
    //Post choice (and set your turn back to 0)
    $('button#round5').click(function(){
        //Remove button (we do this so the whole setup can be used again)
        $('.button5').fadeOut(function(){$(this).remove()})
        //Visual
        //Visuals for the cards. They should fly away or something
        //For now they will be hiden (DOnt remove. If the player choose an incorrect card he's gonna need it later)
        $('.selected').fadeOut(function(){$(this).remove()});
        var chosenCard = 5
        $.each($('.selected'), function(i,value){
           chosenCard = chosenCard+'|'+$(this).attr('card-id');
            
        });
        postChoice5(chosenCard);
    })
};
function postChoice5(choice){
    $.ajax({
        type: "POST",
        data: {room:roomNum,player:playerName,choice:choice},
        url: "php/postChoice.php",
        success: function(data){
            console.log(data);
//            after posting start listining again
            waitForHost5();
        }
    });
}
function waitForHost5(){
    //The host should let the player know when all players answered
    //If the player was right he may give away one or more shots
    //The server lets know how many he may give away
    //The client should communicate the choices to the host (dunno how yet)
}