/* =====================================================
   FOOD EXPRESS JAVASCRIPT
===================================================== */


/* =====================================================
   CART
===================================================== */

let cart = loadCart();
let trackingTimers = [];

const cartCount = document.getElementById("cartCount");

const cartButton = document.querySelector(".cart-btn");

const cartPanel = document.querySelector(".cart-panel");

const cartOverlay = document.querySelector(".cart-overlay");

const closeCartButton = document.querySelector(".close-cart");

const cartItemsContainer =
    document.querySelector(".cart-items");

const cartTotal =
    document.querySelector(".cart-total strong");


/* OPEN CART */

cartButton.addEventListener("click", function () {

    cartPanel.classList.add("open");

    cartOverlay.style.display = "block";

    updateCart();

});


/* CLOSE CART */

closeCartButton.addEventListener("click", closeCart);

cartOverlay.addEventListener("click", closeCart);


function closeCart() {

    cartPanel.classList.remove("open");

    cartOverlay.style.display = "none";

    cartPanel.setAttribute("aria-hidden", "true");

}


function openCart() {

    cartPanel.classList.add("open");

    cartOverlay.style.display = "block";

    cartPanel.setAttribute("aria-hidden", "false");

    updateCart();

}


function loadCart() {

    try {

        const savedCart = JSON.parse(localStorage.getItem("foodExpressCart"));

        if (!Array.isArray(savedCart)) {

            return [];

        }

        return savedCart.filter(function (item) {

            return item &&
                typeof item.name === "string" &&
                Number.isFinite(item.price) &&
                Number.isInteger(item.quantity) &&
                item.quantity > 0;

        });

    } catch (error) {

        return [];

    }

}


function saveCart() {

    localStorage.setItem("foodExpressCart", JSON.stringify(cart));

}


/* ADD TO CART */

const addCartButtons =
    document.querySelectorAll(".add-cart");


addCartButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const name =
            button.getAttribute("data-name");

        const price =
            Number(button.getAttribute("data-price"));


        const existingItem =
            cart.find(function (item) {

                return item.name === name;

            });


        if (existingItem) {

            existingItem.quantity++;

        } else {

            cart.push({
                name: name,
                price: price,
                quantity: 1
            });

        }


        updateCart();

        cartPanel.classList.add("open");

        cartOverlay.style.display = "block";

    });

});


/* UPDATE CART */

function updateCart() {

    cartItemsContainer.innerHTML = "";

    let total = 0;

    let count = 0;


    if (cart.length === 0) {

        cartItemsContainer.innerHTML =
            "<p>Your cart is empty 🛒</p>";

    }


    cart.forEach(function (item, index) {

        total +=
            item.price * item.quantity;

        count += item.quantity;


        const cartItem =
            document.createElement("div");

        cartItem.className = "cart-item";


        cartItem.innerHTML = `

            <div class="cart-item-info">

                <h4>${item.name}</h4>

                <p>₹${item.price * item.quantity}</p>

            </div>

            <div class="quantity-controls">

                <button onclick="changeQuantity(${index}, -1)">
                    −
                </button>

                <span>
                    ${item.quantity}
                </span>

                <button onclick="changeQuantity(${index}, 1)">
                    +
                </button>

            </div>

        `;


        cartItemsContainer.appendChild(cartItem);

    });


    cartCount.textContent = count;

    cartTotal.textContent =
        "₹" + total;

}


/* CHANGE QUANTITY */

function changeQuantity(index, change) {

    cart[index].quantity += change;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    updateCart();

}


/* =====================================================
   CHECKOUT
===================================================== */

const checkoutButton =
    document.querySelector(".checkout-btn");

const checkoutOverlay =
    document.querySelector(".checkout-overlay");

const closeCheckout =
    document.querySelector(".close-checkout");

const checkoutItems =
    document.querySelector(".checkout-items");

const checkoutTotal =
    document.querySelector(".checkout-total strong");


checkoutButton.addEventListener("click", function () {

    if (cart.length === 0) {

        alert("Your cart is empty. Add some food first! 🍔");

        return;

    }


    updateCheckout();

    checkoutOverlay.style.display = "flex";

});


closeCheckout.addEventListener("click", function () {

    checkoutOverlay.style.display = "none";

});


/* UPDATE CHECKOUT */

function updateCheckout() {

    checkoutItems.innerHTML = "";

    let total = 0;


    cart.forEach(function (item) {

        const itemTotal =
            item.price * item.quantity;

        total += itemTotal;


        const checkoutItem =
            document.createElement("div");

        checkoutItem.className =
            "checkout-item";


        checkoutItem.innerHTML = `

            <span>
                ${item.name} × ${item.quantity}
            </span>

            <strong>
                ₹${itemTotal}
            </strong>

        `;


        checkoutItems.appendChild(checkoutItem);

    });


    checkoutTotal.textContent =
        "₹" + total;

}


/* CHECKOUT FORM */

const checkoutForm =
    document.getElementById("checkoutForm");


checkoutForm.addEventListener("submit", function (event) {

    event.preventDefault();


    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;

    }


    const name =
        document.getElementById("customerName").value;


    const payment =
        document.querySelector(
            'input[name="payment"]:checked'
        ).value;


    checkoutOverlay.style.display = "none";

    closeCart();


    alert(
        "🎉 Order placed successfully!\n\n" +
        "Thank you, " + name + "!\n" +
        "Payment: " + payment
    );


    checkoutForm.reset();

    startTracking();

});


/* =====================================================
   ORDER TRACKING
===================================================== */

function startTracking() {

    const steps = [
        document.getElementById("step1"),
        document.getElementById("step2"),
        document.getElementById("step3"),
        document.getElementById("step4")
    ];


    const lines = [
        document.getElementById("line1"),
        document.getElementById("line2"),
        document.getElementById("line3")
    ];


    const times = [
        document.getElementById("time1"),
        document.getElementById("time2"),
        document.getElementById("time3"),
        document.getElementById("time4")
    ];


    const message =
        document.getElementById("trackingMessage");


    steps.forEach(function (step, index) {

        step.classList.remove("active");

        step.classList.remove("completed");

        times[index].textContent = "Waiting";

    });


    lines.forEach(function (line) {

        line.classList.remove("completed");

    });


    steps[0].classList.add("active");

    times[0].textContent = "Just now";

    message.textContent =
        "📋 Your order has been placed!";


    /* PREPARING */

    setTimeout(function () {

        steps[0].classList.remove("active");

        steps[0].classList.add("completed");

        steps[1].classList.add("active");

        lines[0].classList.add("completed");

        times[1].textContent = "Preparing";

        message.textContent =
            "👨‍🍳 Restaurant is preparing your food!";

    }, 4000);


    /* ON THE WAY */

    setTimeout(function () {

        steps[1].classList.remove("active");

        steps[1].classList.add("completed");

        steps[2].classList.add("active");

        lines[1].classList.add("completed");

        times[2].textContent = "On the way";

        message.textContent =
            "🛵 Your order is on the way!";

    }, 8000);


    /* DELIVERED */

    setTimeout(function () {

        steps[2].classList.remove("active");

        steps[2].classList.add("completed");

        steps[3].classList.add("active");

        steps[3].classList.add("completed");

        lines[2].classList.add("completed");

        times[3].textContent = "Delivered";

        message.textContent =
            "🏠 Your order has been delivered! Enjoy your meal!";

    }, 12000);


    document
        .getElementById("tracking")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =====================================================
   LOGIN
===================================================== */

const loginButton =
    document.querySelector(".login-btn");

const loginOverlay =
    document.querySelector(".login-overlay");

const closeLogin =
    document.querySelector(".close-login");


loginButton.addEventListener("click", function () {

    loginOverlay.style.display = "flex";

});


closeLogin.addEventListener("click", function () {

    loginOverlay.style.display = "none";

});


/* LOGIN FORM */

const loginForm =
    document.getElementById("loginForm");


loginForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const email =
        document.getElementById("email").value;


    alert(
        "Welcome back! 👋\n\nLogged in as:\n" +
        email
    );


    loginForm.reset();

    loginOverlay.style.display = "none";

});


/* =====================================================
   SIGN UP
===================================================== */

const signupOverlay =
    document.querySelector(".signup-overlay");

const signupLink =
    document.querySelector(".signup-link");

const closeSignup =
    document.querySelector(".close-signup");

const backToLogin =
    document.querySelector(".back-to-login");


/* OPEN SIGNUP */

signupLink.addEventListener("click", function (event) {

    event.preventDefault();

    loginOverlay.style.display = "none";

    signupOverlay.style.display = "flex";

});


/* CLOSE SIGNUP */

closeSignup.addEventListener("click", function () {

    signupOverlay.style.display = "none";

});


/* BACK TO LOGIN */

backToLogin.addEventListener("click", function (event) {

    event.preventDefault();

    signupOverlay.style.display = "none";

    loginOverlay.style.display = "flex";

});


/* SIGNUP FORM */

const signupForm =
    document.getElementById("signupForm");


signupForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const password =
        document.getElementById("signupPassword").value;


    const confirmPassword =
        document.getElementById("confirmPassword").value;


    if (password !== confirmPassword) {

        alert("Passwords do not match!");

        return;

    }


    alert(
        "🎉 Account created successfully!"
    );


    signupForm.reset();

    signupOverlay.style.display = "none";

});


/* =====================================================
   CATEGORY FILTER
===================================================== */

const categoryCards =
    document.querySelectorAll(".category-card");

const productCards =
    document.querySelectorAll(".product-card");


categoryCards.forEach(function (category) {

    category.addEventListener("click", function () {

        categoryCards.forEach(function (card) {

            card.classList.remove("selected");

        });


        category.classList.add("selected");


        const selectedCategory =
            category.getAttribute("data-category");


        productCards.forEach(function (product) {

            const productCategory =
                product.getAttribute("data-category");


            if (
                selectedCategory === "all" ||
                selectedCategory === productCategory
            ) {

                product.style.display = "block";

            } else {

                product.style.display = "none";

            }

        });


        document
            .getElementById("products")
            .scrollIntoView({
                behavior: "smooth"
            });

    });

});


/* =====================================================
   FOOD SEARCH
===================================================== */

const searchInput =
    document.getElementById("searchInput");

const searchButton =
    document.getElementById("searchButton");


function searchFood() {

    const searchText =
        searchInput.value
            .toLowerCase()
            .trim();


    productCards.forEach(function (product) {

        const productText =
            product.textContent.toLowerCase();


        if (
            searchText === "" ||
            productText.includes(searchText)
        ) {

            product.style.display = "block";

        } else {

            product.style.display = "none";

        }

    });

}


searchButton.addEventListener(
    "click",
    searchFood
);


searchInput.addEventListener(
    "keypress",
    function (event) {

        if (event.key === "Enter") {

            searchFood();

        }

    }
);


/* =====================================================
   HERO SEARCH
===================================================== */

const heroSearchInput =
    document.getElementById("heroSearchInput");

const heroSearchButton =
    document.getElementById("heroSearchButton");


function heroSearch() {

    const searchText =
        heroSearchInput.value
            .toLowerCase()
            .trim();


    searchInput.value = searchText;


    productCards.forEach(function (product) {

        const productText =
            product.textContent.toLowerCase();


        if (
            searchText === "" ||
            productText.includes(searchText)
        ) {

            product.style.display = "block";

        } else {

            product.style.display = "none";

        }

    });


    document
        .getElementById("products")
        .scrollIntoView({
            behavior: "smooth"
        });

}


heroSearchButton.addEventListener(
    "click",
    heroSearch
);


heroSearchInput.addEventListener(
    "keypress",
    function (event) {

        if (event.key === "Enter") {

            heroSearch();

        }

    }
);


/* =====================================================
   LOCATION
===================================================== */

const locationButton =
    document.getElementById("locationButton");

const locationInput =
    document.getElementById("locationInput");


locationButton.addEventListener(
    "click",
    function () {

        if (!navigator.geolocation) {

            alert(
                "Geolocation is not supported by your browser."
            );

            return;

        }


        locationButton.textContent =
            "Getting Location...";


        navigator.geolocation.getCurrentPosition(

            function (position) {

                const latitude =
                    position.coords.latitude;

                const longitude =
                    position.coords.longitude;


                locationInput.value =
                    "📍 Location detected (" +
                    latitude.toFixed(4) +
                    ", " +
                    longitude.toFixed(4) +
                    ")";


                locationButton.textContent =
                    "Location Added ✓";

            },


            function () {

                alert(
                    "Unable to access your location.\nPlease enter your location manually."
                );


                locationButton.textContent =
                    "Use Current Location";

            }

        );

    }
);


/* =====================================================
   OFFER BUTTON
===================================================== */

const offerButton =
    document.querySelector(".offer-button");


offerButton.addEventListener(
    "click",
    function () {

        document
            .getElementById("products")
            .scrollIntoView({
                behavior: "smooth"
            });

    }
);


/* =====================================================
   INITIAL CART
===================================================== */

updateCart();
