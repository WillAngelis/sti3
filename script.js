// Função de data
const date = new Date();
const dataAtual = document.querySelector('.data_atual');
dataAtual.textContent = date.toDateString();

// Entra na pagina e pega dados da api e salva no local storage uma copia
// ao clicar em consultar pega os dados do local storage

const url =
  'https://justcors.com/tl_49a71e8/https://desafiotecnicosti3.azurewebsites.net/pedido';

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
    let pedidosTab = document.querySelector('.pedidos_tab');
  }, 100);
  pedidosTab.classList.add('is_active');
}

const btnConsultar = document.querySelector('.btn_consultar');
btnConsultar.addEventListener('click', getData);

function getData() {
  let table = document.querySelector('.table_content');
  loadingTable(table);
}

function getDataToTable(table) {
  let tableContainer = document.querySelector('.table_container');
  let topSellContainer = document.querySelector('.top_sells_container');
  if (!tableContainer.classList.contains('is_active')) {
    tableContainer.classList.add('is_active');
    topSellContainer.classList.remove('is_active');
    tabTopSells.classList.remove('is_active');
  }
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
    tdStatus.innerHTML = `<svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.75 1.25L1.25 9.75M1.25 1.25L9.75 9.75" stroke="#E53E3E" stroke-width="2"
                          stroke-linecap="round" stroke-linejoin="round" />
                      </svg><span>${pedido.status} </span>`;
    tdStatus.classList.add('cancel');
  } else {
    tdStatus.innerHTML = ` <svg width="13" height="10" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.1091 1L4.15909 9L1 5.36364" stroke="#38A169" stroke-width="2"
                          stroke-linecap="round" stroke-linejoin="round" />
                      </svg><span>${pedido.status} </span>`;
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
  tdTotal.innerHTML = convertMoneytoBr(pedido);
  return tdTotal;
}

function tdAcaoCreate(pedido) {
  let nomes = pedido.cliente;
  let endereco = pedido.enderecoEntrega;
  let tdAcao = document.createElement('td');
  tdAcao.classList.add('col_edit');
  let div = document.createElement('div');
  div.classList.add('btn_edit');
  clientEditBtn(div, nomes, endereco, pedido);
  div.innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path
  d="M11.3333 1.92207C11.5084 1.74925 11.7163 1.61216 11.9451 1.51863C12.1738 1.4251 12.419 1.37696 12.6666 1.37696C12.9143 1.37696 13.1595 1.4251 13.3882 1.51863C13.617 1.61216 13.8249 1.74925 14 1.92207C14.1751 2.09489 14.314 2.30006 14.4087 2.52587C14.5035 2.75167 14.5523 2.99368 14.5523 3.23809C14.5523 3.4825 14.5035 3.72451 14.4087 3.95031C14.314 4.17612 14.1751 4.38129 14 4.55411L4.99998 13.4372L1.33331 14.4242L2.33331 10.8052L11.3333 1.92207Z"
                          stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>`;
  tdAcao.appendChild(div);
  return tdAcao;
}

// Função para editar cliente

function clientEditBtn(div, nomes, pedido, endereco) {
  div.addEventListener('click', () => {
    let tabPedidos = document.querySelectorAll('.list_head_tab');
    let edit_btn = document.querySelector('.edit_btns');
    let edit_container = document.querySelector('.edit_container');
    let tabsBody = document.querySelector('.tabs_body');
    let table = document.querySelector('.table');
    let tabs_head = document.querySelector('.tabs_head');

    tabs_head.classList.add('dont_show');
    edit_container.classList.add('is_active');
    edit_btn.classList.add('is_active');

    showEdit(nomes, tabsBody, pedido, endereco);
    for (let i = 0; i < tabPedidos.length; i++) {
      const element = tabPedidos[i];
      if (element.classList.contains('is_active')) {
        element.classList.remove('is_active');
      }
    }
  });
}
function convertMoneytoBr(pedido) {
  let result = pedido.valorTotal - pedido.desconto;
  result = result.toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL',
  });
  return result;
}
function showEdit(nomes, tabsBody, endereco, pedido) {
  tabsBody.innerHTML = '';
  tabsBody.innerHTML += `<div class="edit_info_container is_active">
            <div>
              <h2 class="venda_num">Venda nª1</h2>
              <div>
                <span>Data:</span>
                <p>${new Date(pedido.dataCriacao)}</p>
              </div>
              <div>
                <span>Status:</span>
                <p>${pedido.status}</p>
              </div>
              <div>
                <span>Desconto:</span>
                <p>${pedido.desconto.toLocaleString('pt-br', {
                  style: 'currency',
                  currency: 'BRL',
                })}</p>
              </div>
              <div>
                <span>Frete:</span>
                <p>${pedido.frete.toLocaleString('pt-br', {
                  style: 'currency',
                  currency: 'BRL',
                })}</p>
              </div>
              <div>
                <span>Subtotal:</span>
                <p>${pedido.subTotal.toLocaleString('pt-br', {
                  style: 'currency',
                  currency: 'BRL',
                })}</p>
              </div>
              <div>
                <span>Total:</span>
                <p>${convertMoneytoBr(pedido)}</p>
              </div>
              <div>
                <span class="info_endereco">Endereço de entrega:</span>
                <p class="info_endereco">${endereco.endereco},${
    endereco.numero
  }-${endereco.bairro}-${endereco.cidade}(${endereco.estado})</p>
              </div>
            </div>
            <form>
              <h2> Informações do cliente</h2>
              <label for="">Nome *</label>
              <input type="text" placeholder="Digite seu nome" value="${
                nomes.nome
              }" class="input input_nome"  disabled>
              <label for="">E-mail *</label>
              <input type="text" placeholder="Digite seu email" value="${
                nomes.email
              }" class="input input_email"  disabled>
              <label for="">CPF *</label>
              <input type="number" placeholder="000.000.000-00" value="${
                nomes.cpf
              }" class="input input_cpf"  disabled>
              <input type="text" placeholder="000.000.000-00" value="${
                nomes.id
              }" class="id_input"  disabled>
            </form>
          </div>
        </div>`;
  let inputs = document.querySelectorAll('.input');
  let btnEdit = document
    .querySelector('.editar')
    .addEventListener('click', () => {
      for (let i = 0; i < inputs.length; i++) {
        const element = inputs[i];
        element.disabled = false;
        element.value = '';
      }
      inputs[0].focus();
    });

  // Botão Salvar alterações
  let btnSaveEdit = document.querySelector('.confirm');
  btnSaveEdit.addEventListener('click', saveEdit);
}

//  Botão cancelar alterações

let btnGoBackEdit = document.querySelector('.cancel');
btnGoBackEdit.addEventListener('click', () => {
  goBackEdit();
  notifyCancel();
});

function goBackEdit() {
  let tabsBody = document.querySelector('.tabs_body');
  let tabs_head = document.querySelector('.tabs_head');
  tabs_head.classList.remove('dont_show');
  let tabPedidos = document.querySelectorAll('.list_head_tab');
  let edit_btn = document.querySelector('.edit_btns');
  let edit_container = document.querySelector('.edit_container');
  edit_btn.classList.remove('is_active');
  edit_container.classList.remove('is_active');
  for (let i = 0; i < tabPedidos.length; i++) {
    const element = tabPedidos[i];
    if (!element.classList.contains('is_active')) {
      element.classList.add('is_active');
    }
  }
  tabsBody.innerHTML = `<div class="tabs_content table_container is_active">
                          <table class="table">
                            <th>Status</th>
                            <th>Nome do cliente</th>
                            <th>Valor</th>
                            <th>Frete</th>
                            <th>Desconto</th>
                            <th>Total</th>
                            <th>Ações</th>
                            <tbody class="table_content">
                            </tbody>
                          </table>
                        </div>
                        <div class="tabs_content top_sells_container"></div>`;
  getData();
}

function saveEdit() {
  let inputs_name = document.querySelector('.input_nome');
  let inputs_email = document.querySelector('.input_email');
  let inputs_cpf = document.querySelector('.input_cpf');
  let inputs = [];
  inputs.push(inputs_name);
  inputs.push(inputs_email);
  inputs.push(inputs_cpf);

  for (let i = 0; i < inputs.length; i++) {
    const element = inputs[i];
    if (element.value == false) {
      element.classList.add('input_wrong');
    } else {
      element.classList.remove('input_wrong');
    }
  }
  if (inputs_name.value && inputs_email.value && inputs_cpf.value != false) {
    let input_id = document.querySelector('.id_input').value;

    const purcharses = JSON.parse(localStorage.getItem('purcharses'));

    purcharses.forEach((element) => {
      let cliente = element.cliente;
      if (cliente.id == input_id) {
        cliente.nome = inputs_name.value;
        cliente.email = inputs_email.value;
        cliente.cpf = inputs_cpf.value;
      }
    });
    localStorage.setItem('purcharses', JSON.stringify(purcharses));
    goBackEdit();
    notifySucess();
  }
}
let filteredProducts; // Array para salvar produtos mais vendidos

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
}

//  Funções para aba mais vendidos

let tabTopSells = document.querySelector('.top_sells_tab');
tabTopSells.addEventListener('click', showTopSells);

function showTopSells() {
  let tabsBody = document.querySelector('.tabs_body');
  let tabPedidos = document.querySelectorAll('.list_head_tab');
  setTimeout(() => {
    for (let i = 0; i < tabPedidos.length; i++) {
      const element = tabPedidos[i];
      if (element.classList.contains('is_active')) {
        element.classList.remove('is_active');
      }
    }
    let topSellTabs = document.querySelector('.sells_head_tab');
    topSellTabs.classList.add('is_active');
    let pedidosTab = document.querySelector('.pedidos_tab');
    tabTopSells.classList.add('is_active');
  }, 100);
  let sells_container = document.querySelector('.top_sells_container');
  loadingMoreSells(sells_container);
  pedidosTab.classList.remove('is_active');
}

let loadingArray = [];

let load_div = document.querySelector('.load_div');
loadingArray.push(load_div);
let load_gif = document.querySelector('.load_gif');
loadingArray.push(load_gif);
let load_text = document.querySelector('.load_text');
loadingArray.push(load_text);

function loadingMoreSells(container) {
  let table = document.querySelector('.table_content');
  let tableContainer = document.querySelector('.table_container');
  tableContainer.classList.remove('is_active');
  for (let i = 0; i < loadingArray.length; i++) {
    const element = loadingArray[i];
    element.classList.add('is_active');
  }
  setTimeout(() => {
    for (let i = 0; i < loadingArray.length; i++) {
      const element = loadingArray[i];
      element.classList.toggle('is_active');
      container.classList.add('is_active');
    }
  }, 200);
  orderForArray(filteredProducts);
}
function orderForArray(filteredArray) {
  filteredArray.sort((a, b) => b.qnt - a.qnt);
  showPodium(filteredArray);
}

function showPodium(array) {
  let sells_container = document.querySelector('.top_sells_container');

  sells_container.innerHTML = '';
  for (let i = 0; i <= 4; i++) {
    const el = array[i];
    sells_container.innerHTML += `<div class="podium_place place-${i + 1}">
              <h2>${i + 1}ª</h2>
              <h4>${el.nome}</h4>
              <p>Vendido <span>${el.qnt}</span> vezes</p>
              <p>Resultou em <span>${el.total.toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL',
              })}</span></p>
            </div>`;
  }
}
