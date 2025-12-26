// Sample product data
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 49.99,
        emoji: "🎧"
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 199.99,
        emoji: "⌚"
    },
    {
        id: 3,
        name: "Laptop Stand",
        price: 29.99,
        emoji: "💻"
    },
    {
        id: 4,
        name: "Phone Case",
        price: 14.99,
        emoji: "📱"
    },
    {
        id: 5,
        name: "USB Cable",
        price: 9.99,
        emoji: "🔌"
    },
    {
        id: 6,
        name: "Backpack",
        price: 39.99,
        emoji: "🎒"
    }
];

// Cart data
let cart = [];

// Initialize the app
function init() {
    renderProducts();
    renderCart();
    updateCartSummary();
    
    // Checkout button event listener
    document.getElementById('checkoutBtn').addEventListener('click', checkout);
}

// Render products
function renderProducts() {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">${product.emoji}</div>
            <div class="product-name">${product.name}</div>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Add item to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);
    
    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            emoji: product.emoji,
            quantity: 1
        });
    }
    
    renderCart();
    updateCartSummary();
    showNotification(`${product.name} added to cart!`);
}

// Remove item from cart (decrease quantity)
function removeFromCart(productId) {
    const cartItem = cart.find(item => item.id === productId);
    
    if (cartItem) {
        cartItem.quantity--;
        
        if (cartItem.quantity === 0) {
            deleteFromCart(productId);
        } else {
            renderCart();
            updateCartSummary();
        }
    }
}

// Delete item from cart completely
function deleteFromCart(productId) {
    const cartItem = cart.find(item => item.id === productId);
    cart = cart.filter(item => item.id !== productId);
    
    renderCart();
    updateCartSummary();
    
    if (cartItem) {
        showNotification(`${cartItem.name} removed from cart`);
    }
}

// Render cart items
function renderCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        document.getElementById('checkoutBtn').disabled = true;
        return;
    }
    
    document.getElementById('checkoutBtn').disabled = false;
    cartItemsContainer.innerHTML = '';
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-header">
                <span class="cart-item-name">${item.emoji} ${item.name}</span>
                <button class="delete-btn" onclick="deleteFromCart(${item.id})">
                    Delete
                </button>
            </div>
            <div class="cart-item-details">
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="removeFromCart(${item.id})" ${item.quantity === 1 ? 'disabled' : ''}>
                        -
                    </button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="addToCart(${item.id})">
                        +
                    </button>
                </div>
                <span class="item-price">$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
}

// Update cart summary
function updateCartSummary() {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = cart.length > 0 ? 5.99 : 0;
    const total = subtotal + shipping;
    
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('shipping').textContent = `$${shipping.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }
    
    const total = parseFloat(document.getElementById('total').textContent.replace('$', ''));
    showNotification(`Order placed! Total: $${total.toFixed(2)}`);
    
    // Clear cart
    cart = [];
    renderCart();
    updateCartSummary();
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #ee4d2d;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease-out reverse';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
