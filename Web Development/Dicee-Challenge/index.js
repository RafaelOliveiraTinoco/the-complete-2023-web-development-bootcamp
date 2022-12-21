function random_int_number_generator(min, max){

    return Math.floor(Math.random() * (max - min + 1) + min);

}

function getWinner(results){

    var high = 0;
    var draw = false;
    var winner;

    // get highest number

    results.forEach(function (dice_value, player_number){

        if(dice_value > high){
            high = dice_value;
            winner = player_number + 1;
        }

    });

    // check draw

    var count = 0;

    results.forEach(function (dice_value){

        if (dice_value == high){

            count++;

        }

    });

    if(count > 1){

        draw = true;

    }

    // show results

    if(draw){

        document.querySelector(".container h1").innerHTML = "Draw!";

    }else{

        document.querySelector(".container h1").innerHTML = "Player " + winner + " wins!";

    }

}

var results = [];

// roll dices

document.querySelectorAll(".container .dice").forEach(
    function(dice){

        var random_number = random_int_number_generator(1, 6);
        results.push(random_number);

        dice.querySelector("img").setAttribute("src", "images/dice" + random_number + ".png");
        dice.querySelector("img").setAttribute("number", random_number);

    }
);

getWinner(results);