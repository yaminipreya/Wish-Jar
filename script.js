const modal = document.getElementById("jarModal");

const createJarBtn = document.getElementById("createJarBtn");
const openJarBtn = document.getElementById("openJarBtn");

const closeModal = document.getElementById("closeModal");

const continueBtn = document.getElementById("continueBtn");

const jarName = document.getElementById("jarName");


function openModal() {
  modal.classList.add("active");
}


function closeJarModal() {
  modal.classList.remove("active");
}


createJarBtn.addEventListener("click", openModal);

openJarBtn.addEventListener("click", openModal);

closeModal.addEventListener("click", closeJarModal);


continueBtn.addEventListener("click", function () {

  const name = jarName.value.trim();

  if (name === "") {
    alert("Please give your little jar a name 💖");
    jarName.focus();
    return;
  }

  alert(
    `Yay! ✨ "${name}" is ready for your beautiful wishes! 🫙💖`
  );

  closeJarModal();

  jarName.value = "";
});


modal.addEventListener("click", function (event) {

  if (event.target === modal) {
    closeJarModal();
  }

});


document.addEventListener("keydown", function (event) {

  if (event.key === "Escape") {
    closeJarModal();
  }

});
