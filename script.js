/* =====================================
   SELECT ELEMENTS
===================================== */

const startWishBtn = document.getElementById("startWishBtn");
const createJarBtn = document.getElementById("createJarBtn");

const stepOne = document.getElementById("stepOne");
const stepTwo = document.getElementById("stepTwo");
const stepThree = document.getElementById("stepThree");

const nextButtons = document.querySelectorAll(".next-btn");

const jarName = document.getElementById("jarName");
const wishText = document.getElementById("wishText");

const progressSteps = document.querySelectorAll(".progress-step");

const wishesGrid = document.getElementById("wishesGrid");

const addWishBtn = document.getElementById("addWishBtn");

const copyLinkBtn = document.getElementById("copyLinkBtn");

const shareLink = document.getElementById("shareLink");

const saveJarBtn = document.getElementById("saveJarBtn");

const emailInput = document.getElementById("emailInput");

const notification = document.getElementById("notification");

const mobileAddBtn = document.getElementById("mobileAddBtn");


/* =====================================
   SCROLL TO CREATE JAR
===================================== */

function scrollToCreateJar() {

    document
        .getElementById("my-jar")
        .scrollIntoView({
            behavior: "smooth"
        });

}


startWishBtn.addEventListener(
    "click",
    scrollToCreateJar
);


createJarBtn.addEventListener(
    "click",
    scrollToCreateJar
);


mobileAddBtn.addEventListener(
    "click",
    scrollToCreateJar
);


/* =====================================
   FORM STEPS
===================================== */

function showStep(stepNumber) {

    // Remove active state

    stepOne.classList.remove("active-step");
    stepTwo.classList.remove("active-step");
    stepThree.classList.remove("active-step");


    // Reset progress

    progressSteps.forEach(step => {

        step.classList.remove("active");

    });


    // Show selected step

    if (stepNumber === 1) {

        stepOne.classList.add("active-step");

        progressSteps[0].classList.add("active");

    }


    if (stepNumber === 2) {

        stepTwo.classList.add("active-step");

        progressSteps[0].classList.add("active");
        progressSteps[1].classList.add("active");

    }


    if (stepNumber === 3) {

        stepThree.classList.add("active-step");

        progressSteps[0].classList.add("active");
        progressSteps[1].classList.add("active");
        progressSteps[2].classList.add("active");

    }

}


/* =====================================
   STEP 1 → STEP 2
===================================== */

nextButtons[0].addEventListener("click", function () {

    const name = jarName.value.trim();

    if (name === "") {

        showNotification(
            "🫙 Please give your jar a beautiful name!"
        );

        jarName.focus();

        return;

    }


    showStep(2);

});


/* =====================================
   STEP 2 → STEP 3
===================================== */

nextButtons[1].addEventListener("click", function () {

    const wish = wishText.value.trim();

    if (wish === "") {

        showNotification(
            "💌 Write your beautiful wish first!"
        );

        wishText.focus();

        return;

    }


    saveWish(wish);

    showStep(3);

});


/* =====================================
   SAVE WISH
===================================== */

function saveWish(wish) {

    const colors = [
        "pink-wish",
        "purple-wish",
        "yellow-wish"
    ];


    const randomColor =
        colors[
            Math.floor(
                Math.random() * colors.length
            )
        ];


    const wishCard =
        document.createElement("div");


    wishCard.className =
        `wish-card ${randomColor}`;


    wishCard.innerHTML = `

        <span class="wish-fold">
            ✦
        </span>

        <h3>
            My New Wish
        </h3>

        <p>
            ${escapeHTML(wish)}
        </p>

    `;


    wishesGrid.prepend(wishCard);

}


/* =====================================
   ESCAPE HTML
===================================== */

function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


/* =====================================
   VIEW MY JAR
===================================== */

document
    .getElementById("viewJarBtn")
    .addEventListener(
        "click",
        function () {

            document
                .querySelector(".wishes-section")
                .scrollIntoView({
                    behavior: "smooth"
                });


            showNotification(
                "✨ Welcome to your magical jar!"
            );

        }
    );


/* =====================================
   ADD NEW WISH
===================================== */

addWishBtn.addEventListener(
    "click",
    function () {

        showStep(2);

        document
            .getElementById("my-jar")
            .scrollIntoView({
                behavior: "smooth"
            });

    }
);


/* =====================================
   COPY LINK
===================================== */

copyLinkBtn.addEventListener(
    "click",
    function () {

        navigator.clipboard
            .writeText(shareLink.value)
            .then(() => {

                copyLinkBtn.textContent =
                    "Copied! ✨";


                showNotification(
                    "🔗 Magical link copied!"
                );


                setTimeout(() => {

                    copyLinkBtn.textContent =
                        "Copy Link ✨";

                }, 2000);

            });

    }
);


/* =====================================
   SAVE EMAIL
===================================== */

saveJarBtn.addEventListener(
    "click",
    function () {

        const email =
            emailInput.value.trim();


        if (email === "") {

            showNotification(
                "💌 Please enter your email!"
            );

            return;

        }


        if (!validateEmail(email)) {

            showNotification(
                "⚠️ Please enter a valid email!"
            );

            return;

        }


        showNotification(
            "⭐ Your magical jar has been saved!"
        );


        emailInput.value = "";

    }
);


/* =====================================
   EMAIL VALIDATION
===================================== */

function validateEmail(email) {

    const pattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    return pattern.test(email);

}


/* =====================================
   NOTIFICATION
===================================== */

function showNotification(message) {

    notification.textContent = message;

    notification.classList.add("show");


    setTimeout(() => {

        notification.classList.remove("show");

    }, 3000);

}


/* =====================================
   FLOATING PAPER EFFECT
===================================== */

const papers =
    document.querySelectorAll(".origami");


papers.forEach((paper, index) => {

    paper.style.animation =
        `paperFloat ${3 + index}s ease-in-out infinite alternate`;

});


/* Add animation dynamically */

const style =
    document.createElement("style");


style.innerHTML = `

    @keyframes paperFloat {

        from {
            transform:
                translateY(0)
                rotate(0deg);
        }

        to {
            transform:
                translateY(-12px)
                rotate(8deg);
        }

    }

`;


document.head.appendChild(style);
