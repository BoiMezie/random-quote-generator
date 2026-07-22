// Quote generator with online-first and offline fallback.

const quoteElement = document.querySelector(".quote");
const authorElement = document.querySelector(".author");
const generateButton = document.querySelector(".generate-quote");
const spinnerElement = document.querySelector(".spinner");

let localQuotes = [];
let lastQuoteIndex = -1;

function showSpinner() {
  spinnerElement.classList.remove("hidden");
  generateButton.disabled = true;
}

function hideSpinner() {
  spinnerElement.classList.add("hidden");
  generateButton.disabled = false;
}

function displayQuote(quoteData) {
  quoteElement.textContent = quoteData.quote;
  authorElement.textContent = quoteData.author;
}

async function loadLocalQuotes() {
  if (localQuotes.length > 0) {
    return localQuotes;
  }

  try {
    const response = await fetch("quotes.json");
    if (!response.ok) {
      throw new Error(`Could not load quotes.json (${response.status})`);
    }

    const data = await response.json();
    localQuotes = Array.isArray(data) ? data : [];

    if (localQuotes.length === 0) {
      throw new Error("quotes.json did not contain any quotes");
    }

    return localQuotes;
  } catch (error) {
    console.warn("Offline quote database could not be loaded:", error);
    return [];
  }
}

function getRandomLocalQuote() {
  if (localQuotes.length === 0) {
    return {
      quote: "A journey of a thousand miles begins with a single step.",
      author: "Lao Tzu",
    };
  }

  let nextIndex = Math.floor(Math.random() * localQuotes.length);

  if (localQuotes.length > 1 && nextIndex === lastQuoteIndex) {
    nextIndex = (nextIndex + 1) % localQuotes.length;
  }

  lastQuoteIndex = nextIndex;
  return localQuotes[nextIndex];
}

async function fetchOnlineQuote() {
  const endpoints = [
    "https://api.quotable.io/random",
    "https://api.adviceslip.com/advice",
  ];

  for (const url of endpoints) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (!response.ok) {
        continue;
      }

      const data = await response.json();

      if (url.includes("quotable")) {
        const quote = data?.content?.trim();
        const author = data?.author?.trim();
        if (quote && author) {
          return { quote, author };
        }
      }

      if (url.includes("adviceslip")) {
        const quote = data?.slip?.advice?.trim();
        if (quote) {
          return { quote, author: "Advice" };
        }
      }
    } catch (error) {
      // Silently fall back to the offline database when an online source fails.
    }
  }

  return null;
}

async function generateQuote() {
  showSpinner();

  try {
    await loadLocalQuotes();
    const onlineQuote = await fetchOnlineQuote();
    const quoteToDisplay = onlineQuote || getRandomLocalQuote();
    displayQuote(quoteToDisplay);
  } catch (error) {
    console.warn("Unable to generate a quote right now:", error);
    displayQuote(getRandomLocalQuote());
  } finally {
    hideSpinner();
  }
}

generateButton.addEventListener("click", generateQuote);

// Load local quotes once, then display the first quote.
generateQuote();

// Function to hide and show modal, and link to the share button
const modal = document.querySelector(".modal");
// const overlay = document.querySelector('.overlay');
const buttonCloseModal = document.querySelector(".close-modal");
const buttonShowModal = document.querySelector(".show-modal");
// console.log(buttonShowModal);

const openModal = function () {
  modal.classList.remove("hidden");
  // overlay.classList.remove('hidden');
};

buttonShowModal.addEventListener("click", openModal);

/* for (let i = 0; i < buttonShowModal.length; i++) {
} */

const closeModal = function () {
  modal.classList.add("hidden");
  // overlay.classList.add('hidden');
};

buttonCloseModal.addEventListener("click", closeModal);

// overlay.addEventListener('click', closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeModal();
  }
});

// Getting the share buttons from the DOM
const twitterShare = document.getElementById("twitterShare");
const facebookShare = document.getElementById("facebookShare");
const whatsappShare = document.getElementById("whatsappShare");
const copyQuote = document.getElementById("copyQuote");

// Getting the quote content from the DOM
function getQuoteText() {
  const quoteText = document.querySelector(".quote").innerText;
  const quoteAuthor = document.querySelector(".author").innerText;
  return `Today's quote:
"${quoteText}"  
~ ${quoteAuthor}`;
}

// Event listener for Twitter share button
twitterShare.addEventListener("click", function () {
  const quote = getQuoteText();
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(quote)}`;
  window.open(twitterUrl, "_blank");
});

// Event listener for Facebook share button
facebookShare.addEventListener("click", function () {
  const quote = getQuoteText();
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=&quote=${encodeURIComponent(quote)}`;
  window.open(facebookUrl, "_blank");
});

// Event listener for WhatsApp share button
whatsappShare.addEventListener("click", function () {
  const quote = getQuoteText();
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(quote)}`;
  window.open(whatsappUrl, "_blank");
});

// Event listener for Copy Quote button
copyQuote.addEventListener("click", function () {
  const quote = getQuoteText();
  navigator.clipboard.writeText(quote).then(
    function () {
      alert("Quote copied to clipboard!");
    },
    function (err) {
      console.error("Could not copy text: ", err);
    },
  );
});
