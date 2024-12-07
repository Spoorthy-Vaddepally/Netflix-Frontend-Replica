let currentScroll = 0;

function customScroll(amount) {
    const container = document.getElementById('scrollContent');
    const maxScroll = container.scrollWidth - container.clientWidth;
    currentScroll = Math.max(0, Math.min(currentScroll + amount, maxScroll));
    container.style.transform = `translateX(-${currentScroll}px)`;
}
document.addEventListener("DOMContentLoaded", () => {
    const faqRows = document.querySelectorAll(".row");
  
    faqRows.forEach(row => {
      row.addEventListener("click", () => {
        const answer = row.nextElementSibling;
  
        // Toggle visibility
        row.classList.toggle("open");
        if (answer.style.display === "block") {
          answer.style.display = "none";
        } else {
          answer.style.display = "block";
        }
      });
    });
});
document.addEventListener("DOMContentLoaded", () => {
  const dropdownTrigger = document.querySelector('.english');
  const dropdownOptions = document.querySelector('.dropdown-options');

  dropdownTrigger.addEventListener('click', (event) => {
      event.stopPropagation(); // Prevent this click from closing the dropdown
      dropdownOptions.style.display = dropdownOptions.style.display === 'block' ? 'none' : 'block';
  });

  document.addEventListener('click', () => {
      dropdownOptions.style.display = 'none'; // Hide dropdown when clicking outside
  });

  dropdownOptions.addEventListener('click', (event) => {
      event.stopPropagation(); // Prevent clicks inside dropdown from closing it
  });
});

function translatePage(language) {
  const translateElementId = "google_translate_element";

  if (!document.getElementById(translateElementId)) {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://translate.google.com/translate_a/element.js?cb=initializeGoogleTranslate`;
      script.id = translateElementId;
      document.body.appendChild(script);
  } else {
      performTranslation(language);
  }

  window.initializeGoogleTranslate = function () {
      new google.translate.TranslateElement(
          {
              pageLanguage: "en",
              includedLanguages: "en,hi", 
              autoDisplay: false,
          },
          translateElementId
      );
      performTranslation(language);
  };
}

function performTranslation(language) {
  const iframe = document.querySelector("iframe.goog-te-banner-frame");
  if (iframe) iframe.style.display = "none";
  const select = document.querySelector(
      ".goog-te-combo" 
  );
  if (select) {
      select.value = language;
      select.dispatchEvent(new Event("change"));
  }
}
