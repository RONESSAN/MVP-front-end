const modal    = document.querySelector('.modal-container')
const sId      = document.querySelector('#m-id')
const sNome    = document.querySelector('#m-nome')
const sEmail   = document.querySelector('#m-email')

function openModal( vdados ) {

  sId.value = vdados[0];
  sNome.value = vdados[1];
  sEmail.value = vdados[2];
   
  // ativa o modal.
  modal.classList.add('active')
  
  // ao clicar no salvar
  modal.onclick = e => {  
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  } 

}

btnSalvar.onclick = e => {

  let inputId     = document.getElementById("m-id").value;
  let inputNome   = document.getElementById("m-nome").value;
  let inputEmail  = document.getElementById("m-email").value;

  if ( inputNome === '' ) {
    alert("Escreva o nome de um item!");
  } else if (inputEmail === ""){
    alert("O email é obrigatório.");
  } else if( !checkEmail(inputEmail) ){
    alert("Por favor, insira um email válido.");    
  } else {
    updateItem ( inputId, inputNome, inputEmail, "" )
    modal.classList.remove('active')
  }

}

/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {    
    let url = 'http://127.0.0.1:5000/usuarios';    
    fetch(url, {
      method: 'get',
    })
      .then((response) => response.json())
      .then((data) => {
        data.usuarios.forEach(item => insertList(item.id, item.nome, item.email ) );
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  /*
    --------------------------------------------------------------------------------------
    Chamada da função para carregamento inicial dos dados
    --------------------------------------------------------------------------------------
  */
  getList()
  
  /*
    --------------------------------------------------------------------------------------
    Função para colocar um usuario na lista do servidor via requisição POST
    --------------------------------------------------------------------------------------
  */
  const postItem = async (inputNome, inputEmail, inputSenha) => {
    
    const formData = new FormData();
    
    formData.append('nome', inputNome);
    formData.append('email', inputEmail);
    formData.append('senha', inputSenha);
    let id_user = 0;

    let url = 'http://127.0.0.1:5000/usuario';
    fetch(url, {
      method: 'POST',
      body: formData
    })
    .then( data => {
      if( !data.ok ){
        if( data.status = 409 ){
          alert( 'Email já existe na base');
          return;
        }
      }
      return data.json();
    })
    .then( usuario => {
      id_user = usuario.id;   // pegando o id do usuário.
      alert( 'Usuário inserido com sucesso!');
      insertList(id_user, inputNome, inputEmail)        
    })
  }
   
  /*
    --------------------------------------------------------------------------------------
    Função para alterar um usuario na lista do servidor via requisição POST
    --------------------------------------------------------------------------------------
  */
    const updateItem = async ( uId, uNome, uEmail ) => {
    
      const formData = new FormData();
      
      formData.append('id', uId);
      formData.append('nome', uNome);
      formData.append('email', uEmail);

      let url = 'http://127.0.0.1:5000/update_usuario';
      fetch(url, {
        method: 'POST',
        body: formData
      })
      .then( data => {
        if (!data.ok) {
          if( data.status = 404 ) {
            alert( 'Usuário não encontrado na base.')
            return;
          }else if( data.status = 409 )
          alert( 'Email de mesmo nome já salvo na base.' )
            return;
        }
        return data.json();
      })
      .then( produto => {
        alert( "Usuário alterado com sucesso!");
        insertList( uId, uNome, uEmail );
      })      
    }

  /*
    --------------------------------------------------------------------------------------
    Função para criar um botão close para cada item da lista
    --------------------------------------------------------------------------------------
  */
  const insertButton = (parent) => {
    let span = document.createElement("span");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    parent.appendChild(span);
  }
    
  /*
    --------------------------------------------------------------------------------------
    Função para criar um botão update para cada item da lista
    --------------------------------------------------------------------------------------
  */
    const insertButUpdate = (parent) => {
      let span = document.createElement("span");
      let txt = document.createTextNode("\u00AB");
      span.className = "update";
      span.appendChild(txt);
      parent.appendChild(span);
    }
        
  /*
    --------------------------------------------------------------------------------------
    Função para remover um item da lista de acordo com o click no botão close
    --------------------------------------------------------------------------------------
  */
  const removeElement = () => {
    let close = document.getElementsByClassName("close");
    // var table = document.getElementById('myTable');
    let i;
    for (i = 0; i < close.length; i++) {
      close[i].onclick = function () {
        let div = this.parentElement.parentElement;
        const idItem = div.getElementsByTagName('td')[0].innerHTML
        if (confirm("Você tem certeza?")) {
          div.remove()          
          deleteItem(idItem)
          alert("Removido!")
        }
      }
    }
  }
  

  /*
    --------------------------------------------------------------------------------------
    Função para alterar um item da lista de acordo com o click no botão update
    --------------------------------------------------------------------------------------
  */
    const updateElement = () => {
      let update = document.getElementsByClassName("update");
      let i;
      let vdados = [];
      for (i = 0; i < update.length; i++) {
        update[i].onclick = function () {
          let div      = this.parentElement.parentElement;
          const id     = div.getElementsByTagName('td')[0].innerHTML
          const nome   = div.getElementsByTagName('td')[1].innerHTML
          const email  = div.getElementsByTagName('td')[2].innerHTML
          vdados = [ id, nome, email, "" ];  
          openModal( vdados )           
        }
      }
    }
  
  /*
    --------------------------------------------------------------------------------------
    Função para deletar um item da lista do servidor via requisição DELETE
    --------------------------------------------------------------------------------------
  */
  const deleteItem = (id_item) => {
    
    let url = 'http://127.0.0.1:5000/usuario?usuario_id=' + id_item;    
    
    fetch(url, {
      method: 'delete'
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  /*
    --------------------------------------------------------------------------------------
    Função para adicionar um novo item com nome, quantidade, valor e data de validade
    --------------------------------------------------------------------------------------
  */
  const newItem = () => {

    let inputNome = document.getElementById("inputNome").value;
    let inputEmail = document.getElementById("inputEmail").value;
    let inputSenha = document.getElementById("inputSenha").value;
    let inputConfirmaSenha = document.getElementById("inputConfirmaSenha").value;
    
    if (inputNome === '') {
      alert("Escreva o nome do usuário!");
      return
    }  
    
    if (inputEmail === ""){
        alert("O email é obrigatório.");
        return;
    } else if( !checkEmail(inputEmail) ){
        alert("Por favor, insira um email válido.");    
        return;
    }
    
    if( inputSenha === ""){
      alert("A senha é obrigatório.");
      return;
    } else if( inputSenha.length < 6 ){
      alert("A senha precisa ter no minimo 6 caracteres.");
      return;
    }
     
    if( inputConfirmaSenha === ""){
      alert("A confirmação de senha é obrigatório.");        
      return;
    } else if( inputConfirmaSenha != inputSenha ){
       alert("As senhas não conferem.");
       return;
    } else {
      postItem(inputNome, inputEmail, inputSenha) 
    }    

  }

  // valida o email
  function checkEmail(inputEmail) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      inputEmail
    );
  }

  /*
    --------------------------------------------------------------------------------------
    Função para inserir items na lista apresentada
    --------------------------------------------------------------------------------------
  */
  const insertList = (id, nomeUsuario, emailUsuario ) => {
    var item = [id, nomeUsuario, emailUsuario]
    var table = document.getElementById('myTable');
  
    var row = table.insertRow();
  
    for (var i = 0; i < item.length; i++) {
      var cel = row.insertCell(i);
      cel.textContent = item[i];
    }
    
    insertButton(row.insertCell(-1))
    insertButUpdate(row.insertCell(-1))

    document.getElementById("inputNome").value = "";
    document.getElementById("inputEmail").value = "";
    document.getElementById("inputSenha").value = "";
    document.getElementById("inputConfirmaSenha").value = "";
    
    removeElement()
    updateElement()    

  }

