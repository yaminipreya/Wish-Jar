let stars = 6;


/* CREATE JAR */

function openCreateJar() {
  document.getElementById("createModal").classList.add("active");
}

function closeCreateJar() {
  document.getElementById("createModal").classList.remove("active");
}

function createJar() {

  const jarName = document.getElementById("jarName").value;

  if (jarName.trim() === "") {
    alert("Please give your little jar a name 💖");
    return;
  }

  document.getElementById("displayJarName").innerText = jarName;

  closeCreateJar();

  document
    .getElementById("dashboard")
    .scrollIntoView({
      behavior: "smooth"
    });
}


/* ADD WISH */

function openWishModal() {
  document.getElementById("wishModal").classList.add("active");
}

function closeWishModal() {
  document.getElementById("wishModal").classList.remove("active");
}

function addWish() {

  const wish = document.getElementById("wishText").value;

  if (wish.trim() === "") {
    alert("Write a little wish first ✨");
    return;
  }

  stars++;

  document.getElementById("starCount").innerText = stars;

  const starsContainer =
    document.getElementById("starsContainer");

  const newStar = document.createElement("span");

  newStar.innerHTML = " ⭐ ";

  newStar.style.animation = "float 2s infinite ease-in-out";

  starsContainer.appendChild(newStar);

  document.getElementById("wishText").value = "";

  closeWishModal();

  setTimeout(() => {
    alert("Your wish has become a little star ⭐💖");
  }, 300);

}


/* SHARE */

function shareJar() {
  document.getElementById("shareModal").classList.add("active");
}

function closeShare() {
  document.getElementById("shareModal").classList.remove("active");
}

function copyLink() {

  const link =
    document.getElementById("shareLink");

  link.select();

  navigator.clipboard.writeText(link.value);

  alert("Your Little Jar link has been copied! 💌✨");
}


/* SAVE */

function saveJar() {
  document.getElementById("saveModal").classList.add("active");
}

function closeSave() {
  document.getElementById("saveModal").classList.remove("active");
}

function saveEmail() {

  const email =
    document.getElementById("email").value;

  if (!email.includes("@")) {
    alert("Please enter a valid email 💌");
    return;
  }

  alert(
    "Your Little Jar is safe! 🫙💖\nThank you for saving your memories."
  );

  closeSave();

}


/* CLOSE MODAL WHEN CLICKING OUTSIDE */

window.onclick = function(event) {

  const modals =
    document.querySelectorAll(".modal");

  modals.forEach((modal) => {

    if (event.target === modal) {
      modal.classList.remove("active");
    }

  });

};
