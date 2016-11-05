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
        //For now they will be hidden (DOnt remove. If the player choose an incorrect card he's gonna need it later)
        $('.selected').fadeOut();
        var chosenCard = 5
        $.each($('.selected'), function(i,value){
           chosenCard = chosenCard+'|'+$(this).attr('card-id');
            
        });
        postChoice5(chosenCard);
        //Remove the click functionality from the cards
        $('.inHand').off('click')
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
    //The client should communicate the choices to the host
    $.ajax({
        type: "POST",
        data: {room:roomNum,player:playerName},
        url: "php/getAns5.php",
        success: function(data){
//            after posting start listining again
            console.log(data);
            if(data.split('|').length<=1){
                setTimeout(function(){
                    //No answer was posted
                    waitForHost5();
                },1000) 
            }else if(data.replace(/\s+/g, '')=='0|0'){
                //No drinks, no problem
                //Just start listing again
                waitForHost()
            }else {
                var splitData = data.split('|');
//                splitData[0] = drinks to give away
//                splitData[1] = drinks to drink yourself
//                splitData[2 and up] = correctness per card
                $.each(splitData, function(i, val){
                    if(i==0){
                        var parseVal = parseInt(val)
                        if(parseVal>0){
                            getPlayerList(parseVal);
                        }else{
                            //Just start listing again
                            waitForHost()
                        }
                    }else if(i==1){
                        //Not really relevant yet
                    }else {
                        var splitval = val.split('_')
                        //Remove cards or show them again
                        //Visual
                        r5HideOrShow(splitval[0],splitval[1])
                    }
                })
                
            }
            
        }
    });
}
function getPlayerList(i){
    //Load all players
    $.ajax({
        type: "POST",
        data: {room:roomNum},
        url: "php/getPlayerList.php",
        success: function(data){
            console.log(data);
            giveDrinks(i,data);
        }
    });
}
function giveDrinks(i,data){
    //i is the amount of drinks
    var givenDrinks = 0;
    //Data looks like this (0_client_0|1_Chanan_0|2_Bertus_0)
    var splitData = data.split('|');
    var buttonSet = '<div class="buttonSet"><button class="down">-</button><p>0</p><button class="up">+</button></div>';
    $('.container').append('<div class="giveDrink"></div')
    $.each(splitData, function(j,jal){
        console.log(jal)
        var splitJal = jal.split('_')
        if(splitJal[0]==0||splitJal[1]==playerName||j==(splitData.length-1)){
            //Do nothing
        }else{
            $('.giveDrink').append('<div class="givePlayer" player-id="'+ splitJal[0] +'"><h3>'+splitJal[1]+'</h3><div class="drinkDrinks">'+splitJal[2]+'</div>'+buttonSet+'</div>')
        }
    });
    //Add the send button
    $('.giveDrink').append('<button class="send">Klaar</button>')
    //clickhandlers
    $('.up').click(function(){
        console.log(i)
        var clicked =$(this).parent().children('p')[0]
        console.log(clicked)
        console.log($(this).parent().children('p'))
        if(givenDrinks<i){
            $(clicked).text(parseInt($(clicked).text())+1);
            givenDrinks+=1;
            console.log(givenDrinks)
        }else{
            //nothing
        }
    })
    $('.down').click(function(){
        var clicked =$(this).parent().children('p')[0]
        if($(clicked).text()==0){
            //nothing
        } else {
            $(clicked).text(parseInt($(clicked).text())-1);
            givenDrinks-=1;
        }
    });
    $('.send').click(function(){
        if(givenDrinks==i){
            var list = ''
            $.each($('.givePlayer'), function(v,val){
                var a = $(val).attr('player-id')
                var b = $(val).find('.buttonSet')[0]
                b = $(b).children('p')[0]
                b = $(b).text()
                list = list+a+'_'+b+'|'
            })
            list = list.slice(0, -1);
            sendDrinks(list,i)
        }else{
            //Nothing (could be a alert)
        }
    })
};

function sendDrinks(list,i){
    $.ajax({
        type: "POST",
        data: {room:roomNum, player:playerName, choice:list},
        url: "php/postChoice.php",
        success: function(data){
            //Hide the buttons after this and start listing again. Because after everyone got his drinks the game continues
            console.log(data);
            $('.giveDrink').fadeOut(function(){
                $(this).remove(); 
            });
            //Listing has to called for players who didn't have any correct cards
            waitForHost()
        }
    });
}
