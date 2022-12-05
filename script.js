let name_file;

window.onload = function () {
  document.getElementById('form-button').onclick = function () {
    console.log("button2 clicked");
    this.disabled = true;
    // Создать переменную sided и name_file
    let sided = "two-sided-long-edge";
    // Определить ее значения по нажатой кнопке drive-one side, fly-two side
    if (document.getElementById('drive').checked || document.getElementById('fly').checked) {
      sided = "one-sided";
    }
    // ajaxGet();
    send_to_print(sided, name_file);
  }
}

function ajaxGet() {
  var request = new XMLHttpRequest();

  request.onreadystatechange = function () {
    if (request.readyState == 4 && request.status == 200) {
      document.querySelector('#myip').innerHTML = request.response
      console.log(request.response);
    }
  }

  request.open('GET', 'php/upload.php');
  request.send()
}


// Добавить два аргумента sides, name_file
function send_to_print(sided, name_file) {
  $.ajax({
    method: "POST",
    url: "php/upload.php",
    data: { sides: sided, name_file: name_file },
    success: 'success',
  })

}






const form = document.querySelector("form"),
  fileInput = document.querySelector(".file-input"),
  progressArea = document.querySelector(".progress-area"),
  uploadedArea = document.querySelector(".uploaded-area");

// form click event
form.addEventListener("click", () => {
  fileInput.click();
});

fileInput.onchange = ({ target }) => {
  let file = target.files[0]; //getting file [0] this means if user has selected multiple files then get first one only

  // Add2 Определение расширения файла, мб пригодится в будущем
  // var [filename, extension] = file.name.split('.')
  //   .reduce((acc, val, i, arr) => (i == arr.length - 1)
  //     ? [acc[0].substring(1), val]
  //     : [[acc[0], val].join('.')], [])
  // console.log(extension)

  if (file.name.substr(-4) == '.pdf') {
    if (file) {
      let fileName = file.name; //getting file name
      name_file = file.name;
      console.log(fileName);
      if (fileName.length >= 12) { //if file name length is greater than 12 then split it and add ...
        let splitName = fileName.split('.');
        fileName = splitName[0].substring(0, 13) + "... ." + splitName[1];
      }
      uploadFile(fileName); //calling uploadFile with passing file name as an argument
    }
  } else {
    alert("Выберите файл для печати в формате PDF");
    // toast notification 
    // iqwerty.toast.toast('Hello World!');
  }

}

// file upload function
function uploadFile(name) {
  // Add1 закрытие прошлых соединений 
  window.stop()

  let xhr = new XMLHttpRequest(); //creating new xhr object (AJAX)
  xhr.open("POST", "php/upload.php"); //sending post request to the specified URL
  xhr.upload.addEventListener("progress", ({ loaded, total }) => { //file uploading progress event
    let fileLoaded = Math.floor((loaded / total) * 100);  //getting percentage of loaded file size
    let fileTotal = Math.floor(total / 1000); //gettting total file size in KB from bytes
    let fileSize;

    // Add1 Очистка html кода от файлов с которыми закрыто соединение
    uploadedArea.innerHTML = "";

    // if file size is less than 1024 then add only KB else convert this KB into MB
    (fileTotal < 1024) ? fileSize = fileTotal + " KB" : fileSize = (loaded / (1024 * 1024)).toFixed(2) + " MB";
    let progressHTML = `<li class="row">
                          <i class="fas fa-file-alt"></i>
                          <div class="content">
                            <div class="details">
                              <span class="name">${name} • Uploading</span>
                              <span class="percent">${fileLoaded}%</span>
                            </div>
                            <div class="progress-bar">
                              <div class="progress" style="width: ${fileLoaded}%"></div>
                            </div>
                          </div>
                        </li>`;
    // uploadedArea.innerHTML = ""; //uncomment this line if you don't want to show upload history
    uploadedArea.classList.add("onprogress");
    progressArea.innerHTML = progressHTML;
    if (loaded == total) {
      progressArea.innerHTML = "";
      let uploadedHTML = `<li class="row">
                            <div class="content upload">
                              <i class="fas fa-file-alt"></i>
                              <div class="details">
                                <span class="name">${name} • Uploaded</span>
                                <span class="size">${fileSize}</span>
                              </div>
                            </div>
                            <i class="fas fa-check"></i>
                          </li>`;
      uploadedArea.classList.remove("onprogress");
      // uploadedArea.innerHTML = uploadedHTML; //uncomment this line if you don't want to show upload history
      uploadedArea.insertAdjacentHTML("afterbegin", uploadedHTML); //remove this line if you don't want to show upload history

      // Сделать видимыми кнопки печати и divider-ы
      $(".container").css('display', 'block');
      $(".container").css('visibility', 'visible');
      $(".gradient").css('display', 'block');
      $(".gradient").css('visibility', 'visible');
    }
  });
  let data = new FormData(form); //FormData is an object to easily send form data
  xhr.send(data); //sending form data
}

// button 2
const button2 = document.querySelector('.button2');
const submit = document.querySelector('.submit');

function toggleClass() {
  this.classList.toggle('active');
}

function addClass() {
  this.classList.add('finished');
}

button2.addEventListener('click', toggleClass);
button2.addEventListener('transitionend', toggleClass);
button2.addEventListener('transitionend', addClass);

// document.getElementById('form-button').onclick = function () {
//   console.log("button2 clicked");
//   this.disabled = true;
// }