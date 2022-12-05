<?php
  $file_name = $_FILES['file']['name'] ?? null; //getting file name
  $tmp_name = $_FILES['file']['tmp_name'] ?? null; //getting temp_name of file
  // $file_up_name = time().$file_name; //making file name dynamic by adding time before file name
  move_uploaded_file($tmp_name, "files/".$file_name); //moving file to the specified folder with dynamic name
  // move_uploaded_file($tmp_name, '/uploads/$file_up_name');
  // copy($_FILES['file']['tmp_name'], $path);
  // echo $_SERVER["SERVER_ADDR"];
  // echo $_SERVER["REMOTE_ADDR"];
  // echo 'pinguinus';
 
  if (isset($_POST)) {
      $temp1 = $_POST['sides'] ?? null;
      $temp2 = $_POST['name_file'] ?? null;
      print("Режим: " . $temp1);
      print("<br>Имя файла: " . $temp2);
      add_spooler_task($_POST['sides'] ?? null, $_POST['name_file'] ?? null);
  }

  // Добавить файл в очередь печати спулера
  function add_spooler_task($sides, $name_file){
    // Удалить файл с таким же именем если он существует
    //shell_exec('touch textverybigrichsomushsolong.txt'); 

    //Отправка файла на печать
    shell_exec('lp -o sides=' . $sides . ' "/files' . $name_file . '"');
    //shell_exec('lp -o sides=two-sided-long-edge files/"781d30e0106c46dc8f0ae165b0787dd1.pdf"');
  }
?>
