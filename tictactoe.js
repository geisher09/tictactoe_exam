$( document ).ready(function() {
    const tiles = $(".tile");
    const reset = $(".reset");
    const settings = $(".settings");
    const save_game = $(".save-game");
    const show_leaderboard = $(".show-leaderboard");
    const reset_scoreboard = $(".reset-scoreboard");
    const winning_sequence = [
        [1,2,3],
        [4,5,6],
        [7,8,9],
        [1,5,9],
        [3,5,7],
        [1,4,7],
        [2,5,8],
        [3,6,9]
    ]

    let player = '';
    let winnername = '';
    let isDraw = false;
    let clickedTileCounter = 0;

    var score_X = 0;
    var score_O = 0;
    var scores_obj = [];
    
    tiles.click(function() {
        tileClicked(tiles.index(this));
    });

    //check on all input keyups in .account-sets
    $(".account-sets input").keyup(function() {
        if(checkIfValid()){
            $(".start").prop('disabled', false);
        }else{
            $(".start").prop('disabled', true);
        }
    });

    $(".start").click(function() {
        $(".initial-msg-wrapper").hide();
        $(".pick-player-wrapper").show();

        player_x = $('input[name=account_x]').val();
        player_o = $('input[name=account_o]').val();
        setPlayers(player_x, player_o);
    });

    $(".start-game").click(function() {
        $(".opening-container").addClass('animate__animated animate__backOutRight');
        player = $('input[name=player]:checked').val();
        $("." + player + "-spot").addClass("isTurn");
    });

    function checkIfValid(){
        return $("input[name=account_x]").val().length > 2 && 
            $("input[name=account_o]").val().length > 2 &&
            $("input[name=account_x]").val() != $("input[name=account_o]").val();
    }

    function setPlayers(x, o){
        //Turn
        $(".X-spot").text(x);
        $(".O-spot").text(o);

        //Score
        $(".x_uname").text(x);
        $(".o_uname").text(o);
    }

    function tileClicked(index){
        if(!tiles.eq(index).is(".x-mark, .o-mark")){ //stops double clicking on a tile
            //Setting of marks
            const markClass = player == 'X' ? "x-mark" : "o-mark";
            tiles.eq(index).addClass(markClass);

            if(checkWinner(markClass)){
                tiles.css("pointer-events", "none");

                animateWinningLine(checkWinner(markClass)[1]);
                setTimeout(function(){
                    winnername = player == 'X' ? player_x : player_o;
                    scoring(player);
                    showResult("Player " + winnername + " Won!");
                    removeAnimation();
                }, 700);
            }else if(isDraw){
                showResult("DRAW")
            }else{
                //Switching Players
                player = player == 'X' ? 'O' : 'X';
                $(".indicator").removeClass("isTurn");
                $("." + player + "-spot").addClass("isTurn");
            }

        }
    }

    function checkWinner(markClass){
        clickedTileCounter++;
        for (let i = 0; i < winning_sequence.length; i++) {
            if(sequenceCheck(i, markClass)){
                return [true, i];
            }else if(!sequenceCheck(i, markClass) && clickedTileCounter == 9){ //Check for draw
                isDraw = true;
            }
        }
    }

    function sequenceCheck(index, markClass){
        return winning_sequence[index].every(function(key) {
            return tiles.eq(key-1).hasClass(markClass); //check if every tile on the sequence has the same markClass
        });
        
    }

    function animateWinningLine(i) {
        for (let x = 0; x < winning_sequence[i].length; x++) {
            tiles.eq(winning_sequence[i][x]-1).addClass("animate__animated animate__tada")
        }
    }

    function removeAnimation(){
        tiles.removeClass("animate__animated animate__tada");
        tiles.css("pointer-events", "");
    }

    function scoring(player){
        if(player == 'X'){
            score_X++;
            $(".x_score").text(score_X);
        }else{
            score_O++;
            $(".o_score").text(score_O);
        }
    }

    function resetScores(){
        score_X = 0;
        score_O = 0;
        $(".x_score").text(score_X);
        $(".o_score").text(score_O);
    }

    function showResult(msg){
        $(".results-msg").text(msg);
        $(".result-container").addClass("dsp-flex");
    }

    reset.click(function() {
        //reset values
        isDraw = false;
        clickedTileCounter = 0;

        //remove markClass
        tiles.removeClass("x-mark o-mark");

        //remove results message
        $(".results-msg").text("");
        
        
        // $(".result-container").removeClass("dsp-flex");
        $(".result-container").removeClass('animate__zoomIn');
        $(".result-container").addClass('animate__zoomOut');

        setTimeout(function(){ 
            $(".result-container").removeClass("dsp-flex");
            $(".result-container").removeClass('animate__zoomOut');
            $(".result-container").addClass('animate__zoomIn');
        }, 100);

        //reset indicator
        $(".indicator").removeClass("isTurn")
        $("." + player + "-spot").addClass("isTurn");
    });
    

    settings.click(function() {
        $( ".settings_dropdown" ).toggle( "slide", {direction: 'up'});
        if(score_X > 0 || score_O > 0){
            save_game.css("pointer-events", "");
            reset_scoreboard.css("pointer-events", "");
        }else{
            save_game.css("pointer-events", "none");
            reset_scoreboard.css("pointer-events", "none");
        }
    });

    save_game.click(function() {
        scores_obj = {
            'player_x' : {
                'uname': player_x,
                'score': score_X,
            },
            'player_o' : {
                'uname': player_o,
                'score': score_O,
            }
        }
        saveGame(scores_obj);
    });

    show_leaderboard.click(function() {
        var data;
        $.ajax({
            type: "GET",  
            url: "score_history.csv",
            dataType: "text",       
            success: function(response)  
            {
                data = $.csv.toArrays(response);
                showLeaderboard(data);
            }
        });
    });

    reset_scoreboard.click(function() {
        resetScores();
        $( ".settings_dropdown" ).hide();
        showResult("Scores Reset!");
    });
    
    function saveGame(scores_obj){
        var score_data = scores_obj;

        $.ajax({
            url:"save_score_history.php",
            method:"POST",  
            data:{ scores_data: score_data },  
            dataType:"JSON",  
            success: function(data) {
                showResult("Scores Saved!");
                $( ".settings_dropdown" ).hide();
                resetScores();
            }
        });
    }

    function showLeaderboard(scores){

        //make scores' 2nd col an Int
        for (var i = 0; i < scores.length; i++) {
            scores[i][1] = parseInt(scores[i][1]);
        }

        //add scores on unames that has the same val
        let result = Object.values(scores.reduce((total , score) => {
            if (total[score[0]]) {
                total[score[0]][1] += score[1]; //Add if it has duplicates
            }else{
                total[score[0]] = score;
            }
            return total;
        }, {}));
        
        //sort score desc
        result.sort(function(a,b) {
            return b[1]-a[1];
        });

        $(".leaderboard table").append('<tr><th>Username</th><td>Score</td></tr>');

        for (var i = 0; i < result.length; i++) {
            var account =   '<tr><td>' + result[i][0] + '</td><td>' + result[i][1] + '</td></tr>';
            $(".leaderboard table").append(account);
        }
        $(".leaderboard").show();
    }

    $(".close").click(function() {
        $(".leaderboard").hide();
        $(".leaderboard table tr").remove();
        $( ".settings_dropdown" ).hide();
    });
});