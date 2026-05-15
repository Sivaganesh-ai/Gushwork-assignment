
// =========================================================
// DOM LOADED
// =========================================================

document.addEventListener("DOMContentLoaded", () => {

  // =========================================================
  // STICKY HEADER
  // =========================================================

  const stickyHeader = document.querySelector(".sticky-header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 120) {
      stickyHeader?.classList.add("active");
    } else {
      stickyHeader?.classList.remove("active");
    }
  });

  // =========================================================
  // MODAL FUNCTIONALITY
  // =========================================================

  const modals = document.querySelectorAll(".modal");

  document.querySelectorAll("[data-modal]").forEach((button) => {
    button.addEventListener("click", () => {
      const modalId = button.getAttribute("data-modal");
      const modal = document.getElementById(modalId);

      if (modal) {
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
      }
    });
  });

  document.querySelectorAll("[data-close]").forEach((element) => {
    element.addEventListener("click", () => {
      const modal = element.closest(".modal");

      if (modal) {
        modal.classList.remove("active");
        document.body.style.overflow = "auto";
      }
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      modals.forEach((modal) => {
        modal.classList.remove("active");
      });

      document.body.style.overflow = "auto";
    }
  });

  // =========================================================
  // FORM SUBMIT
  // =========================================================

  document.querySelectorAll(".callback-form").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      alert("Thank you! We will contact you shortly.");

      form.reset();

      const modal = form.closest(".modal");

      if (modal) {
        modal.classList.remove("active");
      }

      document.body.style.overflow = "auto";
    });
  });

  // =========================================================
  // HERO IMAGE GALLERY
  // =========================================================

  const mainImage = document.querySelector(".main-hero-image");

  const heroPrevBtn = document.querySelector(".prev-btn");
  const heroNextBtn = document.querySelector(".next-btn");

  const thumbnails = document.querySelectorAll(".thumbnail");

  const imageSources = [
    "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200",
    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200",
    "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200",
    "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1200"
  ];

  let currentImageIndex = 0;

  function updateHeroGallery(index) {

    currentImageIndex = index;

    if (mainImage) {
      mainImage.src = imageSources[index];
    }
    syncHeroZoomImage();


    thumbnails.forEach((thumb, i) => {
      thumb.classList.toggle("active", i === index);
    });
  }

  const heroImageWrapper = document.querySelector(".main-image-wrapper");
const zoomLens = document.querySelector(".hero-zoom-lens");
const zoomPreview = document.querySelector(".hero-zoom-preview");

function syncHeroZoomImage() {
  if (mainImage && zoomPreview) {
    zoomPreview.style.backgroundImage = `url("${mainImage.src}")`;
  }
}

function moveHeroZoom(e) {
  if (!heroImageWrapper || !mainImage || !zoomLens || !zoomPreview) return;

  const rect = heroImageWrapper.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
    heroImageWrapper.classList.remove("zoom-active");
    return;
  }

  const lensHalf = zoomLens.offsetWidth / 2;
  const lensX = Math.max(lensHalf, Math.min(x, rect.width - lensHalf));
  const lensY = Math.max(lensHalf, Math.min(y, rect.height - lensHalf));

  zoomLens.style.left = `${lensX}px`;
  zoomLens.style.top = `${lensY}px`;

  const xPercent = (x / rect.width) * 100;
  const yPercent = (y / rect.height) * 100;

  zoomPreview.style.backgroundImage = `url("${mainImage.src}")`;
  zoomPreview.style.backgroundPosition = `${xPercent}% ${yPercent}%`;

  heroImageWrapper.classList.add("zoom-active");
}

heroImageWrapper?.addEventListener("mousemove", moveHeroZoom);

heroImageWrapper?.addEventListener("mouseenter", () => {
  syncHeroZoomImage();
  heroImageWrapper.classList.add("zoom-active");
});

heroImageWrapper?.addEventListener("mouseleave", () => {
  heroImageWrapper.classList.remove("zoom-active");
});


  heroNextBtn?.addEventListener("click", () => {
    let next = (currentImageIndex + 1) % imageSources.length;
    updateHeroGallery(next);
  });

  heroPrevBtn?.addEventListener("click", () => {
    let prev =
      (currentImageIndex - 1 + imageSources.length) %
      imageSources.length;

    updateHeroGallery(prev);
  });

  thumbnails.forEach((thumb, index) => {
    thumb.addEventListener("click", () => {
      updateHeroGallery(index);
    });
  });

  updateHeroGallery(0);

  // =========================================================
  // FAQ ACCORDION
  // =========================================================

  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {

    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    question?.addEventListener("click", () => {

      const isActive = item.classList.contains("active");

      faqItems.forEach((faq) => {
        faq.classList.remove("active");

        const faqAnswer = faq.querySelector(".faq-answer");

        if (faqAnswer) {
          faqAnswer.style.maxHeight = null;
        }
      });

      if (!isActive) {

        item.classList.add("active");

        if (answer) {
          answer.style.maxHeight =
            answer.scrollHeight + "px";
        }
      }
    });
  });

  // =========================================================
  // INDUSTRY CAROUSEL
  // =========================================================

  const carouselTrack =
    document.getElementById("carouselTrack");

  const industryPrevBtn =
    document.getElementById("prevBtn");

  const industryNextBtn =
    document.getElementById("nextBtn");

  let industryScroll = 0;

  industryNextBtn?.addEventListener("click", () => {

    industryScroll += 340;

    carouselTrack.style.transform =
      `translateX(-${industryScroll}px)`;
  });

  industryPrevBtn?.addEventListener("click", () => {

    industryScroll -= 340;

    if (industryScroll < 0) {
      industryScroll = 0;
    }

    carouselTrack.style.transform =
      `translateX(-${industryScroll}px)`;
  });

  // =========================================================
  // MANUFACTURING PROCESS TABS
  // =========================================================

  // const tabButtons =
  //   document.querySelectorAll(".tab-btn");

  // const tabPanels =
  //   document.querySelectorAll(".tab-panel");

  // tabButtons.forEach((button) => {

  //   button.addEventListener("click", () => {

  //     const target =
  //       button.getAttribute("data-tab");

  //     tabButtons.forEach((btn) => {
  //       btn.classList.remove("active");
  //     });

  //     tabPanels.forEach((panel) => {
  //       panel.classList.remove("active");
  //     });

  //     button.classList.add("active");

  //     document
  //       .querySelector(
  //         `.tab-panel[data-panel="${target}"]`
  //       )
  //       ?.classList.add("active");
  //   });
  // });

  // =========================================================
  // MANUFACTURING IMAGE NAV
  // =========================================================

  // const processImages = [
  //   "./assets/images/process/raw-material.jpg",
  //   "./assets/images/process/extrusion.jpg"
  // ];

  // let processIndex = 0;

  // document.querySelectorAll(".img-nav-btn").forEach((btn) => {

  //   btn.addEventListener("click", () => {

  //     const dir =
  //       parseInt(btn.getAttribute("data-dir"));

  //     processIndex =
  //       (processIndex + dir + processImages.length) %
  //       processImages.length;

  //     const image =
  //       btn.closest(".content-right")
  //         ?.querySelector("img");

  //     if (image) {
  //       image.src = processImages[processIndex];
  //     }
  //   });
  // });

  // =========================================================
// MANUFACTURING PROCESS TABS
// =========================================================

const tabButtons = document.querySelectorAll(".tab-btn");
const tabPanels = document.querySelectorAll(".tab-panel");

const processImages = [
  "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=900&h=500&fit=crop",
  "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=900&h=500&fit=crop",
  "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=900&h=500&fit=crop",
  "https://images.unsplash.com/photo-1565034946487-077786996e27?w=900&h=500&fit=crop"
];

let activeProcessTab = 0;

function setManufacturingTab(index) {
  activeProcessTab =
    (index + tabButtons.length) % tabButtons.length;

  tabButtons.forEach((btn, i) => {
    const isActive = i === activeProcessTab;

    btn.classList.toggle("active", isActive);
    btn.closest(".tab-item")?.classList.toggle("active-tab", isActive);
  });

  tabPanels.forEach((panel, i) => {
    const isActive = i === activeProcessTab;

    panel.classList.toggle("active", isActive);

    const image = panel.querySelector(".content-right img");
    if (image) {
      image.src = processImages[i % processImages.length];
    }
  });
}


tabButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    setManufacturingTab(index);
  });
});

document.querySelectorAll(".img-nav-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const dir = Number(btn.getAttribute("data-dir")) || 1;
    setManufacturingTab(activeProcessTab + dir);
  });
});

setManufacturingTab(0);

  // =========================================================
  // TESTIMONIALS SLIDER
  // =========================================================

  const testimonialsOuter =
    document.getElementById("testimonialsOuter");

  if (testimonialsOuter) {

    testimonialsOuter.addEventListener("wheel", (e) => {

      e.preventDefault();

      testimonialsOuter.scrollLeft += e.deltaY;

    });
  }

  // =========================================================
  // FAQ FORM
  // =========================================================

  const faqForm =
    document.querySelector(".faq-cta-form");

  faqForm?.addEventListener("submit", (e) => {

    e.preventDefault();

    alert(
      "Catalogue request submitted successfully."
    );

    faqForm.reset();
  });

});


document.querySelector(".quote-form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Thank you! We will contact you shortly.");
  e.currentTarget.reset();
});
