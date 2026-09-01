/* =========================
   ELEMENTS
========================= */

const createButtons =
  document.querySelectorAll(".createJar");

const jarModal =
  document.getElementById("jarModal");

const closeModal =
  document.getElementById("closeModal");

const createJarButton =
  document.getElementById("createJarButton");

const jarName =
  document.getElementById("jarName");

const toast =
  document.getElementById("toast");

const addWish =
  document.getElementById("addWish");

const wishDate =
  document.getElementById("wishDate");

const savedWishText =
  document.getElementById("savedWishText");

const stars =
  document.querySelectorAll(".click-star");

const viewWishes =
  document.getElementById("viewWishes");


/* =========================
   SET TODAY'S DATE
========================= */

const today = new Date();

const formattedDate =
  today.toISOString().split("T")[0];

wishDate.value = formattedDate;


/* =========================
   OPEN CREATE JAR MODAL
========================= */

createButtons.forEach(button => {

  button.addEventListener("click", () => {

    jarModal.classList.add("show");

  });

});


/* =========================
   CLOSE MODAL
========================= */

closeModal.addEventListener("click", () => {

  jarModal.classList.remove("show");

});


/* =========================
   CREATE JAR
========================= */

createJarButton.addEventListener("click", () => {

  const name =
    jarName.value.trim();


  if (name === "") {

    jarName.focus();

    return;

  }


  /* Save jar name */

  localStorage.setItem(
    "wishJarName",
    name
  );


  jarModal.classList.remove("show");


  showToast(
    "🐰✨ Yay! Your magical jar is ready!"
  );


});


/* =========================
   ADD WISH
========================= */

addWish.addEventListener("click", () => {

  showToast(
    "💌✨ Your wish is turning into magic..."
  );


  setTimeout(() => {

    showToast(
      "⭐ Your wish safely reached the magical jar!"
    );

  }, 1200);

});


/* =========================
   CLICK STAR
========================= */

stars.forEach(star => {

  star.addEventListener("click", () => {

    const wish =
      star.dataset.wish;


    savedWishText.textContent =
      wish;


    showToast(
      "🐰💗 Your magical memory is open!"
    );

  });

});


/* =========================
   VIEW WISHES
========================= */

viewWishes.addEventListener("click", () => {

  document
    .querySelector(".small-jar")
    .scrollIntoView({

      behavior: "smooth",
      block: "center"

    });

});


/* =========================
   TOAST FUNCTION
========================= */

function showToast(message) {

  toast.textContent = message;

  toast.classList.add("show");


  setTimeout(() => {

    toast.classList.remove("show");

  }, 3000);

}


/* =========================
   CLOSE MODAL OUTSIDE
========================= */

window.addEventListener("click", event => {

  if (event.target === jarModal) {

    jarModal.classList.remove("show");

  }

});


/* =========================
   ESCAPE KEY
========================= */

document.addEventListener("keydown", event => {

  if (event.key === "Escape") {

    jarModal.classList.remove("show");

  }

});