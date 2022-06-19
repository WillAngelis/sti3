// Função para alterar entre abas

let tabs = document.querySelectorAll('.tabs_toggle'),
  content = document.querySelectorAll('.tabs_content');

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    content.forEach((content) => {
      content.classList.remove('is_active');
    });
    tabs.forEach((tab) => {
      tab.classList.remove('is_active');
    });

    content[index].classList.add('is_active');
    tabs[index].classList.add('is_active');
  });
});

// Função de data
const date = new Date();
const dataAtual = document.querySelector('.data_atual');
dataAtual.textContent = date.toDateString();

// Entra na pagina e pega dados da api e salva no local storage uma copia
// ao clicar em consultar pega os dados do local storage

const url =
  'https://justcors.com/tl_c66ad9f/https://desafiotecnicosti3.azurewebsites.net/pedido';

window.onload = async function response() {
  try {
    const data = await fetch(url);
    const jsonData = await data.json();
    copyArray(jsonData);
  } catch (e) {
    console.log('erro');
  }
};

function copyArray(data) {
  let apiResponse = data;
  let apiRequest = [...apiResponse];
  saveLocal(apiRequest);
  bestProducts(apiRequest);
}

function saveLocal(purcharses) {
  localStorage.setItem('purcharses', JSON.stringify(purcharses));
}

// Funções para a aba Pedidos

let pedidosTab = document.querySelector('.pedidos_tab');
pedidosTab.addEventListener('click', showPedidos);

function showPedidos() {
  let tabsBody = document.querySelector('.tabs_body');
  let tabPedidos = document.querySelectorAll('.list_head_tab');
  let sells_container = document.querySelector('.top_sells_container');
  let table = document.querySelector('.table_content');
  loadingTable(table);
  setTimeout(() => {
    for (let i = 0; i < tabPedidos.length; i++) {
      const element = tabPedidos[i];
      if (!element.classList.contains('is_active')) {
        element.classList.add('is_active');
      }
    }
    let topSellTabs = document.querySelector('.sells_head_tab');
    topSellTabs.classList.remove('is_active');
  }, 200);
}

const btnConsultar = document.querySelector('.btn_consultar');
btnConsultar.addEventListener('click', getData);

function getData() {
  let table = document.querySelector('.table_content');
  loadingTable(table);
}

function getDataToTable(table) {
  setTimeout(() => {
    btnConsultar.classList.remove('disabled');
    table.innerHTML = '';
    const purcharses = JSON.parse(localStorage.getItem('purcharses'));

    purcharses.forEach((el) => {
      let tr = createLine(el);
      table.appendChild(tr);
    });
  }, '400');
}

function loadingTable(table) {
  btnConsultar.classList.add('disabled');
  table.innerHTML = `<div class="load_div is_active">
    <img  class="load_gif is_active" src="./img/loading.gif" alt="">
    <span class="load_text is_active">Carregando</span>
  </div>`;
  getDataToTable(table);
}

function createLine(pedido) {
  let tr = document.createElement('tr');
  let tdStatus = tdStatusCreate(pedido);
  let tdCliente = tdClienteCreate(pedido);
  let tdValor = tdValorCreate(pedido);
  let tdFrete = tdFreteCreate(pedido);
  let tdDesconto = tdDescontoCreate(pedido);
  let tdTotal = tdTotalCreate(pedido);
  let tdAcao = tdAcaoCreate(pedido);

  tr.appendChild(tdStatus);
  tr.appendChild(tdCliente);
  tr.appendChild(tdValor);
  tr.appendChild(tdFrete);
  tr.appendChild(tdDesconto);
  tr.appendChild(tdTotal);
  tr.appendChild(tdAcao);
  return tr;
}

function tdStatusCreate(pedido) {
  let tdStatus = document.createElement('td');
  if (pedido.status === 'CANCELADO') {
    tdStatus.innerHTML =
      `<svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.75 1.25L1.25 9.75M1.25 1.25L9.75 9.75" stroke="#E53E3E" stroke-width="2"
                          stroke-linecap="round" stroke-linejoin="round" />
                      </svg>` + pedido.status;
    tdStatus.classList.add('cancel');
  } else {
    tdStatus.innerHTML =
      ` <svg width="13" height="10" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.1091 1L4.15909 9L1 5.36364" stroke="#38A169" stroke-width="2"
                          stroke-linecap="round" stroke-linejoin="round" />
                      </svg>` + pedido.status;
    tdStatus.classList.add('aproved');
  }
  return tdStatus;
}

function tdClienteCreate(pedido) {
  let cliente = pedido.cliente;
  let tdCliente = document.createElement('td');
  tdCliente.innerHTML = cliente.nome;
  return tdCliente;
}

function tdValorCreate(pedido) {
  let tdValor = document.createElement('td');
  tdValor.innerHTML = pedido.subTotal.toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL',
  });
  return tdValor;
}

function tdFreteCreate(pedido) {
  let tdFrete = document.createElement('td');
  tdFrete.innerHTML = pedido.frete.toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL',
  });
  return tdFrete;
}

function tdDescontoCreate(pedido) {
  let tdDesconto = document.createElement('td');
  tdDesconto.innerHTML = pedido.desconto.toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL',
  });
  return tdDesconto;
}

function tdTotalCreate(pedido) {
  let tdTotal = document.createElement('td');
  tdTotal.innerHTML = pedido.valorTotal.toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL',
  });
  return tdTotal;
}

function tdAcaoCreate(pedido) {
  let tdAcao = document.createElement('td');
  tdAcao.classList.add('col_edit');
  let div = document.createElement('div');
  div.classList.add('btn_edit');
  div.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path
  d="M11.3333 1.92207C11.5084 1.74925 11.7163 1.61216 11.9451 1.51863C12.1738 1.4251 12.419 1.37696 12.6666 1.37696C12.9143 1.37696 13.1595 1.4251 13.3882 1.51863C13.617 1.61216 13.8249 1.74925 14 1.92207C14.1751 2.09489 14.314 2.30006 14.4087 2.52587C14.5035 2.75167 14.5523 2.99368 14.5523 3.23809C14.5523 3.4825 14.5035 3.72451 14.4087 3.95031C14.314 4.17612 14.1751 4.38129 14 4.55411L4.99998 13.4372L1.33331 14.4242L2.33331 10.8052L11.3333 1.92207Z"
                          stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>`;
  tdAcao.appendChild(div);
  return tdAcao;
}

function bestProducts(prod) {
  let productsInfo = [];
  prod.forEach((element) => {
    let itens = element.itens;
    itens.forEach((el) => {
      productsInfo.push({
        nome: el.nome,
        qnt: el.quantidade,
        valorUnitario: el.valorUnitario,
      });
    });
  });
  filterProducts(productsInfo);
}

function sumProducts(nome, productsInfo) {
  return productsInfo.reduce((sum, e) => {
    e.nome == nome ? (sum += e.qnt) : (sum += 0);
    return sum;
  }, 0);
}
function sumValores(nome, productsInfo) {
  return productsInfo.reduce((sum, e) => {
    e.nome == nome ? (sum += e.valorUnitario) : (sum += 0);
    return sum;
  }, 0);
}

function filterProducts(productsInfo) {
  let listOfBestProducts = [];

  for (let i = 0; i < productsInfo.length; i++) {
    const element = productsInfo[i].nome;
    let obj = {
      nome: element,
      qnt: sumProducts(element, productsInfo),
      total: sumValores(element, productsInfo),
    };
    listOfBestProducts.push(obj);

    const nomes = listOfBestProducts.map((prod) => prod.nome);
    filteredProducts = listOfBestProducts.filter(
      ({ nome }, index) => !nomes.includes(nome, index + 1)
    );
  }
  console.log(filteredProducts);
}
