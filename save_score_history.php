<?php
    $scores = $_POST["scores_data"];

    // dl or open csv file
    $file_open = fopen("score_history.csv", "a");

    //saving data
    foreach ($scores as $sc){
        $form_data = array($sc['uname'], $sc['score']);
        fputcsv($file_open, $form_data);
    }
    
    $data = $scores;

    // return
    echo json_encode($data);

?>