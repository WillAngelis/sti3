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

// entra na pagina e pega dados da api e salva no local storage uma copia
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
}

function saveLocal(purcharses) {
  localStorage.setItem('purcharses', JSON.stringify(purcharses));
}

const btnConsultar = document
  .querySelector('.btn_consultar')
  .addEventListener('click', getData);

function getData() {
  const purcharses = JSON.parse(localStorage.getItem('purcharses'));
  
  let table = document.querySelector('.table_content');
  table.innerHTML = ' ';
  purcharses.forEach((el) => {
    let tr = createLine(el);
    table.appendChild(tr);
  });
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
