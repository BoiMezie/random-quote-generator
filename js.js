// const btn=document.getElementsByClassName(".btn");

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

