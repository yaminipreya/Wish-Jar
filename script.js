/* =========================
   MOBILE MENU
========================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("mobile-active");

});


/* Close mobile menu after clicking a link */

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("mobile-active");

    });

});


/* =========================
   CREATE JAR
========================= */

const jarModal = document.getElementById("jarModal");

function createJar() {

    jarModal.classList.add("active");

    setTimeout(() => {

        document.getElementById("jarName").focus();

    }, 100);

}


function closeJar() {

    jarModal.classList.remove("active");

}


function startJar() {

    const jarName =
        document.getElementById("jarName").value.trim();

    if (!jarName) {

        alert("Please give your jar a beautiful name ✨");

        return;

    }

    localStorage.setItem("whimsyJarName", jarName);

    closeJar();

    alert(
        `✨ "${jarName}" has been created!\n\nYour magical memory journey begins now.`
    );

}


/* =========================
   LOGIN
========================= */

const loginModal =
    document.getElementById("loginModal");


function openLogin() {

    loginModal.classList.add("active");

}


function closeLogin() {

    loginModal.classList.remove("active");

}


function loginUser() {

    const email =
        document.getElementById("loginEmail").value.trim();

    if (!email) {

        alert("Please enter your email address ✨");

        return;

    }

    alert(
        `Welcome back! ✨\n\nA login link would be sent to ${email}.`
    );

    closeLogin();

}


/* =========================
   CLOSE MODALS
========================= */

window.addEventListener("click", (event) => {

    if (event.target === loginModal) {

        closeLogin();

    }

    if (event.target === jarModal) {

        closeJar();

    }

});


/* =========================
   ESCAPE KEY
========================= */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        closeLogin();
        closeJar();

    }

});


/* =========================
   SCROLL REVEAL
========================= */

const revealElements = document.querySelectorAll(
    ".step, .feature-card, .story-section, .cta-section"
);

const observer = new IntersectionObserver(

    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

            }

        });

    },

    {
        threshold: 0.15
    }

);


revealElements.forEach(element => {

    element.style.opacity = "0";
    element.style.transform = "translateY(25px)";
    element.style.transition = "opacity .7s ease, transform .7s ease";

    observer.observe(element);

});