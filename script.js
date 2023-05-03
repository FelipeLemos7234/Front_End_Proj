
function pegarBaseDeUsuarios() {

    // deletar valores da tabela antes de inserir na mesma;
    $("#tabelaUsuarios tr").remove();

    let url = 'http://127.0.0.1:5500/visualizar';

    $.ajax({
      url: url,
      type: 'get',
      dataType: 'json',
      success: function(response)
      {

          $.each(response.usuarios,function(i,item) {

            inserirNaTabela(item.nome,item.email,item.idade,item.saldo)
          })


      },
      error: function()
      {
          alert('Usuário nao encontrado.');
      }
    });


  }

function clicarCadastroHeader() {

    var cadastro = document.getElementById("sessao1");
    var buscar = document.getElementById("sessao2");
    var remover = document.getElementById("sessao3");
    var tabela = document.getElementById("sessao4");

    if (cadastro.style.visibility=='hidden') {
        cadastro.style.visibility='visible';
        buscar.style.visibility='hidden';
        remover.style.visibility='hidden';
        tabela.style.visibility='hidden';        
    }
    else if (cadastro.style.visibility=='visible') {
        cadastro.style.visibility='visible';
    }

}

function clicarBuscarHeader() {

    var cadastro = document.getElementById("sessao1");
    var buscar = document.getElementById("sessao2");
    var remover = document.getElementById("sessao3");
    var tabela = document.getElementById("sessao4");

    if (buscar.style.visibility=='hidden') {
        buscar.style.visibility='visible';
        cadastro.style.visibility='hidden';
        remover.style.visibility='hidden';
        tabela.style.visibility='hidden'; 
    }
    else if (buscar.style.visibility=='visible') {
        buscar.style.visibility='visible';
    }


}

function clicarRemoverHeader() {

    var cadastro = document.getElementById("sessao1");
    var buscar = document.getElementById("sessao2");
    var remover = document.getElementById("sessao3");
    var tabela = document.getElementById("sessao4");

    if (remover.style.visibility=='hidden') {
        cadastro.style.visibility='hidden';
        buscar.style.visibility='hidden';
        remover.style.visibility='visible';
        tabela.style.visibility='hidden'; 
    }
    else if (remover.style.visibility=='visible') {
        remover.style.visibility='visible';
    }
}

function clicarCadastrar() {

    let nome = document.getElementById("Nome").value;
    let email = document.getElementById("Email").value;
    let idade = document.getElementById("Idade").value;
    let saldo = document.getElementById("Saldo").value;

    if (isNaN(idade)) {
        alert("Por gentileza, entrar com valores válidos para o campo 'Idade'.");
    } else if (isNaN(saldo)) {
        alert("Por gentileza, entrar com valores válidos para o campo 'Saldo'.");  
    } else if (nome==='') {
        alert("Por gentileza, entrar com valores válidos para o campo 'Nome'."); 
    } else if (email==='') {
        alert("Por gentileza, entrar com valores válidos para o campo 'Email'.");
    } else {
            // colocar função chamando para o backend de cadastro, metodo POST

           cadastrarUsuario(nome,email,idade,saldo)
    }

}

function clicarBuscar() {

    let id = document.getElementById("idUsuario").value;

    if (isNaN(id)) {
        alert("Por gentileza, entrar com um valor válido para o ID do usuário.");
    }
    else {
        // colocar função chamando para buscar usuario; BACK END
        console.log('Buscando')
        buscarUsuario(id)
    }

}

function clicarDeletar() {

    let removerID = document.getElementById("removerInput").value;

    if (isNaN(removerID)) {
        alert("Por gentileza, entrar com um valor válido para o ID do usuário.");
    } else {

        deletarUsuario(removerID)
    }

}

function clicarVisualizar(){

    var cadastro = document.getElementById("sessao1");
    var buscar = document.getElementById("sessao2");
    var remover = document.getElementById("sessao3");
    var tabela = document.getElementById("sessao4")

    cadastro.style.visibility='hidden';
    buscar.style.visibility='hidden';
    remover.style.visibility='hidden';
    tabela.style.visibility='visible'

    pegarBaseDeUsuarios()
}

function inserirNaTabela(nome,email,idade,saldo) {
    var listaItems = [nome, email, idade,saldo]
    var tabela = document.getElementById('tabelaUsuarios');
    var row = tabela.insertRow();

    for (let i = 0; i < listaItems.length;i++){
        var cell = row.insertCell(i)
        cell.textContent = listaItems[i]
    }
}

function cadastrarUsuario(nome,email,idade,saldo) {


    let url = 'http://127.0.0.1:5500/cadastrar';

    $.ajax({
      url: url,
      type: 'POST',
      data: JSON.stringify({
        'nome':nome, 'email': email, 'idade':idade,'saldo':saldo
      }),
      contentType: 'application/json',
      success: function(response)
      {
          alert("Usuário criado com sucesso!");
      },
      error: function(response)
      {
          alert("Erro de sistema.");

      }
    });


}

function buscarUsuario (idUsuario) {


    let url = 'http://127.0.0.1:5500/buscar_usuario/' + idUsuario

    $.ajax({
      url: url,
      type: 'get',
      dataType: 'json',
      success: function(response)
      {
          alert("Successo: " + response.nome + " / " + response.email + " /" + response.saldo);
          //console.log(response)

      },
      error: function()
      {
          alert('Usuário nao encontrado.');
      }
    });


}

function deletarUsuario(id){

    let url = 'http://127.0.0.1:5500/deletar/' + id

    console.log(url)

    $.ajax({
      url: url,
      type: 'DELETE',
      dataType: 'json',
      success: function(response)
      {
          alert("Usuario deletado com sucesso!");


      },
      error: function(response)
      {
          alert('Usuário nao encontrado.');
      }
    });


}