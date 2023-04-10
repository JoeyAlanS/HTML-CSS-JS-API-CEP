const end = document.querySelector('#endereco');
const bairro = document.querySelector('#bairro');
const estado = document.querySelector('#estado');
const cidade = document.querySelector('#cidade');
const cep = document.querySelector('#cep'); 

async function buscarEndereco(){
    //definindo a url da consulta onde será passado o cep 
    //digitado através de cep.value
    const url = `https://viacep.com.br/ws/${cep.value}/json/` 

    // Caso o CEP seja válido vamos bucas o CEP no API
    if (validarCep(cep.value)){

    

    //Realizando a requisição na url gerada
    const dados = await fetch(url);
    
    // Convertendo os dados da resposta para json 
    // para obtermos os dados do endereço
    const endereco = await dados.json();
    
    // Verificando se retornou um endereco
    if(endereco.hasOwnProperty("erro")){
        alert('Endereço não encontrado');
    }
    else{
        //chamando a função que irá preencher o formulário
        preencherFormuLario(endereco);
    }
    
    // Chamando função que irá ´prencher o formulário
    preencherFormuLario(endereco);
    }
    else {
       alert('Digite um CEP válido!');
    }
}

function preencherFormuLario(endereco){
    end.value = endereco.logradouro;
    bairro.value = endereco.bairro;
    estado.value = endereco.uf;
    cidade.value = endereco.localidade;
}
//definindo uma função para verificar se o CEP é válido
function validarCep(cep){
    //validando o cep
    if (cep.length == 8 && /^[0-9]+$/.test(cep)){
        return true;
    }
    else {
        return false;
    }
}

//adicionando o evento de saída do foco
cep.addEventListener("blur", buscarEndereco);

//hasownProperty('key');
//let pessoa = {nome: 'joey', profissao: 'Programador'};
// verificando se existe a chave "nome" no objeto pessoa
//console.log(pessoa.hasOwnProperty("nome")); //true

//console.log(pessoa.hasOwnproperty("sobrenome")); //false