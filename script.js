/* =====================================================
   FOOD EXPRESS JAVASCRIPT
===================================================== */


/* =====================================================
   CART
===================================================== */

let cart = [];


const cartButton =
    document.querySelector(".cart-btn");

const cartPanel =
    document.querySelector(".cart-panel");

const cartOverlay =
    document.querySelector(".cart-overlay");

const closeCartButton =
    document.querySelector(".close-cart");

const cartItemsContainer =
    document.querySelector(".cart-items");

const cartTotal =
    document.querySelector(".cart-total strong");

const addButtons =
    document.querySelectorAll(".add-cart");



/* =====================================================
   ADD FOOD TO CART
===================================================== */

addButtons.forEach(function(button) {

    button.addEventListener("click", function() {


        const product =
            button.closest(".product-card");


        const name =
            product.querySelector("h3")
            .textContent
            .trim();


        const price =
            parseInt(
                product.querySelector(
                    ".product-bottom strong"
                ).textContent.replace("₹", "")
            );


        const image =
            product.querySelector(
                ".food-image"
            ).textContent.trim();



        const existingProduct =
            cart.find(function(item) {

                return item.name === name;

            });



        if (existingProduct) {

            existingProduct.quantity++;

        } else {

            cart.push({

                name: name,

                price: price,

                image: image,

                quantity: 1

            });

        }


        updateCart();

        openCart();

    });

});



/* =====================================================
   UPDATE CART
===================================================== */

function updateCart() {

    cartItemsContainer.innerHTML = "";

    let total = 0;

    let totalItems = 0;


    if (cart.length === 0) {

        cartItemsContainer.innerHTML = `

            <p class="empty-cart">
                Your cart is empty.
            </p>

        `;

    }


    cart.forEach(function(item, index) {


        const subtotal =
            item.price * item.quantity;


        total += subtotal;

        totalItems += item.quantity;



        const cartItem =
            document.createElement("div");


        cartItem.className =
            "cart-item";


        cartItem.innerHTML = `

            <div class="cart-item-image">
                ${item.image}
            </div>


            <div class="cart-item-info">

                <h4>
                    ${item.name}
                </h4>

                <p>
                    ₹${item.price} each
                </p>


                <div class="quantity-controls">

                    <button
                        class="quantity-minus"
                        data-index="${index}">
                        −
                    </button>


                    <span>
                        ${item.quantity}
                    </span>


                    <button
                        class="quantity-plus"
                        data-index="${index}">
                        +
                    </button>

                </div>


                <strong class="item-subtotal">
                    ₹${subtotal}
                </strong>

            </div>


            <button
                class="remove-item"
                data-index="${index}">

                ✕

            </button>

        `;


        cartItemsContainer.appendChild(cartItem);

    });


    cartButton.textContent =
        `🛒 Cart (${totalItems})`;


    cartTotal.textContent =
        `₹${total}`;


    addQuantityEvents();

}



/* =====================================================
   CART QUANTITY
===================================================== */

function addQuantityEvents() {


    document
        .querySelectorAll(".quantity-minus")
        .forEach(function(button) {


            button.addEventListener(
                "click",
                function() {


                    const index =
                        parseInt(
                            button.dataset.index
                        );


                    if (
                        cart[index].quantity > 1
                    ) {

                        cart[index].quantity--;

                    } else {

                        cart.splice(index, 1);

                    }


                    updateCart();

                }
            );

        });



    document
        .querySelectorAll(".quantity-plus")
        .forEach(function(button) {


            button.addEventListener(
                "click",
                function() {


                    const index =
                        parseInt(
                            button.dataset.index
                        );


                    cart[index].quantity++;


                    updateCart();

                }
            );

        });



    document
        .querySelectorAll(".remove-item")
        .forEach(function(button) {


            button.addEventListener(
                "click",
                function() {


                    const index =
                        parseInt(
                            button.dataset.index
                        );


                    cart.splice(index, 1);


                    updateCart();

                }
            );

        });

}



/* =====================================================
   CART OPEN / CLOSE
===================================================== */

function openCart() {

    cartPanel.classList.add("active");

    cartOverlay.classList.add("active");

}


function closeCart() {

    cartPanel.classList.remove("active");

    cartOverlay.classList.remove("active");

}


cartButton.addEventListener(
    "click",
    openCart
);


closeCartButton.addEventListener(
    "click",
    closeCart
);


cartOverlay.addEventListener(
    "click",
    closeCart
);



/* =====================================================
   LOGIN
===================================================== */

const loginButton =
    document.querySelector(".login-btn");

const loginOverlay =
    document.querySelector(".login-overlay");

const closeLoginButton =
    document.querySelector(".close-login");

const loginForm =
    document.querySelector("#loginForm");



loginButton.addEventListener(
    "click",
    function() {

        loginOverlay.classList.add("active");

    }
);


closeLoginButton.addEventListener(
    "click",
    function() {

        loginOverlay.classList.remove("active");

    }
);


loginOverlay.addEventListener(
    "click",
    function(event) {

        if (event.target === loginOverlay) {

            loginOverlay.classList.remove(
                "active"
            );

        }

    }
);



loginForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const email =
            document.querySelector("#email")
            .value
            .trim();


        const password =
            document.querySelector("#password")
            .value;


        const savedUser =
            localStorage.getItem(
                "foodExpressUser"
            );


        if (!savedUser) {

            alert(
                "No account found. Please sign up first."
            );

            return;

        }


        const user =
            JSON.parse(savedUser);


        if (
            email === user.email &&
            password === user.password
        ) {

            alert(
                "Login successful! 🎉\n\n" +
                "Welcome, " +
                user.name +
                "!"
            );


            loginOverlay.classList.remove(
                "active"
            );


            loginForm.reset();

        } else {

            alert(
                "Incorrect email or password! ❌"
            );

        }

    }
);



/* =====================================================
   SIGN UP
===================================================== */

const signupLink =
    document.querySelector(".signup-link");

const signupOverlay =
    document.querySelector(".signup-overlay");

const closeSignupButton =
    document.querySelector(".close-signup");

const signupForm =
    document.querySelector("#signupForm");

const backToLogin =
    document.querySelector(".back-to-login");



signupLink.addEventListener(
    "click",
    function(event) {

        event.preventDefault();

        loginOverlay.classList.remove(
            "active"
        );

        signupOverlay.classList.add(
            "active"
        );

    }
);


closeSignupButton.addEventListener(
    "click",
    function() {

        signupOverlay.classList.remove(
            "active"
        );

    }
);


signupOverlay.addEventListener(
    "click",
    function(event) {

        if (event.target === signupOverlay) {

            signupOverlay.classList.remove(
                "active"
            );

        }

    }
);



signupForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const name =
            document.querySelector("#signupName")
            .value
            .trim();


        const email =
            document.querySelector("#signupEmail")
            .value
            .trim();


        const password =
            document.querySelector("#signupPassword")
            .value;


        const confirmPassword =
            document.querySelector("#confirmPassword")
            .value;


        if (
            password !== confirmPassword
        ) {

            alert(
                "Passwords do not match! ❌"
            );

            return;

        }


        const existingUser =
            localStorage.getItem(
                "foodExpressUser"
            );


        if (existingUser) {

            const user =
                JSON.parse(existingUser);


            if (user.email === email) {

                alert(
                    "An account with this email already exists! ❌"
                );

                return;

            }

        }


        const user = {

            name: name,

            email: email,

            password: password

        };


        localStorage.setItem(
            "foodExpressUser",
            JSON.stringify(user)
        );


        alert(
            "Account created successfully! 🎉"
        );


        signupForm.reset();


        signupOverlay.classList.remove(
            "active"
        );


        loginOverlay.classList.add(
            "active"
        );

    }
);



backToLogin.addEventListener(
    "click",
    function(event) {

        event.preventDefault();


        signupOverlay.classList.remove(
            "active"
        );


        loginOverlay.classList.add(
            "active"
        );

    }
);



/* =====================================================
   SEARCH
===================================================== */

const searchInput =
    document.querySelector("#searchInput");

const searchButton =
    document.querySelector("#searchButton");

const productCards =
    document.querySelectorAll(".product-card");

const restaurantCards =
    document.querySelectorAll(".restaurant-card");



function searchFood() {


    const searchText =
        searchInput.value
        .toLowerCase()
        .trim();



    productCards.forEach(function(card) {


        const cardText =
            card.textContent.toLowerCase();


        if (
            cardText.includes(searchText)
        ) {

            card.classList.remove(
                "hide-food"
            );

        } else {

            card.classList.add(
                "hide-food"
            );

        }

    });



    restaurantCards.forEach(function(card) {


        const cardText =
            card.textContent.toLowerCase();


        if (
            cardText.includes(searchText)
        ) {

            card.style.display = "";

        } else {

            card.style.display = "none";

        }

    });

}


searchButton.addEventListener(
    "click",
    searchFood
);


searchInput.addEventListener(
    "input",
    searchFood
);



/* =====================================================
   CATEGORY FILTER
===================================================== */

const categoryCards =
    document.querySelectorAll(".category-card");


categoryCards.forEach(function(categoryCard) {


    categoryCard.addEventListener(
        "click",
        function() {


            const selectedCategory =
                categoryCard.dataset.category;


            categoryCards.forEach(
                function(card) {

                    card.classList.remove(
                        "selected"
                    );

                }
            );


            categoryCard.classList.add(
                "selected"
            );


            productCards.forEach(
                function(foodCard) {


                    const foodCategory =
                        foodCard.dataset.category;


                    if (
                        selectedCategory === "all" ||
                        foodCategory === selectedCategory
                    ) {

                        foodCard.classList.remove(
                            "hide-food"
                        );

                    } else {

                        foodCard.classList.add(
                            "hide-food"
                        );

                    }

                }
            );


            document
                .querySelector("#products")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }
    );

});



/* =====================================================
   CHECKOUT
===================================================== */

const checkoutButton =
    document.querySelector(".checkout-btn");

const checkoutOverlay =
    document.querySelector(".checkout-overlay");

const closeCheckoutButton =
    document.querySelector(".close-checkout");

const checkoutForm =
    document.querySelector("#checkoutForm");

const checkoutItems =
    document.querySelector(".checkout-items");

const checkoutTotal =
    document.querySelector(
        ".checkout-total strong"
    );



checkoutButton.addEventListener(
    "click",
    function() {


        if (cart.length === 0) {

            alert(
                "Your cart is empty! 🛒"
            );

            return;

        }


        updateCheckout();


        closeCart();


        checkoutOverlay.classList.add(
            "active"
        );

    }
);



/* =====================================================
   UPDATE CHECKOUT
===================================================== */

function updateCheckout() {


    checkoutItems.innerHTML = "";

    let total = 0;


    cart.forEach(function(item) {


        const subtotal =
            item.price * item.quantity;


        total += subtotal;


        const checkoutItem =
            document.createElement("div");


        checkoutItem.className =
            "checkout-item";


        checkoutItem.innerHTML = `

            <div>

                <div class="checkout-item-name">

                    ${item.image}
                    ${item.name}

                </div>


                <div class="checkout-item-quantity">

                    Quantity:
                    ${item.quantity}

                </div>

            </div>


            <div class="checkout-item-price">

                ₹${subtotal}

            </div>

        `;


        checkoutItems.appendChild(
            checkoutItem
        );

    });


    checkoutTotal.textContent =
        `₹${total}`;

}



/* CLOSE CHECKOUT */

closeCheckoutButton.addEventListener(
    "click",
    function() {

        checkoutOverlay.classList.remove(
            "active"
        );

    }
);


checkoutOverlay.addEventListener(
    "click",
    function(event) {

        if (
            event.target === checkoutOverlay
        ) {

            checkoutOverlay.classList.remove(
                "active"
            );

        }

    }
);



/* =====================================================
   PLACE ORDER
===================================================== */

checkoutForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const name =
            document.querySelector(
                "#customerName"
            ).value.trim();


        const phone =
            document.querySelector(
                "#customerPhone"
            ).value.trim();


        const city =
            document.querySelector(
                "#city"
            ).value.trim();


        const payment =
            document.querySelector(
                'input[name="payment"]:checked'
            ).value;



        alert(

            "🎉 Order placed successfully!\n\n" +

            "Customer: " +
            name +
            "\n" +

            "Phone: " +
            phone +
            "\n" +

            "City: " +
            city +
            "\n" +

            "Payment: " +
            payment +
            "\n\n" +

            "Your food is being prepared! 🛵"

        );


        /* START TRACKING */

        startOrderTracking();


        /* CLEAR CART */

        cart = [];

        updateCart();


        /* CLOSE CHECKOUT */

        checkoutOverlay.classList.remove(
            "active"
        );


        checkoutForm.reset();


        /* SHOW TRACKING */

        document
            .querySelector("#tracking")
            .scrollIntoView({
                behavior: "smooth"
            });

    }
);



/* =====================================================
   ORDER TRACKING
===================================================== */

let trackingTimers = [];


function startOrderTracking() {


    /* CLEAR OLD TIMERS */

    trackingTimers.forEach(
        function(timer) {

            clearTimeout(timer);

        }
    );


    trackingTimers = [];



    const steps = [

        document.querySelector("#step1"),

        document.querySelector("#step2"),

        document.querySelector("#step3"),

        document.querySelector("#step4")

    ];


    const lines = [

        document.querySelector("#line1"),

        document.querySelector("#line2"),

        document.querySelector("#line3")

    ];


    const times = [

        document.querySelector("#time1"),

        document.querySelector("#time2"),

        document.querySelector("#time3"),

        document.querySelector("#time4")

    ];


    const message =
        document.querySelector(
            "#trackingMessage"
        );



    /* RESET */

    steps.forEach(function(step) {

        step.classList.remove(
            "active",
            "completed"
        );

    });


    lines.forEach(function(line) {

        line.classList.remove(
            "completed"
        );

    });



    times[0].textContent =
        "Completed ✓";

    times[1].textContent =
        "Waiting";

    times[2].textContent =
        "Waiting";

    times[3].textContent =
        "Waiting";



    /* STEP 1 */

    steps[0].classList.add(
        "active"
    );


    message.textContent =
        "📋 Your order has been placed!";



    /* STEP 2 */

    trackingTimers.push(

        setTimeout(function() {


            steps[0].classList.remove(
                "active"
            );

            steps[0].classList.add(
                "completed"
            );


            lines[0].classList.add(
                "completed"
            );


            steps[1].classList.add(
                "active"
            );


            times[1].textContent =
                "Preparing now...";


            message.textContent =
                "👨‍🍳 Your food is being prepared!";


        }, 5000)

    );



    /* STEP 3 */

    trackingTimers.push(

        setTimeout(function() {


            steps[1].classList.remove(
                "active"
            );

            steps[1].classList.add(
                "completed"
            );


            lines[1].classList.add(
                "completed"
            );


            steps[2].classList.add(
                "active"
            );


            times[2].textContent =
                "Delivery partner is on the way";


            message.textContent =
                "🛵 Your food is on the way!";


        }, 10000)

    );



    /* STEP 4 */

    trackingTimers.push(

        setTimeout(function() {


            steps[2].classList.remove(
                "active"
            );

            steps[2].classList.add(
                "completed"
            );


            lines[2].classList.add(
                "completed"
            );


            steps[3].classList.add(
                "active",
                "completed"
            );


            times[3].textContent =
                "Delivered ✓";


            message.textContent =
                "🏠 Your order has been delivered! Enjoy your meal! 😋";


        }, 15000)

    );

}



/* =====================================================
   OFFER BUTTON
===================================================== */

const offerButton =
    document.querySelector(".offer-button");


offerButton.addEventListener(
    "click",
    function() {

        document
            .querySelector("#products")
            .scrollIntoView({
                behavior: "smooth"
            });

    }
);



/* =====================================================
   START
===================================================== */

updateCart();


console.log(
    "FoodExpress is working correctly! ✅"
);