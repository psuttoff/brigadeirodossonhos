const carrinho = {};

const cards = document.querySelectorAll(".card");

const contadorCarrinho = document.querySelector("#quantidade-carrinho");

const listaPedido = document.querySelector("#lista-pedido");


cards.forEach(function (card) {

    const produto = card.dataset.produto;

    const botaoAdicionar = card.querySelector(".adicionar");

    const botaoRemover = card.querySelector(".remover");

    const quantidadeElemento = card.querySelector(".quantidade");


    carrinho[produto] = 0;


    botaoAdicionar.addEventListener("click", function () {

        carrinho[produto]++;

        atualizarTela();

    });


    botaoRemover.addEventListener("click", function () {

        if (carrinho[produto] > 0) {

            carrinho[produto]--;

            atualizarTela();

        }

    });


});


function atualizarTela() {

    let totalItens = 0;

    listaPedido.innerHTML = "";


    for (const produto in carrinho) {

        const quantidade = carrinho[produto];


        if (quantidade > 0) {

            totalItens += quantidade;


            const item = document.createElement("div");

            item.classList.add("item-pedido");

            item.innerHTML = `
                <span>${produto}</span>
                <strong>${quantidade}x</strong>
            `;

            listaPedido.appendChild(item);

        }


        const cards = document.querySelectorAll(".card");


        cards.forEach(function (card) {

            if (card.dataset.produto === produto) {

                card.querySelector(".quantidade").textContent = quantidade;

            }

        });

    }


    contadorCarrinho.textContent = totalItens;


    if (totalItens === 0) {

        listaPedido.innerHTML = "<p>Nenhum item adicionado.</p>";

    }

}