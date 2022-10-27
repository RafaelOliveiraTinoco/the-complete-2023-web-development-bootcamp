function random_int_number(min, max){

    return Math.floor(Math.random() * (max - min + 1)) + min;

}

function Simon(){

    this.colors = ["green", "red", "yellow", "blue"];
    this.color_sequence_game = [];
    this.color_sequence_user = [];
    this.game_level = 0;

    this.enable_start_game_button = function (){

        $("h1").on("click", (event) => this.new_level());
    
    }
    
    this.disable_start_game_button = function (){
    
        $("h1").off("click");
    
    }

    this.new_level = function (){

        // disable user input
        this.user_input_disable();
        this.disable_start_game_button();

        this.game_level++;
        $("h1").text("Level " + this.game_level);

        setTimeout(() => {

            // add new color to sequence
            this.color_sequence_game.push(this.colors[random_int_number(0, 3)]);

            // play last color
            $("div.row > div.btn#" + this.color_sequence_game[this.color_sequence_game.length - 1]).fadeOut(100).fadeIn(100);
            new Audio("sounds/" + this.color_sequence_game[this.color_sequence_game.length - 1] + ".mp3").play();

            // enable user input
            this.user_input_enable();

        }, 1000);

    }

    this.validate_user_input = function (event){

        $(event.currentTarget).addClass("pressed");

        this.color_sequence_user.push($(event.currentTarget).attr("id"));
        
        // validate
        if (this.color_sequence_user[this.color_sequence_user.length - 1] != this.color_sequence_game[this.color_sequence_user.length - 1]){

            // game over
            this.color_sequence_user = [];
            this.color_sequence_game = [];

            // game over sound
            new Audio("sounds/wrong.mp3").play();

            // game over red screen
            $("body").addClass("game-over");
            setTimeout(() => {
                
                $("body").removeClass("game-over")
            
            }, 200);

            setTimeout(() => {

                $(event.currentTarget).removeClass("pressed");

            }, 150);

            $("h1").html("Game Over!<br>Score: " + this.game_level);
            this.game_level = 0;
            this.enable_start_game_button();

        }else{

            // correct
            new Audio("sounds/" + $(event.currentTarget).attr("id") + ".mp3").play();
            setTimeout(function (){

                $(event.currentTarget).removeClass("pressed");

            }, 150);

            // check if level ended
            if (this.color_sequence_game.length == this.color_sequence_user.length){
                this.color_sequence_user = [];
                this.new_level();

            }

        }

    }

    this.user_input_enable = function (){

        $("div.row > div.btn").on("click", (event) => this.validate_user_input(event));
    
    }
    
    this.user_input_disable = function (){
    
        $("div.row > div.btn").off("click");
    
    }
}

var simon_game = new Simon();
simon_game.enable_start_game_button();
