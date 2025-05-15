const cartKey = 'claireCafeCart';

// Load cart from localStorage or initialize empty array
let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

// Function to add item to cart
function addToCart(item) {
    // Check if item already exists in cart
    const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);
    if (existingItemIndex !== -1) {
        // If exists, increase quantity
        cart[existingItemIndex].quantity += 1;
    } else {
        // If not, add new item with quantity 1
        cart.push({...item, quantity: 1});
    }
    // Save updated cart to localStorage
    localStorage.setItem(cartKey, JSON.stringify(cart));
    // Update cart count display
    updateCartCount(); 
    alert(`${item.name} has been added to your cart.`);
    // If on cart page, re-render cart items
    if (document.getElementById('cartItems')) {
        renderCart();j
    }
}

// Function to update cart count in header
function updateCartCount() {
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
        const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.textContent = totalCount;
    }
}

// Function to remove item from cart by id
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    localStorage.setItem(cartKey, JSON.stringify(cart));
    updateCartCount();
    renderCart();
}

// Function to render cart items and summary on cart.html
function renderCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartSummaryContainer = document.getElementById('cartSummary');

    if (!cartItemsContainer || !cartSummaryContainer) return;

    cartItemsContainer.innerHTML = '';
    cartSummaryContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
                <a href="menu.html" class="btn">Browse Menu</a>
            </div>
        `;
        return;
    }

    // Render each cart item with image
    cart.forEach(item => {
        const itemTotal = (item.price * item.quantity).toFixed(2);
        const cartItemDiv = document.createElement('div');
        cartItemDiv.className = 'cart-item';
        cartItemDiv.innerHTML = `
            <div class="cart-item-img">
                <img src="${item.image}" alt="${item.name}" />
            </div>
            <div class="cart-item-info">
                <h3>${item.name}</h3>
                <p>Price: P${item.price.toFixed(2)}</p>
                <p>Quantity: ${item.quantity}</p>
                <p>Total: P${itemTotal}</p>
                <button class="btn btn-remove" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItemDiv);
    });

    // Calculate total price
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

    // Render order summary
    cartSummaryContainer.innerHTML = `
        <h2>Order Summary</h2>
        <p>Total Price: P${totalPrice}</p>
        <a href="menu.html" class="btn">Continue Shopping</a>
        <a href="checkout.html" class="btn btn-primary">Checkout</a>
    `;
}

// Initialize cart count and render cart on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    renderCart();
});
