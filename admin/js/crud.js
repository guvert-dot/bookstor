/**********************************************************************
 * Objetivo: Realizar a interação de cadastro, consulta, edição e 
 * exclusão de livros
 * Data:29/10/2024
 * Autor: Marcel
 * Versão: 1.0
 **********************************************************************/

//Recebe do HTML o botão de salvar um novo livro
const botaoSalvar = document.getElementById('salvar')



//Função para criar um novo livro no BD
const postLivro = async function(){

    let url = 'https://app-livraria-2024-gsc9e3gcdsh2f2b5.brazilsouth-01.azurewebsites.net/v2/livraria/livro'

    //Receber os dados do formulário
    let titulo      = document.getElementById('title')
    let descricao   = document.getElementById('subtitle')
    let foto        = document.getElementById('image')
    let valor       = document.getElementById('price')

    //Cria um objeto do tipo JSON
    let livroJSON = {}

    //Criando os atributos do JSON e colocando os valores
    livroJSON.title     = titulo.value 
    livroJSON.subtitle  = descricao.value
    livroJSON.image     = foto.value
    livroJSON.price     = valor.value

    let response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(livroJSON) 
    })

    //Mensagem de interação com o usuário (201 - sucesso no cadastro)
    if(response.status == 201){
        alert('Registro inserido com sucesso')
        getLivros()
    }else{
        alert('Não foi possivel inserir o registro, verifique os dados enviados')
    }


}

//Função para atualizar um livro existente 
const putLivro = async function(){
    
    //Recebe o ID do livro que foi armazenado na função getBuscarLivro
    let id = sessionStorage.getItem('idLivro')

    let url = 'https://app-livraria-2024-gsc9e3gcdsh2f2b5.brazilsouth-01.azurewebsites.net/v2/livraria/atualizar/livro/' + id

    //Receber os dados do formulário
    let titulo      = document.getElementById('title')
    let descricao   = document.getElementById('subtitle')
    let foto        = document.getElementById('image')
    let valor       = document.getElementById('price')

    //Cria um objeto do tipo JSON
    let livroJSON = {}

    //Criando os atributos do JSON e colocando os valores
    livroJSON.title     = titulo.value 
    livroJSON.subtitle  = descricao.value
    livroJSON.image     = foto.value
    livroJSON.price     = valor.value

    let response = await fetch(url, {
        method: 'PUT',
        mode: 'cors',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(livroJSON) 
    })

    //Mensagem de interação com o usuário (201 - sucesso no cadastro)
    if(response.status == 200){
        alert('Registro atualizado com sucesso')
        getLivros()
    }else{
        alert('Não foi possivel inserir o registro, verifique os dados enviados')
    }

}

//Função para excluir um livro
const deleteLivro = async function(idLivro){
    let url = 'https://app-livraria-2024-gsc9e3gcdsh2f2b5.brazilsouth-01.azurewebsites.net/v2/livraria/excluir/livro/'+idLivro

    let response = await fetch(url, {
        method: 'DELETE'
    })

    if(response.status == 200){
        alert('Registro excluído com sucesso!')
        getLivros()
    }else{
        alert('Não foi possível realizar a exclusão do registro.')
    }

}

//Função para listar todos os livros
const getLivros = async function(){
    
    //URL da API
    let url = 'https://app-livraria-2024-gsc9e3gcdsh2f2b5.brazilsouth-01.azurewebsites.net/v2/livraria/livros'

    //Executa a URL através do fetch
    let response = await fetch(url)

    //Converte os dados em json
    let dados = await response.json()


    //Recebe a div principal onde será carregado a lista de dados
    let divListDados = document.getElementById('listDados')

    //Limpar a lista de dados antes de carregar uma nova lista
    divListDados.innerText = ''

    //Percorre o array de livros da API
    dados.books.forEach(function(livro){
        //Cria os elementos no HTML
        let divDados    = document.createElement('div')
        let divTitle    = document.createElement('div')
        let divSubTitle = document.createElement('div')
        let divPrice    = document.createElement('div')
        let divOpcoes   = document.createElement('div')
        let spanEditar  = document.createElement('span')
        let imgEditar   = document.createElement('img')
        let spanExcluir = document.createElement('span')
        let imgExcluir  = document.createElement('img')
        
        //Adiciona os atributos
        divDados.setAttribute('id', 'dados')
        divDados.setAttribute('class', 'linha dados')
        imgEditar.setAttribute('src', 'icones/editar.png')
        imgEditar.setAttribute('idLivro', livro.id)  
        imgExcluir.setAttribute('src', 'icones/excluir.png') 
        imgExcluir.setAttribute('idLivro', livro.id)

        //Adiciona o conteudo do array nos elementos do HTML
        divTitle.innerText      = livro.title
        divSubTitle.innerText   = livro.subtitle
        divPrice.innerText      = livro.price

        //Associa o elemento ao seu elemento pai
        divListDados.appendChild(divDados)
        divDados.appendChild(divTitle)
        divDados.appendChild(divSubTitle)
        divDados.appendChild(divPrice)
        divDados.appendChild(divOpcoes)
        divOpcoes.appendChild(spanEditar)
        spanEditar.appendChild(imgEditar)
        divOpcoes.appendChild(spanExcluir)
        spanExcluir.appendChild(imgExcluir)


        //Função para o Click do Excluir
        imgExcluir.addEventListener('click',function(){
            //Mensagem de confirmação para o usuário
            let resposta = confirm('Deseja realmente excluir esse item?')

            //Se houver resposta verdadeira, envia para a função excluir
            if(resposta){
                //Resgatando o ID do livro quando houver o click na imagem
                let id = imgExcluir.getAttribute('idLivro')
                //Chama a função para excluir o livro e encaminha o ID
                deleteLivro(id)
            }
        })

        //Função para o Click do Editar
        imgEditar.addEventListener('click', function(){
            let id = imgEditar.getAttribute('idLivro')
            
            //Chamar a função que vai localizar os dados od livro pelo ID 
            getBuscarLivro(id)
        })
    })

    
    
}

//Função para buscar um livro pelo ID
const getBuscarLivro = async function(idLivro){
    let url = 'https://app-livraria-2024-gsc9e3gcdsh2f2b5.brazilsouth-01.azurewebsites.net/v2/livraria/livro/'+idLivro

    let response = await fetch(url)

    let dados = await response.json()

    if(response.status == 200){
        //Carregar os dados no formulário
        document.getElementById('title').value      = dados.books[0].title
        document.getElementById('subtitle').value   = dados.books[0].subtitle
        document.getElementById('image').value      = dados.books[0].image
        document.getElementById('price').value      = dados.books[0].price
        //Alterando o texto do botão de Salvar para Atualizar
        document.getElementById('salvar').innerText = 'Atualizar'

        //Guarda o valor do ID em uma variavel de escopo global, para ser utilizada
        //no click do botao Atualizar
        sessionStorage.setItem('idLivro', idLivro)

    }else{
        alert('Não foi possível localizar o registro.')
    }
}

botaoSalvar.addEventListener('click', function(){

    //Condição para validar se o sistema irá salvar um novo item 
    //ou atualizar um item existente
    if(document.getElementById('salvar').innerText == 'Salvar'){
        postLivro()
    }else if(document.getElementById('salvar').innerText == 'Atualizar'){
        putLivro()
    }
})

window.addEventListener('load', function(){
    getLivros()
})