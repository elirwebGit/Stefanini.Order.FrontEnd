document.addEventListener("DOMContentLoaded", () => {
  fetchOrders();
});

async function fetchOrders() {
  const response = await fetch("https://localhost:7213/api/Order");
  const orders = await response.json();
  displayOrders(orders);
}

function displayOrders(orders) {
  const ordersList = document.getElementById("orders");
  ordersList.innerHTML = "";
  orders.forEach((order) => {
    const li = document.createElement("li");
    li.innerHTML = `
          <span>${order.pedidoId} - Pedido Id: ${order.pedidoId} Nome: ${
      order.nomeCliente
    } Email: ${order.emailCliente} <br />Valor Total: ${formatter.format(
      order.valorTotal
    )}</span>
          <button onclick="editOrder(${order.pedidoId})">Editar</button>
          <button onclick="deleteOrder(${order.pedidoId})">Deletar</button>
      `;
    ordersList.appendChild(li);
  });
}

async function createOrUpdateOrder() {
  const id = document.getElementById("order-id").value;
  const CustomerName = document.getElementById("order-name").value;
  const CustomerEmail = document.getElementById("order-email").value;
  const ProductId = ocument.getElementById("order-produto").value;
  const ProductName = ocument.getElementById("order-nomeproduto").value;
  const Quantity = ocument.getElementById("order-quantidade").value;
  const Item = { ProductId, ProductName, Quantity };
  const order = { CustomerName, CustomerEmail, Item };

  if (id) {
    await fetch(`https://localhost:7213/api/Order/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });
  } else {
    await fetch("https://localhost:7213/api/Order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });
  }

  document.getElementById("order-id").value = "";
  document.getElementById("order-name").value = "";
  document.getElementById("order-email").value = "";
  document.getElementById("order-produto").value = "";
  document.getElementById("order-nomeproduto").value = "";
  document.getElementById("order-quantidade").value = "";

  fetchOrders();
}

async function editOrder(id) {
  const response = await fetch(`https://localhost:7213/api/Order/${id}`);
  const order = await response.json();

  document.getElementById("order-id").value = order.id;
  document.getElementById("order-name").value = order.customerName;
  document.getElementById("order-email").value = order.customerEmail;
  document.getElementById("order-produto").value = order.item.idProduto;
  document.getElementById("order-nomeproduto").value = order.item.nomeProduto;
  document.getElementById("order-quantidade").value = order.item.quantidade;
}

async function deleteOrder(id) {
  await fetch(`https://localhost:7213/api/Order/${id}`, {
    method: "DELETE",
  });
  fetchOrders();
}

const formatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});
