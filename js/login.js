const form= document.getElementById("form")
let labelEmail = document.getElementById("labelEmail");
let labelPassword = document.getElementById("labelPassword");
let inputs = document.getElementsByClassName("input");
let button = document.getElementById("button");

// ao clicar no logar - o type="submit" chama este eventlistener.
form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkInputs();
})

// Estados Inputs
function state1(obj) {
  obj.style.transform = "translateY(2rem)";
  obj.style.color = "var(--color5)";
}

function state2(obj) {
  obj.style.transform = "translateY(0)";
  obj.style.color = "var(--color4)";
}

// Ao carregar a página

if (email.value != "") {
  state2(labelEmail);
}

if (password.value != "") {
  state2(labelPassword);
}

// Eventos

for (let i of inputs) {
  // Ao clicar
  i.addEventListener('click', (event) => {
    if (event.target.id == 'email') {
      state2(labelEmail);
    } else {
      state2(labelPassword);
    }
  });
  // Ao dar foco nos inputs
  i.addEventListener('focusin', (event) => {
    if (event.target.id == "email") {
      state2(labelEmail)
    } else {
      state2(labelPassword)
    }
  });
  // Ao retirar o foco dos inputs
  i.addEventListener("focusout", (event) => {
    if (event.target.id == "email") {
      if (email.value == "") {
        state1(labelEmail)
      } else {
        state2(labelEmail)
      }
    } else {
      if (password.value == "") {
        state1(labelPassword)
      } else {
        state2(labelPassword)
      }
    }
  });
}

// valida o email
function verificaEmail(inputEmailValue) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    inputEmailValue
  );
}

function checkInputs(){
  
  const inputEmailValue = document.getElementById("email").value;
  const inputSenhaValue = document.getElementById("password").value;
  
  if( inputEmailValue == "" ){
    alert( "O email é obrigatório.");
    return;
  } else if( !verificaEmail( inputEmailValue ) ){
    alert( "Por favor, insira um email válido.");    
    return;
  } 
  if( inputSenhaValue == "" ){
    alert( 'A senha é obrigatória.') 
    return;
  }
  
  validaLogin( inputEmailValue, inputSenhaValue );

}

const validaLogin = async( inputEmailValue, inputSenhaValue ) =>{

  const form = new FormData();  // definindo um objeto do tipo formulário para enviar os dados por meio do corpo da requisição

  form.append('email', inputEmailValue );
  form.append('senha', inputSenhaValue );

  let url = 'http://127.0.0.1:5000/validaLogin';
  fetch(url, {
    method: 'POST',
    body: form
  })
  .then( function(response){
      if(response.status == 200 ){
        window.location.href="menu.html";
      }else if( response.status == 404 ){
        alert('Email ou senha inválidos.');
      }
  });

}

