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

  // formulario compretar compra

  const finishBuyButton = document.getElementById("finish-buy");
  const modal = new bootstrap.Modal(document.getElementById("myModal"));

  finishBuyButton.addEventListener("click", function () {
    modal.show();
    updateTotal();
  });
  document.getElementById("close-modal").addEventListener("click", () => {
    modal.hide();
  });

  //primer modal
  const streetForm = document.getElementById("street-form");
  const paymentButton = document.getElementById("payment-btn");

  // Agrega un manejador para el botón "Método de pago"
  paymentButton.addEventListener("click", function (event) {
    if (streetForm.checkValidity()) {
      // Si el formulario es válido, abre el segundo modal
      $('#reg-modal').modal('show');
    } else {
      // Si el formulario no es válido, muestra un mensaje de validación
      streetForm.classList.add("was-validated");
    }
  });

  // Agrega un manejador para el cierre del primer modal
  document.getElementById("close-modal").addEventListener("click", () => {
    $('#myModal').modal('hide');
  });

  //segundo modal

  const paymentMethods = document.querySelectorAll(".payment-method");
  const creditCardFields = document.querySelector(".credit-card-fields");
  const transferFields = document.querySelector(".transfer-fields");
  const successMessage = document.querySelector("#success-message");

  paymentMethods.forEach((method) => {
      method.addEventListener("change", function () {
          if (method.value === "tarjeta_credito") {
              creditCardFields.style.display = "block";
              transferFields.style.display = "none";
          } else if (method.value === "transferencia_bancaria") {
              creditCardFields.style.display = "none";
              transferFields.style.display = "block";
          }
      });
  });

  const paymentForm = document.querySelector("#payment-form");

  paymentForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const visibleInputs = paymentForm.querySelectorAll(".credit-card-fields input:required, .transfer-fields input:required");
      let isValid = true;

      visibleInputs.forEach(input => {
          if (input.offsetParent === null) {
              // El campo está oculto, no lo validamos
          } else if (!input.checkValidity()) {
              isValid = false;
          }
      });

      if (isValid) {
          successMessage.style.display = "block";
          $('#reg-modal').modal('hide');
          $('#myModal').modal('hide');

          //alert
          setTimeout(function() {
            document.getElementById("success-message").style.display = "none";
          }, 2000);
      }
  });
});