const numeroWhatsApp = "5519971213029";

const precoCaixinha = 14;
const limiteBrigadeiros = 4;

let sabores = {
    "Brigadeiro com Granulado": 0,
    "Brigadeiro de Ninho": 0,
    "Brigadeiro de Paçoca": 0,
    "Brigadeiro de Ferrero Rocher": 0,
    "Brigadeiro de M&M's": 0
};

let caixinhas = [];

const botoesAdicionar =
    document.querySelectorAll(".botao-adicionar");

const botoesRemover =
    document.querySelectorAll(".botao-remover");

const contadorCarrinho =
    document.querySelector("#contadorCarrinho");

const abrirCarrinho =
    document.querySelector("#abrirCarrinho");

const fecharCarrinho =
    document.querySelector("#fecharCarrinho");

const fundoModal =
    document.querySelector("#fundoModal");

const resumoPedido =
    document.querySelector("#resumoPedido");

const formPedido =
    document.querySelector("#formPedido");

const adicionarCaixinha =
    document.querySelector("#adicionarCaixinha");


function quantidadeTotal() {

    let totalItens = 0;

    for (const sabor in sabores) {
        totalItens += sabores[sabor];
    }

    return totalItens;
}


function atualizarInterface() {

    const totalItens = quantidadeTotal();

    contadorCarrinho.textContent =
        `${caixinhas.length} caixa${caixinhas.length !== 1 ? "s" : ""} • ${totalItens}/4`;

    document
        .querySelectorAll(".quantidade")
        .forEach(function (elemento) {

            const sabor =
                elemento.dataset.quantidade;

            elemento.textContent =
                sabores[sabor];

        });

    botoesAdicionar.forEach(function (botao) {

        botao.disabled =
            totalItens >= limiteBrigadeiros;

    });

    adicionarCaixinha.disabled =
        totalItens === 0;
}


botoesAdicionar.forEach(function (botao) {

    botao.addEventListener("click", function () {

        const sabor =
            botao.dataset.produto;

        const totalItens =
            quantidadeTotal();

        if (totalItens >= limiteBrigadeiros) {
            return;
        }

        sabores[sabor]++;

        atualizarInterface();

    });

});


botoesRemover.forEach(function (botao) {

    botao.addEventListener("click", function () {

        const sabor =
            botao.dataset.produto;

        if (sabores[sabor] <= 0) {
            return;
        }

        sabores[sabor]--;

        atualizarInterface();

    });

});


adicionarCaixinha.addEventListener(
    "click",
    function () {

        const totalItens =
            quantidadeTotal();

        if (totalItens === 0) {
            return;
        }

        if (totalItens > limiteBrigadeiros) {
            return;
        }

        const novaCaixinha = {
            ...sabores
        };

        caixinhas.push(novaCaixinha);

        for (const sabor in sabores) {
            sabores[sabor] = 0;
        }

        atualizarInterface();

    }
);


abrirCarrinho.addEventListener(
    "click",
    function () {

        atualizarResumo();

        fundoModal.classList.add("aberto");

    }
);


fecharCarrinho.addEventListener(
    "click",
    function () {

        fundoModal.classList.remove("aberto");

    }
);


fundoModal.addEventListener(
    "click",
    function (evento) {

        if (evento.target === fundoModal) {

            fundoModal.classList.remove("aberto");

        }

    }
);


function atualizarResumo() {

    resumoPedido.innerHTML = "";

    const totalAtual =
        quantidadeTotal();

    if (
        caixinhas.length === 0 &&
        totalAtual === 0
    ) {

        resumoPedido.innerHTML = `
            <p>Você ainda não escolheu nenhuma caixinha.</p>
        `;

        return;
    }

    caixinhas.forEach(
        function (caixinha, indice) {

            const caixa =
                document.createElement("div");

            caixa.classList.add("item-pedido");

            let conteudo =
                `<strong>📦 Caixinha ${indice + 1}</strong><br>`;

            for (const sabor in caixinha) {

                const quantidade =
                    caixinha[sabor];

                if (quantidade > 0) {

                    conteudo +=
                        `${quantidade}x ${sabor}<br>`;

                }

            }

            caixa.innerHTML =
                conteudo;

            resumoPedido.appendChild(caixa);

        }
    );


    if (totalAtual > 0) {

        const caixaAtual =
            document.createElement("div");

        caixaAtual.classList.add("item-pedido");

        let conteudo =
            `<strong>📦 Nova caixinha</strong><br>`;

        for (const sabor in sabores) {

            const quantidade =
                sabores[sabor];

            if (quantidade > 0) {

                conteudo +=
                    `${quantidade}x ${sabor}<br>`;

            }

        }

        caixaAtual.innerHTML =
            conteudo;

        resumoPedido.appendChild(
            caixaAtual
        );

    }

}


formPedido.addEventListener(
    "submit",
    function (evento) {

        evento.preventDefault();

        const totalAtual =
            quantidadeTotal();

        if (totalAtual > 0) {

            const ultimaCaixinha = {
                ...sabores
            };

            caixinhas.push(
                ultimaCaixinha
            );

            for (const sabor in sabores) {
                sabores[sabor] = 0;
            }

        }

        if (caixinhas.length === 0) {

            alert(
                "Adicione pelo menos uma caixinha ao pedido."
            );

            return;

        }

        const rua =
            document
                .querySelector("#rua")
                .value
                .trim();

        const numero =
            document
                .querySelector("#numero")
                .value
                .trim();

        const cidade =
            document
                .querySelector("#cidade")
                .value
                .trim();

        const descricao =
            document
                .querySelector("#descricao")
                .value
                .trim();

        const pagamentoSelecionado =
            document.querySelector(
                'input[name="pagamento"]:checked'
            );

        if (!rua || !numero || !cidade) {

            alert(
                "Preencha o endereço completo."
            );

            return;

        }

        if (!pagamentoSelecionado) {

            alert(
                "Escolha uma forma de pagamento."
            );

            return;

        }

        const pagamento =
            pagamentoSelecionado.value;

        let mensagem =
            "🍫 *NOVO PEDIDO - BRIGADEIRO DOS SONHOS*";

        mensagem += "\n\n";

        mensagem +=
            `📦 *Quantidade de caixinhas: ${caixinhas.length}*\n`;

        mensagem +=
            `💰 *Total: R$ ${(caixinhas.length * precoCaixinha)
                .toFixed(2)
                .replace(".", ",")}*\n`;

        mensagem += "\n";

        caixinhas.forEach(
            function (caixinha, indice) {

                mensagem +=
                    `📦 *CAIXINHA ${indice + 1}*\n`;

                for (
                    const sabor in caixinha
                ) {

                    const quantidade =
                        caixinha[sabor];

                    if (quantidade > 0) {

                        mensagem +=
                            `• ${quantidade}x ${sabor}\n`;

                    }

                }

                mensagem += "\n";

            }
        );

        if (descricao) {

            mensagem +=
                "📝 *DESCRIÇÃO / OBSERVAÇÃO*\n";

            mensagem +=
                descricao + "\n\n";

        }

        mensagem +=
            "📍 *ENDEREÇO DE ENTREGA*\n";

        mensagem +=
            `Rua: ${rua}\n`;

        mensagem +=
            `Número: ${numero}\n`;

        mensagem +=
            `Cidade: ${cidade}\n\n`;

        mensagem +=
            "💳 *FORMA DE PAGAMENTO*\n";

        if (pagamento === "Pix") {

            mensagem +=
                "Pix";

        } else {

            mensagem +=
                "Dinheiro";

        }

        if (
            numeroWhatsApp ===
            "SEU_NUMERO_AQUI"
        ) {

            alert(
                "Configure o número do WhatsApp no script.js."
            );

            return;

        }

        const mensagemCodificada =
            encodeURIComponent(mensagem);

        const url =
            `https://wa.me/${numeroWhatsApp}?text=${mensagemCodificada}`;

        window.open(
            url,
            "_blank"
        );

    }
);


atualizarInterface();