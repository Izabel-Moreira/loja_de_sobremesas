const cartItems = document.querySelector('.cart-items');
const totalPriceElement = document.querySelector('.total-price');
const confirmOrderButton = document.querySelector('.confirm-order');
const startNewOrderButton = document.querySelector('.start-new-order');
const orderConfirmation = document.querySelector('.order-confirmation');
const closeConfirmationButton = document.querySelector('.close-confirmation');

const cart = {}; 


function updateCart(product, quantity) {
    if (quantity === 0) {
        delete cart[product.id];
    } else {
        cart[product.id] = quantity;
    }

 
    cartItems.innerHTML = ''; 
    let totalPrice = 0;
    for (const productId in cart) {
        const product = getProductById(productId);
        if (product) {
            const item = document.createElement('li');
            item.classList.add('cart-item');
            item.innerHTML = `
                <span class="name">${product.name}</span>
                <span class="quantity">
                    <span class="quantity-control">
                        <button class="decrease-quantity" data-product-id="${productId}">-</button>
                        <span class="quantity-number">${cart[productId]}</span>
                        <button class="increase-quantity" data-product-id="${productId}">+</button>
                    </span>
                    <span class="price">R$${(product.price * cart[productId]).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </span>
            `;
            cartItems.appendChild(item);
            totalPrice += product.price * cart[productId];
        }
    }
    totalPriceElement.textContent = `R$${totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}


function getProductById(productId) {
    const products = [
        { id: 'waffle', name: 'Waffle ', price: 6.50 },
        { id: 'creme-brulee', name: ' Crème Brûlée', price: 7.00 },
        { id: 'macarons', name: 'Macaron ', price: 8.00 },
        { id: 'tiramisu', name: ' Tiramisu', price: 5.50 },
        { id: 'baklava', name: ' Baklava', price: 4.00 },
        { id: 'torta_doce', name: 'Torta Doce', price: 5.00 },
        { id: 'brownie', name: 'Brownie', price: 5.50 },
    ];
    return products.find(product => product.id === productId);
}


const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const productId = button.dataset.productId;
        const product = getProductById(productId);
        if (product) {
            if (productId in cart) {
                cart[productId]++;
            } else {
                cart[productId] = 1;
            }
            updateCart(product, cart[productId]);
        }
    });
});


cartItems.addEventListener('click', (event) => {
    if (event.target.classList.contains('increase-quantity')) {
        const productId = event.target.dataset.productId;
        const product = getProductById(productId);
        if (product) {
            cart[productId]++;
            updateCart(product, cart[productId]);
        }
    } else if (event.target.classList.contains('decrease-quantity')) {
        const productId = event.target.dataset.productId;
        const product = getProductById(productId);
        if (product) {
            if (cart[productId] > 1) {
                cart[productId]--;
            } else {
                cart[productId] = 0; 
            }
            updateCart(product, cart[productId]);
        }
    }
});


confirmOrderButton.addEventListener('click', () => {
    if (Object.keys(cart).length > 0) {
        orderConfirmation.style.display = 'flex';
    } else {
        alert('Por favor, adicione os produtos no carrinho.');
    }
});



startNewOrderButton.addEventListener('click', () => {
    Object.keys(cart).forEach(productId => {
        delete cart[productId];
    });
    updateCart({}, 0);
    orderConfirmation.style.display = 'none'; 
});


closeConfirmationButton.addEventListener('click', () => {
    orderConfirmation.style.display = 'none';
});