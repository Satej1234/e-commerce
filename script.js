// Sample product data (with prices in Indian Rupees)
const products = [
    {
        id: 1,
        name: "Classic White T-Shirt",
        price: 1999.00,
        image: "tshirt.jpg"
    },
    {
        id: 2,
        name: "Black Denim Jacket",
        price: 5999.00,
        image: "denim.jpg"
    },
    {
        id: 3,
        name: "Floral Summer Dress",
        price: 3499.00,
        image: "floral.jpg"
    },
    {
        id: 4,
        name: "Canvas Sneakers",
        price: 2499.00,
        image: "sneakers.jpg"
    },
    {
        id: 5,
        name: "Leather Crossbody Bag",
        price: 4499.00,
        image: "crossbody.jpg"
    },
    {
        id: 6,
        name: "Slim Fit Jeans",
        price: 3999.00,
        image: "jeans.jpg"
    },
    {
        id: 7,
        name: "Oversized Sunglasses",
        price: 1499.00,
        image: "sunglasses.jpg"
    },
    {
        id: 8,
        name: "Cotton Hoodie",
        price: 2999.00,
        image: "cotton.jpg"
    }
];

// Cart functionality
let cart = [];
const cartIcon = document.getElementById('cartIcon');
const cartOverlay = document.getElementById('cartOverlay');
const closeCart = document.getElementById('closeCart');
const overlayBg = document.getElementById('overlayBg');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.querySelector('.cart-count');

// Load products
const productGrid = document.getElementById('productGrid');

function loadProducts() {
    productGrid.innerHTML = '';
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-img">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">₹${product.price.toFixed(2)}</p>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
    
    // Add event listeners to "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            addToCart(productId);
        });
    });
}

// Add to cart function
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCart();
    openCart();
}

// Update cart
function updateCart() {
    cartItems.innerHTML = '';
    let total = 0;
    let count = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        count += item.quantity;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.name}</h4>
                <p class="cart-item-price">₹${item.price.toFixed(2)}</p>
                <div class="cart-item-quantity">
                    <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                    <input type="text" class="quantity-input" value="${item.quantity}" readonly>
                    <button class="quantity-btn increase" data-id="${item.id}">+</button>
                </div>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
    
    cartTotal.textContent = total.toFixed(2);
    cartCount.textContent = count;
    
    // Add event listeners to quantity buttons
    const decreaseButtons = document.querySelectorAll('.decrease');
    const increaseButtons = document.querySelectorAll('.increase');
    
    decreaseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            decreaseQuantity(productId);
        });
    });
    
    increaseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            increaseQuantity(productId);
        });
    });
}

// Decrease quantity
function decreaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item.quantity > 1) {
        item.quantity -= 1;
    } else {
        cart = cart.filter(item => item.id !== productId);
    }
    updateCart();
}

// Increase quantity
function increaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    item.quantity += 1;
    updateCart();
}

// Open cart
function openCart() {
    cartOverlay.classList.add('active');
    overlayBg.classList.add('active');
}

// Close cart
function closeCartFunction() {
    cartOverlay.classList.remove('active');
    overlayBg.classList.remove('active');
}

// Event listeners
cartIcon.addEventListener('click', openCart);
closeCart.addEventListener('click', closeCartFunction);
overlayBg.addEventListener('click', closeCartFunction);

// Newsletter form
const newsletterForm = document.querySelector('.newsletter-form');
newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const emailInput = this.querySelector('.newsletter-input');
    if (emailInput.value) {
        alert('Thank you for subscribing to our newsletter!');
        emailInput.value = '';
    }
});

// Initialize
loadProducts();