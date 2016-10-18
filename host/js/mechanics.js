function checkAnswer(answer,cards){
    //        The cards are a combination of a letter(A,B,C or D) and a number (1-13) combined with a z
//        So: Az1 or Dz12
//    A is Clubs
//    B is Diamond
//    C is Hearths
//    D is Spades
    
    //Round one guessing the right color
    if(round==1){
        //Split te cards and take the second card (first is a placeholder)
        var card1 = cards.split('_')[1];
        var card1typ = card1.split('z')[0];
//        splitCards.split('z')[0];
        if((card1typ=='A' || card1typ=='D')&&answer==2){
            //Correct answer is black (A or D) and the answer given is 2 (black)
            //The user was correct
            return true;
        } else if ((card1typ=='B' || card1typ=='C')&&answer==1){
            //Correct answer is red (B or C) and the answer given is 1 (red)
            //The user was correct
            return true
        } else {
            //If none of the above, the user is wrong
            return false
        }
    }
    //Round two is higher or lower then the previous card
    if(round==2){
        //Split te cards and take the second card (first is a placeholder)
        var card1 = cards.split('_')[1];
        var card2 = cards.split('_')[2];
        var card1num = card1.split('z')[1];
        var card2num = card2.split('z')[1];
//        you have to 'parse' the numbers to convert them to int's. Otherwise you can't compare them
        card1num=parseInt(card1num)
        card2num=parseInt(card2num)
//        splitCards.split('z')[0];
        if(card2.split('z')[1]<card1.split('z')[1]&&answer==2){
            //Correct answer is card2 is lower then card1 and the answer given is 2 (lower)
            //The user was correct
            return true;
        } else if(card2.split('z')[1]>card1.split('z')[1]&&answer==1){
            //Correct answer is card2 is higher then card1 and the answer given is 2 (higher)
            //The user was correct
            return true
        } else {
            //If none of the above, the user is wrong. Same value is wrong too
            return false
        }
    }
    //Round three is between or outside the two previous cards
    if(round==3){
        //Split te cards and take the second card (first is a placeholder)
        var card1 = cards.split('_')[1];
        var card2 = cards.split('_')[2];
        var card3 = cards.split('_')[3];
        var card1num = card1.split('z')[1];
        var card2num = card2.split('z')[1];
        var card3num = card3.split('z')[1];
//        you have to 'parse' the numbers to convert them to int's. Otherwise you can't compare them
        card1num=parseInt(card1num)
        card2num=parseInt(card2num)
        card3num=parseInt(card3num)
        
        
//        splitCards.split('z')[0];
        if((card3num<card1num&&card3num<card2num&&answer==2) ||(card3num>card1num&&card3num>card2num&&answer==2)  ){
            return true;
        }else if((card3num<card1num&&card3num>card2num&&answer==1) ||(card3num>card1num&&card3num<card2num&&answer==1)  ){
            return true;
        } else {
            return false;
        }
    }
    //Round four is wether you allready have the image of the new card in your hand
    if(round==4){
        //Split te cards and take the second card (first is a placeholder)
        var card1 = cards.split('_')[1];
        var card2 = cards.split('_')[2];
        var card3 = cards.split('_')[3];
        var card4 = cards.split('_')[4];
        var card1typ = card1.split('z')[0];
        var card2typ = card2.split('z')[0];
        var card3typ = card3.split('z')[0];
        var card4typ = card4.split('z')[0];
//        you have to 'parse' the numbers to convert them to int's. Otherwise you can't compare them
//        splitCards.split('z')[0];
        if ((card1typ==card4typ|| card2typ==card4typ|| card3typ==card4typ)&&answer==1){
            return true;
        }else if ((card1typ!=card4typ || card2typ!=card4typ || card3typ!=card4typ)&&answer==2){
            return true;
        } else {
            return false;
        }
    }
}