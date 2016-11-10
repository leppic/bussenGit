function addScore(ans){
    if(ans==false){
        $.ajax({
            type: "POST",
            data: {room:room,turn:turn, points:round},
            url: "php/addDrinks.php",
            success: function(data){
            }
        })
        var curAm = parseInt( $('.playerTurn .drinks p').text() );
        $('.playerTurn .drinks p').text(curAm+round);
    }
}
function addScore5(playerID,drinks){
    $.ajax({
        type: "POST",
        data: {room:room,turn:playerID, points:drinks},
        url: "php/addDrinks.php",
        success: function(data){
        }
    })
}