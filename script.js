/* =========================================================
   MY LITTLE JAR — app logic
   Vanilla JS, no dependencies. State is kept in localStorage
   so a visitor's jar survives a refresh.
   ========================================================= */
(() => {
  "use strict";

  const STORAGE_KEY = "myLittleJar.state.v1";
  const STAR_EMOJIS = ["⭐", "🌟", "✨"];

  /* ---------- state ---------- */
  const defaultState = {
    jarName: "",
    ownerName: "",
    wishes: [] // { text, date, hasPhoto }
  };

  let state = loadState();

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { ...defaultState };
      const parsed = JSON.parse(raw);
      return { ...defaultState, ...parsed };
    } catch {
      return { ...defaultState };
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage unavailable — app still works in-memory */
    }
  }

  /* ---------- ambient background stars ---------- */
  function paintAmbientSky() {
    const sky = document.getElementById("ambientSky");
    const glyphs = ["✦", "✧", "⭐", "☁️"];
    const count = window.innerWidth < 600 ? 10 : 18;
    const frag = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
      const span = document.createElement("span");
      span.textContent = glyphs[i % glyphs.length];
      span.style.left = `${Math.random() * 100}%`;
      span.style.top = `${Math.random() * 100}%`;
      span.style.animationDelay = `${Math.random() * 6}s`;
      span.style.fontSize = `${10 + Math.random() * 14}px`;
      frag.appendChild(span);
    }
    sky.appendChild(frag);
  }

  /* ---------- screen navigation ---------- */
  const screens = Array.from(document.querySelectorAll(".screen"));

  function showScreen(name) {
    screens.forEach((s) => s.classList.toggle("is-active", s.dataset.screen === name));
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (name === "dashboard") renderDashboard();
    if (name === "share") renderShare();
    if (name === "wish") resetWishForm();
  }

  document.querySelectorAll("[data-nav]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const target = el.dataset.nav;

      // guard: dashboard/wish/share/save require a jar to exist
      if (["dashboard", "wish", "share", "save"].includes(target) && !state.jarName) {
        showScreen("create");
        return;
      }
      showScreen(target);

      const scrollId = el.dataset.scroll;
      if (scrollId && target === "welcome") {
        requestAnimationFrame(() => {
          document.getElementById(scrollId)?.scrollIntoView({ behavior: "smooth" });
        });
      }
    });
  });

  /* ---------- 01 · hero jar preview ---------- */
  function renderHeroJar() {
    const wrap = document.getElementById("heroJarStars");
    wrap.innerHTML = "";
    const demoCount = 9;
    for (let i = 0; i < demoCount; i++) {
      const span = document.createElement("span");
      span.className = "star-chip";
      span.textContent = STAR_EMOJIS[i % STAR_EMOJIS.length];
      wrap.appendChild(span);
    }
  }

  /* ---------- 02 · create-jar wizard ---------- */
  const jarNameInput = document.getElementById("jarNameInput");
  const ownerNameInput = document.getElementById("ownerNameInput");
  const wizardPane1 = document.getElementById("wizardPane1");
  const wizardPane2 = document.getElementById("wizardPane2");
  const progressFill = document.getElementById("progressFill");
  const wizardStepNum = document.getElementById("wizardStepNum");

  document.getElementById("btnNextStep").addEventListener("click", () => {
    const name = jarNameInput.value.trim();
    if (!name) {
      jarNameInput.focus();
      jarNameInput.style.borderColor = "var(--pink-deep)";
      return;
    }
    state.jarName = name;
    wizardPane1.classList.add("is-hidden");
    wizardPane2.classList.remove("is-hidden");
    progressFill.style.width = "100%";
    wizardStepNum.textContent = "2";
    ownerNameInput.focus();
  });

  document.getElementById("btnBackStep").addEventListener("click", () => {
    wizardPane2.classList.add("is-hidden");
    wizardPane1.classList.remove("is-hidden");
    progressFill.style.width = "50%";
    wizardStepNum.textContent = "1";
  });

  document.getElementById("btnFinishSetup").addEventListener("click", () => {
    state.ownerName = ownerNameInput.value.trim() || "friend";
    saveState();
    showScreen("dashboard");
  });

  document.getElementById("btnRename").addEventListener("click", () => {
    const newName = prompt("Rename your jar", state.jarName);
    if (newName && newName.trim()) {
      state.jarName = newName.trim();
      saveState();
      renderDashboard();
    }
  });

  /* ---------- 03 · dashboard ---------- */
  const dashJarStars = document.getElementById("dashJarStars");
  const jarEmptyMsg = document.getElementById("jarEmptyMsg");
  const wishList = document.getElementById("wishList");

  function renderDashboard() {
    document.getElementById("dashOwnerName").textContent = state.ownerName || "friend";
    document.getElementById("dashJarName").textContent = state.jarName || "My Happy Little Jar";
    document.getElementById("starCount").textContent = state.wishes.length;

    dashJarStars.innerHTML = "";
    state.wishes.forEach((wish, i) => {
      const span = document.createElement("span");
      span.className = "star-chip";
      span.textContent = STAR_EMOJIS[i % STAR_EMOJIS.length];
      span.title = wish.text.slice(0, 40);
      dashJarStars.appendChild(span);
    });
    jarEmptyMsg.classList.toggle("is-hidden", state.wishes.length > 0);

    wishList.innerHTML = "";
    state.wishes
      .slice()
      .reverse()
      .forEach((wish) => {
        const li = document.createElement("li");
        const dateLabel = wish.date
          ? new Date(wish.date).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })
          : "";
        li.innerHTML = `
          <span class="wish-star">⭐</span>
          <span>
            ${escapeHtml(wish.text)}
            ${dateLabel || wish.hasPhoto ? `<span class="wish-date">${[dateLabel, wish.hasPhoto ? "📷 photo attached" : ""].filter(Boolean).join(" · ")}</span>` : ""}
          </span>
        `;
        wishList.appendChild(li);
      });
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  document.getElementById("btnAddStar").addEventListener("click", () => showScreen("wish"));

  /* ---------- 04 · add a wish ---------- */
  const wishTextarea = document.getElementById("wishTextarea");
  const charCount = document.getElementById("charCount");
  const btnAddPhotoNote = document.getElementById("btnAddPhotoNote");
  const btnChooseDate = document.getElementById("btnChooseDate");
  const wishMetaReadout = document.getElementById("wishMetaReadout");
  const foldOverlay = document.getElementById("foldOverlay");

  let pendingPhoto = false;
  let pendingDate = "";

  function resetWishForm() {
    wishTextarea.value = "";
    charCount.textContent = "0";
    pendingPhoto = false;
    pendingDate = "";
    btnAddPhotoNote.classList.remove("is-active");
    btnChooseDate.classList.remove("is-active");
    updateMetaReadout();
    wishTextarea.focus();
  }

  wishTextarea.addEventListener("input", () => {
    charCount.textContent = String(wishTextarea.value.length);
  });

  btnAddPhotoNote.addEventListener("click", () => {
    pendingPhoto = !pendingPhoto;
    btnAddPhotoNote.classList.toggle("is-active", pendingPhoto);
    updateMetaReadout();
  });

  btnChooseDate.addEventListener("click", () => {
    const input = prompt("Choose a date for this wish (e.g. 2027-01-01):", pendingDate || "");
    if (input === null) return;
    pendingDate = input.trim();
    btnChooseDate.classList.toggle("is-active", Boolean(pendingDate));
    updateMetaReadout();
  });

  function updateMetaReadout() {
    const bits = [];
    if (pendingDate) bits.push(`📅 ${pendingDate}`);
    if (pendingPhoto) bits.push("📷 photo attached");
    wishMetaReadout.textContent = bits.join("   ");
  }

  document.getElementById("btnFoldNote").addEventListener("click", () => {
    const text = wishTextarea.value.trim();
    if (!text) {
      wishTextarea.focus();
      wishTextarea.style.borderColor = "var(--pink-deep)";
      return;
    }

    state.wishes.push({
      text,
      date: pendingDate || null,
      hasPhoto: pendingPhoto
    });
    saveState();

    foldOverlay.classList.add("is-active");
    // restart the CSS animations each time
    foldOverlay.querySelectorAll(".fold-emoji").forEach((el) => {
      el.style.animation = "none";
      // eslint-disable-next-line no-unused-expressions
      el.offsetHeight;
      el.style.animation = "";
    });

    setTimeout(() => {
      foldOverlay.classList.remove("is-active");
      showScreen("dashboard");
    }, 1700);
  });

  /* ---------- 05 · share ---------- */
  function renderShare() {
    const slug = (state.jarName || "my-jar")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    const link = `mylittlejar.com/${state.ownerName ? state.ownerName.toLowerCase() : slug}`;
    document.getElementById("shareLinkInput").value = link;
    document.getElementById("copyConfirm").textContent = "";
  }

  document.getElementById("btnCopyLink").addEventListener("click", async () => {
    const input = document.getElementById("shareLinkInput");
    const confirmEl = document.getElementById("copyConfirm");
    try {
      await navigator.clipboard.writeText(input.value);
    } catch {
      input.select();
      document.execCommand("copy");
    }
    confirmEl.textContent = "Link copied! 💕";
    setTimeout(() => (confirmEl.textContent = ""), 2500);
  });

  document.querySelectorAll(".share-icon").forEach((btn) => {
    btn.addEventListener("click", () => {
      const confirmEl = document.getElementById("copyConfirm");
      confirmEl.textContent = `Opens ${btn.title.replace("Share via ", "").replace("More options", "more options")} — coming soon ✨`;
      setTimeout(() => (confirmEl.textContent = ""), 2500);
    });
  });

  /* ---------- 06 · save ---------- */
  const saveCard = document.getElementById("saveCard");
  const saveSuccess = document.getElementById("saveSuccess");
  const emailInput = document.getElementById("emailInput");

  document.getElementById("btnSaveJar").addEventListener("click", () => {
    const email = emailInput.value.trim();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValid) {
      emailInput.focus();
      emailInput.style.borderColor = "var(--pink-deep)";
      return;
    }
    document.getElementById("savedJarName").textContent = state.jarName || "your jar";
    document.getElementById("savedEmail").textContent = email;
    saveCard.classList.add("is-hidden");
    saveSuccess.classList.remove("is-hidden");
  });

  /* ---------- init ---------- */
  function init() {
    paintAmbientSky();
    renderHeroJar();

    if (state.jarName) {
      jarNameInput.value = state.jarName;
      ownerNameInput.value = state.ownerName;
      showScreen("dashboard");
    } else {
      showScreen("welcome");
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();
