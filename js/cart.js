document.addEventListener("DOMContentLoaded", () => {
  let cart = JSON.parse(localStorage.getItem("cartArray"));

  //--------------------------- añadiendo productos desde el local storage ---------------------------//
  function generateCart(cart) {
    // por las dudas no tocar xd
    generateProduct(cart);
  }

  function generateProduct(cart) {
    cart.forEach((product) => {
      fetch(`https://japceibal.github.io/emercado-api/products/${product}.json`)
        .then((response) => response.json())
        .then((data) => {
          if (data.currency === "UYU") {
            let dolar = data.cost / 40;
            data.cost = dolar;
            data.currency = "USD";
          }
          const li = document.createElement("li");
          li.classList.add("conteinerProduct");
          li.classList.add("conteinerProduct-cart");
          li.innerHTML = `
                  <div class="card">
                      <img src="${data.images[0]}" class="card-img-top" alt="${data.name}">
  
                      <div class="card-body">
                      <h5 class="card-title">${data.name}</h5>
                      <p class="card-text">${data.cost} ${data.currency}</p>
                      
                      <p class="card-text"${data.soldCount}</p>
                      <input type='number' placeholder='1' min= '1' class='amount-inp'/>
                      <h2 style = "color:  #222222; font-size: 20px"> Total : <span class='total-amount'> ${data.cost} </span>${data.currency}</h2>
                      <a href="#" class="btn btn-primary cart delete-btns" product-id='${product}' id = 'add-to-cart'> <span class="material-symbols-outlined">
                      delete
                       </span></a>
                      </div>
                  </div>
                  `;
          document.getElementById("container").appendChild(li);

          //----------------------Eliminando productos del carrito----------------------/
          deleteProduct(li);
                             // ------------- total costo ---------------------/
          totalCost(li, data);
        })
        .catch((error) => console.log(error));
    });
  }

  //---------------- Mostrando el costo total según cantidad de productos ---------------//
  function totalCost(li, data) {
    let amountInput = li.querySelector(".amount-inp");
    let totalAmountSpan = li.querySelector(".total-amount");
    totalAmountSpan.innerHTML = data.cost;
    amountInput.addEventListener("input", () => {
      let amount = parseInt(amountInput.value, 10);
      let totalAmount = data.cost * amount;
      if (isNaN(totalAmount)) {
        totalAmount = data.cost;
      }
      totalAmountSpan.textContent = `${totalAmount}`;
      updateTotal(); 
    });
  }

   //------mostrando total del total totalitario totalista-----------//

     function updateSummary() {
      const subTotal = Array.from(document.querySelectorAll(".total-amount")).reduce((total, element) => {
        return total + parseFloat(element.textContent);
      }, 0);
  
      const flatShippingCost = 0; // Tarifa plana de envío
  
      const totalAmount = subTotal + flatShippingCost;
  
      document.getElementById("subtotal-amount").textContent = `${subTotal.toFixed(2)} USD`;
      document.getElementById("shipping-amount").textContent = `${flatShippingCost.toFixed(2)} USD`;
      document.getElementById("total-amount").textContent = `${totalAmount.toFixed(2)} USD`;
    }
  
    // Llamar a la función para calcular el resumen al cargar la página
    updateSummary();
  
  
    // Agrega un evento de escucha a los elementos de radio para capturar el cambio
    const premiumRadioButtons = document.querySelectorAll('input[name="premium"]');
    premiumRadioButtons.forEach((radio) => {
      radio.addEventListener("change", () => {
        updateTotal(); // Llama a la función para actualizar el total
      });
    });
  
    // Función para actualizar el total
    function updateTotal() {
      let subTotal = 0;
      document.querySelectorAll(".total-amount").forEach((totalAmountSpan) => {
        subTotal += parseFloat(totalAmountSpan.textContent);
      });
  
      let selectedShippingPercentage = 0;
      premiumRadioButtons.forEach((radio) => {
        if (radio.checked) {
          selectedShippingPercentage = parseInt(radio.value, 10);
        }
      });
  
      // Calcular el costo de envío en función del porcentaje seleccionado
      const shippingCost = (subTotal * selectedShippingPercentage) / 100;
  
      // Calcular el total a pagar
      const totalAmount = subTotal + shippingCost;
  
      // Actualizar los elementos HTML con los valores calculados
      document.getElementById("subtotal-amount").textContent = `${subTotal.toFixed(2)} USD`;
      document.getElementById("shipping-amount").textContent = `${shippingCost.toFixed(2)} USD`;
      document.getElementById("total-amount").textContent = `${totalAmount.toFixed(2)} USD`;
    }
  
    // Llamar a la función para calcular el resumen al cargar la página
    updateTotal(); 
  

  function deleteProduct(li) {
    let deleteBtns = document.querySelectorAll(".delete-btns");
    deleteBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        btn.closest(".conteinerProduct").remove();
        let productId = btn.getAttribute("product-id"); // Convertir a número
        let index = cart.indexOf(productId);
        //arreglaaaooo fuaaaaa loco AAAAAAAAAAAAAA
        if (index !== -1) {
          cart.splice(index, 1);
          localStorage.setItem("cartArray", JSON.stringify(cart));
          li.remove();
        }
      });
    });
  }

                  //-------------------GENERANDO CARRITO -----------------//

  //------------------------------Trayendo productos desde la API------------------------------//

  fetch("https://japceibal.github.io/emercado-api/user_cart/25801.json")
    .then((response) => response.json())
    .then((data) => {
      data.articles.forEach((product) => {
        let productIdToAdd = `${product.id}`;
        if (!cart.includes(productIdToAdd)) {
          cart.push(productIdToAdd);
        }
        generateCart(cart);
      });
    });

  //---------------------- Formularios y validaciones ------------------------//

  // Función para mostrar un modal
function showModal(modalId) {
  const modal = new bootstrap.Modal(document.getElementById(modalId));
  modal.show();
}

// Función para ocultar un modal
function hideModal(modalId) {
  const modal = new bootstrap.Modal(document.getElementById(modalId));
  modal.hide();
  document.getElementById(modalId).style.display = 'none';
}

// Función para mostrar un mensaje de éxito temporal
function showSuccessMessage(messageElement, duration = 2000) {
  messageElement.style.display = "block";
  setTimeout(() => {
    messageElement.style.display = "none";
  }, duration);
}

// Función para mostrar un mensaje de error temporal
function showErrorMessage(messageElement, duration = 2000) {
  messageElement.style.display = "block";
  setTimeout(() => {
    messageElement.style.display = "none";
  }, duration);
}

// Función para validar un formulario de tarjeta de crédito
function isCreditCardValid(creditCardNumber, expirationDate, cvv) {
  // Validar que el número de tarjeta tenga 16 dígitos numéricos
  return /^\d{16}$/.test(creditCardNumber);
}

// Función para validar un formulario de cuenta bancaria
function isBankAccountValid() {
  const bankAccountForm = document.getElementById('bankAccountForm');
  const accountInputs = bankAccountForm.querySelectorAll('.account-info');
  return Array.from(accountInputs).every(input => input.value !== null && input.value !== '');
}
// Manejador del botón "Finalizar compra" en el primer modal
function handleFinishBuyButtonClick() {
  showModal("myModal");
  updateTotal();
}
// ----------------- Limpiar Carrito ------------------ //
/*
function clearCart(cart) {
  cart = []
  JSON.stringify(localStorage.setItem("cartArray"));
  document.getElementById('container').innerHTML = '';
  console.log(cart)
} */

// Manejador del botón "Finalizar compra" en el segundo modal
function handleSubmitCreditCardButtonClick() {
  const creditCardNumberInput = document.getElementById("creditCardNumber");
  const expirationDateInput = document.getElementById("expirationDate");
  const cvvInput = document.getElementById("cvv");
  const errorMessage = document.querySelector("#error-message");
  const successMessage = document.querySelector("#success-message");

  const creditCardNumber = creditCardNumberInput.value;
  const expirationDate = expirationDateInput.value;
  const cvv = cvvInput.value;

  if (isCreditCardValid(creditCardNumber, expirationDate, cvv)) {
    hideModal("creditCardModal");
    //miloco
    document.getElementById('myModal').style.display = 'none';
    errorMessage.style.display = "none";
    showSuccessMessage(successMessage);
  } else {
    showErrorMessage(errorMessage);
  }
}
// -------------- Parte 3 ----------------//
// Manejador del botón "Transferencia bancaria"
function handleWireTransferButtonClick() {
  const streetForm = document.getElementById("street-form");
  if (streetForm.checkValidity()) {
    showModal("bankAccountModal");
  } else {
    streetForm.classList.add("was-validated");
  }
}
// Manejador del botón "Método de pago"
function handlePaymentButtonClick() {
  const streetForm = document.getElementById("street-form");
  if (streetForm.checkValidity()) {
    showModal("creditCardModal");
  } else {
    streetForm.classList.add("was-validated");
  }
}

// Manejador del botón "Finalizar compra" en el modal de cuenta bancaria
function handleSubmitBankAccountButtonClick() {
  if (isBankAccountValid()) {
    hideModal("bankAccountModal");
    //miloco
    document.getElementById('myModal').style.display = 'none';
    showSuccessMessage(document.querySelector("#success-message"));
    crearCart(cart)
  } else {
    showErrorMessage(document.querySelector("#error-message"));
  }
}

// Agregar event listeners a los botones
document.getElementById("finish-buy").addEventListener("click", handleFinishBuyButtonClick);
document.getElementById("payment-btn").addEventListener("click", handlePaymentButtonClick);
document.getElementById("close-modal").addEventListener("click", () => hideModal("myModal"));
document.getElementById("submitCreditCard").addEventListener("click", handleSubmitCreditCardButtonClick);
document.getElementById("wire-transfer").addEventListener("click", handleWireTransferButtonClick);
document.getElementById("submitBankAccount").addEventListener("click", handleSubmitBankAccountButtonClick);
});