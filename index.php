<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@600&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="tictactoe.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css">

</head>
<body>
    <div class="opening-container">
        <div class="initial-msg-wrapper">
            <h1>Let's Play Tic Tac Toe!</h1>
            <div class="account-sets">
                <div class="col">
                    <label for="account_x">Player X's username:</label>
                    <input type="text" class="acc-name" name="account_x" maxlength="8" placeholder="Player X">
                </div>

                <div class="col">
                    <label for="account_o">Player O's username:</label>
                    <input type="text" class="acc-name" name="account_o" maxlength="8" placeholder="Player O">
                </div>
                
            </div>
            <button class="start" disabled>START</button>
        </div>

        <div class="pick-player-wrapper animate__animated animate__bounceIn">
            <p>Choose Who Goes First:</p>
            <div class="radios">
                <label>
                    <input class="radio" type="radio" name="player" value="X" checked>
                    <img height="110" src="x.svg">
                </label>
                <label>
                    <input class="radio" type="radio" name="player" value="O">
                    <img height="110" src="o.svg">
                </label>
            </div>

            <button class="start-game">Let's Go!</button>
        </div>
    </div>
    <!-- <h1>TIC TAC TOE</h1> -->
    <div class="players-container">
        <div class="indicator X-spot">
        </div>
        <div class="indicator O-spot">
        </div>
    </div>
    <div class="board">
        <div class="tile"></div>
        <div class="tile"></div>
        <div class="tile"></div>
        <div class="tile"></div>
        <div class="tile"></div>
        <div class="tile"></div>
        <div class="tile"></div>
        <div class="tile"></div>
        <div class="tile"></div>
    </div>
    <div class="scoring-container">
        <div class="reset-board reset">
            <i class="fas fa-sync-alt"></i>
        </div>

        <div class="row">
            <span class="x_uname"></span>
            <div class="score-board">
                <span class="x_score">0</span>
                &nbsp;-&nbsp;
                <span class="o_score">0</span>
            </div>
            <span class="o_uname"></span>
        </div>
        
        <div class="settings">
            <i class="fas fa-cog"></i>
        </div>
        <div class="settings_dropdown">
            <div class="row save-game">
                <i class="far fa-save"></i>
                <p>Save Game To Leaderboard</p>
            </div>

            <div class="row show-leaderboard">
                <i class="fas fa-list-ol"></i>
                <p>Show Leaderboard</p>
            </div>

            <div class="row reset-scoreboard">
                <i class="fas fa-power-off"></i>
                <p>Reset Score Board</p>
            </div>
        </div>
    </div>

    <div class="result-container animate__animated animate__faster animate__zoomIn">
        <div class="results-msg">
        </div>
        <button class="reset">New Game</button>
    </div>

    <div class="leaderboard animate__animated animate__faster animate__zoomIn">
        <i class="close far fa-times-circle"></i>
        <h2>Leaderboard</h2>
        <table>
        </table>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="https://code.jquery.com/ui/1.13.0/jquery-ui.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-csv/1.0.21/jquery.csv.min.js"></script>
    <script src="tictactoe.js"></script>
</body>
</html>