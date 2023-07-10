const modal         = document.querySelector('.modal-container')
const sId           = document.querySelector('#m-id')
const sNome         = document.querySelector('#m-nome')
const sQuantidade   = document.querySelector('#m-quantidade')
const sValor        = document.querySelector('#m-valor')
const sdataValidade = document.querySelector('#m-data')

function openModal( vdados ) {

  sId.value = vdados[0];
  sNome.value = vdados[1];
  sQuantidade.value = vdados[2];
  sValor.value = vdados[3];
  sdataValidade.value = vdados[4];
   
  // ativa o modal.
  modal.classList.add('active')

  // ao clicar no salvar.
  modal.onclick = e => {  
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  } 

}

btnSalvar.onclick = e => {

  let inputId           = document.getElementById("m-id").value;
  let inputNome         = document.getElementById("m-nome").value;
  let inputValor        = document.getElementById("m-valor").value;
  let inputQuantidade   = document.getElementById("m-quantidade").value;
  let inputDataValidade = document.getElementById("m-data").value;

  let valorFormatado    = inputValor.toString().split('R$').reverse().join('').replace(",",".");

  if ( inputNome === '' ) {
    alert("Escreva o nome de um item!");
  } else if ( valorFormatado === '' ) {
    alert("O valor e obrigatório!");    
  } else if( inputDataValidade === '' ) {
    alert("A data de validade precisa ser informada!");
  } else if (  isNaN( inputQuantidade ) || inputQuantidade === '' ) {
    alert("Quantidade precisa ter números!");    
  } else {
    updateItem ( inputId, inputNome, inputQuantidade, valorFormatado, inputDataValidade )
  }

}

/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {    
    let url = 'http://127.0.0.1:5000/produtos';    
    fetch(url, {
      method: 'get',
    })
      .then((response) => response.json())
      .then((data) => {
        data.produtos.forEach(item => insertList(item.id, item.nome, item.quantidade, item.valor, item.data_validade));
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
    Função para colocar um item na lista do servidor via requisição POST
    --------------------------------------------------------------------------------------
  */
  const postItem = async (inputProduct, inputQuantity, inputPrice, dataFormatada) => {
    
    const formData = new FormData();
    
    formData.append('nome', inputProduct);
    formData.append('quantidade', inputQuantity);
    formData.append('valor', inputPrice);
    formData.append('data_validade', dataFormatada);
    let id_pro = 0;

    let url = 'http://127.0.0.1:5000/produto';
    fetch(url, {
      method: 'POST',
      body: formData
    })
    .then( data => {
      if (!data.ok) {
        if( data.status = 409 ) {
          alert( 'Produto já existe na base.')
          return;
        }
      }
      return data.json();
    })
    .then( produto => {
      id_pro = produto.id;  // Pegando o id inserido.
      alert( "Produto inserido com sucesso!");
      insertList( id_pro, inputProduct, inputQuantity, inputPrice, dataFormatada );
    })
    
  }

  /*
    --------------------------------------------------------------------------------------
    Função para alterar um item na lista do servidor via requisição POST
    --------------------------------------------------------------------------------------
  */
    const updateItem = async ( uId, uNome, uQuantidade, uValor, udataValidade ) => {
    
      const formData = new FormData();
      
      formData.append('id', uId);
      formData.append('nome', uNome);
      formData.append('quantidade', uQuantidade);
      formData.append('valor', uValor);
      formData.append('data_validade', udataValidade);

      let url = 'http://127.0.0.1:5000/update_produto';
      fetch(url, {
        method: 'POST',
        body: formData
      })
      .then( data => {
        if (!data.ok) {
          if( data.status = 404 ) {
            alert( 'Produto não encontrado na base.')
            return;
          }else if( data.status = 409 )
          alert( 'Produto de mesmo nome já salvo na base.' )
            return;
        }
        return data.json();
      })
      .then( produto => {
        alert( "Produto alterado com sucesso!");
        insertList( uId, uNome, uQuantidade, uValor, udataValidade );
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
    let carac = "&nbsp;"
    for (i = 0; i < update.length; i++) {
      update[i].onclick = function () {
        let div = this.parentElement.parentElement;
        const id = div.getElementsByTagName('td')[0].innerHTML
        const nome = div.getElementsByTagName('td')[1].innerHTML
        const quantidade = div.getElementsByTagName('td')[2].innerHTML
        const valor = div.getElementsByTagName('td')[3].innerHTML.replace(carac, "" )
        const dataValidade = div.getElementsByTagName('td')[4].innerHTML                
        vdados = [ id, nome, quantidade, valor, dataValidade ];        
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
    
    let url = 'http://127.0.0.1:5000/produto?produto_id=' + id_item;    
    
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

    let inputProduct = document.getElementById("newInput").value;
    let inputQuantity = document.getElementById("newQuantity").value;
    let inputPrice = document.getElementById("newPrice").value;
    let inputNewDate = document.getElementById("newDate").value;

    let dataFormatada = inputNewDate.split('-').reverse().join('/');
    let valorFormatado = inputPrice.toString().split('R$').reverse().join('').replace(",",".");
    
    if (inputProduct === '') {
      alert("Escreva o nome de um item!");
    } else if ( isNaN(inputQuantity) || inputQuantity === '' ) {
      alert("Quantidade precisa ter números!");
    } else if( valorFormatado === ''){
      alert("O valor e obrigatório!");
    } else if( inputNewDate === ''){
      alert("A data de validade precisa ser informada!");
    } else {
      postItem(inputProduct, inputQuantity, valorFormatado, dataFormatada)
    }
  }
    
  /*
    --------------------------------------------------------------------------------------
    Função para inserir items na lista apresentada
    --------------------------------------------------------------------------------------
  */
  const insertList = (id,nameProduct, quantity, price, data ) => {
    var item = [id,nameProduct, quantity, price, data ]
    var table = document.getElementById('myTable');
  
    var row = table.insertRow();
  
    for (var i = 0; i < item.length; i++) {
      var cel = row.insertCell(i);
      cel.textContent = item[i];
    }
    insertButton(row.insertCell(-1))
    insertButUpdate(row.insertCell(-1))

    document.getElementById("newInput").value = "";
    document.getElementById("newQuantity").value = "";
    document.getElementById("newPrice").value = "";
    document.getElementById("newDate").value = "";
    
    removeElement()
    updateElement()

  }

