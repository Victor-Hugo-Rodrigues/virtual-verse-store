// Função que valida se todos os campos estão preenchidos
function validarCampos(produto, valor, descricao) {
    return produto && valor && descricao;
}

// Função para cadastrar um produto
function cadastrarProduto() {
    // Obter elementos do formulário e do feedback
    const produtoInput = document.getElementById('produto');
    const valorInput = document.getElementById('valor');
    const descricaoInput = document.getElementById('descricao');
    const feedbackElement = document.getElementById('feedback');
    const listaProdutosElement = document.getElementById('listaProdutos');

    // Validar campos antes de prosseguir
    if (!validarCampos(produtoInput.value, valorInput.value, descricaoInput.value)) {
        feedbackElement.textContent = 'Por favor, preencha todos os campos.';
        return;
    }

    // Obter valores dos campos
    const produto = produtoInput.value;
    let valor = parseFloat(valorInput.value.replace(',', '.')); // Converter para número com ponto decimal
    const descricao = descricaoInput.value;

    // Criar objeto com os dados do produto
    const dadosProduto = {
        produto: produto,
        valor: valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
        descricao: descricao
    };

    // Enviar dados do produto para o servidor usando fetch API
    fetch('https://httpbin.org/post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosProduto)
    })
    .then(response => response.json())
    .then(data => {
        // Limpar campos do formulário
        produtoInput.value = '';
        valorInput.value = '';
        descricaoInput.value = '';

        // Exibir feedback de sucesso
        feedbackElement.textContent = 'Produto cadastrado com sucesso!';

        // Adicionar o novo produto à lista de produtos na página
        const novoProduto = document.createElement('li');
        novoProduto.textContent = `${data.json.produto} - ${data.json.valor} - ${data.json.descricao}`;
        listaProdutosElement.appendChild(novoProduto);
    })
    .catch(error => {
        // Exibir mensagem de erro em caso de falha na requisição
        console.error('Erro ao cadastrar o produto:', error);
        feedbackElement.textContent = 'Erro ao cadastrar o produto. Tente novamente.';
    });
}

const novoProduto = document.createElement('li');
novoProduto.innerHTML = `
    ${data.json.produto} - ${data.json.valor} - ${data.json.descricao}
    <button onclick="excluirProduto('${data.json.produto}')">Excluir</button>
    <button onclick="editarProduto('${data.json.produto}', ${data.json.valor}, '${data.json.descricao}')">Editar</button>
`;
listaProdutosElement.appendChild(novoProduto);



// Função para confirmar exclusão
function confirmarExclusao(produto) {
    const confirmacao = confirm(`Deseja realmente excluir o produto ${produto}?`);
    return confirmacao;
}

// Função para excluir um produto
function excluirProduto(produto) {
    if (confirmarExclusao(produto)) {
        // Adicione aqui a lógica para excluir o produto do servidor (usando fetch, por exemplo)
        // Após a exclusão, remova o item da lista na página
        const produtoElement = document.querySelector(`li:contains("${produto}")`);
        produtoElement.remove();
    }
}

// Função para preencher formulário de edição com os dados do produto
function editarProduto(produto, valor, descricao) {
    const produtoInput = document.getElementById('produto');
    const valorInput = document.getElementById('valor');
    const descricaoInput = document.getElementById('descricao');

    produtoInput.value = produto;
    valorInput.value = valor;
    descricaoInput.value = descricao;
}

