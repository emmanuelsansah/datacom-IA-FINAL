document.documentElement.classList.add("js-enhanced");

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll(".site-nav a");
const revealItems = document.querySelectorAll(".reveal");
const sections = document.querySelectorAll("main section[id]");
const videoButtons = document.querySelectorAll(".video-trigger");
const videoPlayer = document.querySelector("#video-player");
const videoBox = document.querySelector("#video-box");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (nav && nav.classList.contains("is-open")) {
      nav.classList.remove("is-open");
      menuToggle?.setAttribute("aria-expanded", "false");
    }
  });
});

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  {
    threshold: 0.18,
    rootMargin: "0px 0px -40px 0px"
  }
);

revealItems.forEach((item) => sectionObserver.observe(item));

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      navLinks.forEach((link) => {
        const isMatch = link.getAttribute("href") === `#${entry.target.id}`;
        link.classList.toggle("is-active", isMatch);
      });
    });
  },
  {
    threshold: 0.45
  }
);

sections.forEach((section) => navObserver.observe(section));

const embedVideo = (videoId) => {
  if (!videoPlayer || !videoId) {
    return;
  }

  videoPlayer.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
  videoBox?.scrollIntoView({ behavior: "smooth", block: "center" });
};

videoButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const videoId = button.getAttribute("data-video-id");
    embedVideo(videoId);
  });
});
