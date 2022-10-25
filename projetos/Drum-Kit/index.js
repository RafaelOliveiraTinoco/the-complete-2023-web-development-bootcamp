function Key(music_file){

    this.music_file = music_file;
    this.state = "released";
    this.playing = false;

    this.pressed = function(){

        this.state = "pressed";

    }

    this.released = function(){

        this.state = "released";

    }

}

function makesound(key, keysList, clicked = false){

    if (clicked == true){

        new Audio(keysList[key].music_file).play();
        document.querySelector("[key=\"" + key + "\"]").classList.add("pressed");

        setInterval(function(){

            document.querySelector("[key=\"" + key + "\"]").classList.remove("pressed");

        }, 100);
        return;

    }

    if(keysList[key].state == "pressed"){
        
        document.querySelector("[key=\"" + key + "\"]").classList.add("pressed");

        if (keysList[key].playing == true){

            return;

        }

        new Audio(keysList[key].music_file).play();
        keysList[key].playing = true;
        return;
    }

    document.querySelector("[key=\"" + key + "\"]").classList.remove("pressed");
    keysList[key].playing = false;

}

var keysList = {};

document.querySelectorAll(".drum").forEach(function (button){

    keysList[button.getAttribute("key")] = new Key(button.getAttribute("music_file"));

    button.addEventListener("click", function(){makesound(button.getAttribute("key"), keysList, true);});    

});

document.addEventListener("keydown", function(key){try{keysList[key.key].pressed(); makesound(key.key, keysList);}catch{}});
document.addEventListener("keyup", function(key){try{keysList[key.key].released(); makesound(key.key, keysList);}catch{}});