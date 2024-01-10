const AddToCart = document.querySelectorAll(".add_to_cart");
const CartItems = document.querySelector(".cart-items");
const cartHeader = document.getElementById("cartHeader");
const emptyCartContainer = document.getElementById("emptyCartContainer");
const orderNowButton = document.getElementById("orderNowButton");
const cartMessage = createFloatingMessage();

// Add click event listener to the new button
AddToCart.forEach((button) => {
    button.addEventListener("click", () => {
        const id = button.getAttribute("data-id");
        const title = button.getAttribute("data-title");
        const image = button.getAttribute("data-image");
        const price = button.getAttribute("data-price");

        const cartItem = { id, title, image, price };
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(cartItem);
        localStorage.setItem("cart", JSON.stringify(cart));

        showCartMessage("Item added!");
        displayCartItems(); // Update the cart display after adding an item
    });
});

function showCartMessage(message) {
    cartMessage.textContent = message;
    cartMessage.style.display = "block";

    // Hide the message after a few seconds (you can adjust the timeout)
    setTimeout(() => {
        cartMessage.style.display = "none";
    }, 700); // 700 milliseconds (1.5 seconds) timeout
}

function createFloatingMessage() {
    const messageElement = document.createElement("div");
    messageElement.classList.add("floating-message");
    document.body.appendChild(messageElement);

    return messageElement;
}

function displayCartItems() {
    if (!CartItems) {
        console.error("CartItems element not found");
        return;
    }

    CartItems.innerHTML = ""; // Clear the previous content before displaying items
    const items = JSON.parse(localStorage.getItem("cart")) || [];

    if (items.length === 0) {
        cartHeader.style.display = "none"; // Hide the cart header if there are no items
        emptyCartContainer.style.display = "flex"; // Display the empty cart container
        orderNowButton.style.display = "none"; // Hide the "Order Now" button if no items in the cart
    } else {
        cartHeader.style.display = "flex"; // Display the cart header if there are items
        emptyCartContainer.style.display = "none"; // Hide the empty cart container
        orderNowButton.style.display = "block"; // Display the "Order Now" button if there are items in the cart

        items.forEach((item) => {
            const cartItem = document.createElement("div");
            cartItem.className = "cart_item";
            cartItem.innerHTML = `
                <p class="cart_id">${item.id}</p>
                <p class="cart_title">${item.title}</p>
                <img src="${item.image}" alt="${item.title}" class="cart_img" />
                <p class="cart_price">${item.price}</p>
                <p class="cart_delete" data-id="${item.id}">Delete</p>
            `;
            CartItems.appendChild(cartItem);

            const deleteButton = cartItem.querySelector(".cart_delete");
            deleteButton.addEventListener("click", () => {
                removeFromCart(item.id);
                displayCartItems(); // Update the cart display after removing an item
            });
        });
    }
}

function removeFromCart(itemId) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = cart.filter((item) => item.id !== itemId);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    showCartMessage("Item removed!");
    displayCartItems(); // Update the cart display after removing an item
}

displayCartItems();
