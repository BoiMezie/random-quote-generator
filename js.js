// Function to fetch the quote 

const apiUrl = "https://api.quotable.io/quotes/random";

async function fetchRandomQuote(url) {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    //API returns an array
    const quote = data[0];

    document.querySelector(".quote").textContent = data[0].content;
    document.querySelector(".author").textContent = data[0].author;
    // console.log(data);
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}

document
  .querySelector(".generate-quote")
  .addEventListener("click", fetchRandomQuote);

fetchRandomQuote(apiUrl);

//Function to hide and show modal, and link to the share button 
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
  console.log(e.key);

  if (e.key === "Escape") {
    return closeModal();
  }
});

// Getting the share buttons from the DOM
const twitterShare = document.getElementById('twitterShare');
const facebookShare = document.getElementById('facebookShare');
const whatsappShare = document.getElementById('whatsappShare');
const copyQuote = document.getElementById('copyQuote');

function getQuoteText() {
  const quoteText = document.querySelector('.quote').innerText;
  const quoteAuthor = document.querySelector('.author').innerText;
  return `Today's quote:
"${quoteText}"  
~ ${quoteAuthor}`;
}

// Event listener for Twitter share button
twitterShare.addEventListener('click', function() {
  const quote = getQuoteText();
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(quote)}`;
  window.open(twitterUrl, '_blank');
});

// Event listener for Facebook share button
facebookShare.addEventListener('click', function() {
  const quote = getQuoteText();
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=&quote=${encodeURIComponent(quote)}`;
  window.open(facebookUrl, '_blank');
});

// Event listener for WhatsApp share button
whatsappShare.addEventListener('click', function() {
  const quote = getQuoteText();
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(quote)}`;
  window.open(whatsappUrl, '_blank');
});

// Event listener for Copy Quote button
copyQuote.addEventListener('click', function() {
  const quote = getQuoteText();
  navigator.clipboard.writeText(quote).then(function() {
    alert('Quote copied to clipboard!');
  }, function(err) {
    console.error('Could not copy text: ', err);
  });
});