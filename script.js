const root = document.documentElement;
const menuButton = document.querySelector(".menu-button");
const navLinks = document.querySelector(".nav-links");
const cvCounter = document.querySelector("#cvDownloads");
const linkedinCounter = document.querySelector("#linkedinClicks");
const cvLinks = document.querySelectorAll(".js-cv-download");
const linkedinLinks = document.querySelectorAll(".js-linkedin-click");
const tabButtons = document.querySelectorAll(".tab-button");
const tabPanels = document.querySelectorAll(".tab-panel");

root.classList.remove("light");

function getCounter(key) {
  return Number(localStorage.getItem(key) || "0");
}

function setCounter(key, value) {
  localStorage.setItem(key, String(value));
}

function updateCounters() {
  cvCounter.textContent = String(getCounter("cvDownloads"));
  linkedinCounter.textContent = String(getCounter("linkedinClicks"));
}

function incrementCounter(key) {
  setCounter(key, getCounter(key) + 1);
  updateCounters();
}

updateCounters();

menuButton.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

cvLinks.forEach((link) => {
  link.addEventListener("click", () => incrementCounter("cvDownloads"));
});

linkedinLinks.forEach((link) => {
  link.addEventListener("click", () => incrementCounter("linkedinClicks"));
});

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedTab = button.dataset.tab;

    tabButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("active", isActive);
      item.setAttribute("aria-selected", String(isActive));
    });

    tabPanels.forEach((panel) => {
      panel.classList.toggle("active", panel.dataset.panel === selectedTab);
    });
  });
});
