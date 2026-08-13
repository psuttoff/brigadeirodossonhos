const numeroWhatsApp = "5519971213029";

const precoCaixinha = 14;
const limiteBrigadeiros = 4;

const sabores = {
    "Brigadeiro com Granulado": 0,
    "Brigadeiro de Ninho": 0,
    "Brigadeiro de Paçoca": 0,
    "Brigadeiro de Ferrero Rocher": 0,
    "Brigadeiro de M&M's": 0
};


const botoesAdicionar = document.querySelectorAll(".botao-adicionar");
const botoesRemover = document.querySelectorAll(".botao-remover");

const contadorCarrinho = document.querySelector("#contadorCarrinho");

const abrirCarrinho = document.querySelector("#abrirCarrinho");
const fecharCarrinho = document.querySelector("#fecharCarrinho");

const fundoModal = document.querySelector("#fundoModal");

const resumoPedido = document.querySelector("#resumoPedido");

const formPedido = document.querySelector("#formPedido");


function quantidadeTotal() {

    let totalItens = 0;

    for (const sabor in sabores) {
        totalItens += sabores[sabor];
    }

    return totalItens;
}


function atualizarInterface() {

    const totalItens = quantidadeTotal();

    contadorCarrinho.textContent = `${totalItens}/4`;


    document.querySelectorAll(".quantidade").forEach(function (elemento) {

        const sabor = elemento.dataset.quantidade;

        elemento.textContent = sabores[sabor];

    });


    botoesAdicionar.forEach(function (botao) {

        botao.disabled = totalItens >= limiteBrigadeiros;

    });

}


botoesAdicionar.forEach(function (botao) {

    botao.addEventListener("click", function () {

        const sabor = botao.dataset.produto;

        if (quantidadeTotal() >= limiteBrigadeiros) {
            return;
        }

        sabores[sabor]++;

        atualizarInterface();

    });

});


botoesRemover.forEach(function (botao) {

    botao.addEventListener("click", function () {

        const sabor = botao.dataset.produto;

        if (sabores[sabor] <= 0) {
            return;
        }

        sabores[sabor]--;

        atualizarInterface();

    });

});


abrirCarrinho.addEventListener("click", function () {

    atualizarResumo();

    fundoModal.classList.add("aberto");

});


fecharCarrinho.addEventListener("click", function () {

    fundoModal.classList.remove("aberto");

});


fundoModal.addEventListener("click", function (evento) {

    if (evento.target === fundoModal) {

        fundoModal.classList.remove("aberto");

    }

});


function atualizarResumo() {

    const totalItens = quantidadeTotal();


    if (totalItens === 0) {

        resumoPedido.innerHTML = `
            <p>Nenhum brigadeiro escolhido.</p>
        `;

        return;
    }


    resumoPedido.innerHTML = "";


    for (const sabor in sabores) {

        const quantidade = sabores[sabor];


        if (quantidade > 0) {

            const item = document.createElement("div");

            item.classList.add("item-pedido");


            item.innerHTML = `
                <span>${quantidade}x ${sabor}</span>
            `;


            resumoPedido.appendChild(item);

        }

    }

}


formPedido.addEventListener("submit", function (evento) {

    evento.preventDefault();


    const totalItens = quantidadeTotal();


    if (totalItens === 0) {

        alert("Escolha pelo menos um brigadeiro.");

        return;

    }


    const rua = document.querySelector("#rua").value.trim();

    const numero = document.querySelector("#numero").value.trim();

    const cidade = document.querySelector("#cidade").value.trim();

    const descricao = document.querySelector("#descricao").value.trim();

    const pagamentoSelecionado =
        document.querySelector('input[name="pagamento"]:checked');


    if (!rua || !numero || !cidade) {

        alert("Preencha o endereço completo.");

        return;

    }


    if (!pagamentoSelecionado) {

        alert("Escolha uma forma de pagamento.");

        return;

    }


    let mensagem = "";

    mensagem += "🍫 *NOVO PEDIDO - BRIGADEIRO DOS SONHOS*\n\n";

    mensagem += "📦 *CAIXINHA*\n";


    for (const sabor in sabores) {

        const quantidade = sabores[sabor];


        if (quantidade > 0) {

            mensagem += `• ${quantidade}x ${sabor}\n`;

        }

    }


    mensagem += "\n";

    mensagem += `📦 *Quantidade: ${totalItens}/4*\n`;

    mensagem += `💰 *Valor: R$ ${precoCaixinha.toFixed(2).replace(".", ",")}*\n`;


    if (descricao) {

        mensagem += "\n";

        mensagem += "📝 *Descrição:*\n";

        mensagem += descricao + "\n";

    }


    mensagem += "\n";

    mensagem += "📍 *ENDEREÇO*\n";

    mensagem += `Rua: ${rua}\n`;

    mensagem += `Número: ${numero}\n`;

    mensagem += `Cidade: ${cidade}\n`;


    mensagem += "\n";

    mensagem += "💳 *PAGAMENTO*\n";

    mensagem += pagamentoSelecionado.value;


    if (numeroWhatsApp === "SEU_NUMERO_AQUI") {

        alert("Configure o número do WhatsApp no script.js.");

        return;

    }


    const mensagemCodificada = encodeURIComponent(mensagem);

    const url =
        `https://wa.me/${numeroWhatsApp}?text=${mensagemCodificada}`;


    window.open(url, "_blank");

});


atualizarInterface();