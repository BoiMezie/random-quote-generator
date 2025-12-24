// const btn=document.getElementsByClassName(".btn");

/* const apiUrl = "https://api.quotable.io/quotes/random";

async function fetchRandomQuote(url) {
  const response = await fetch(url);
  var data = await response.json();
  console.log(data);
  // document.querySelector(".quote").textContent = 'Holla';
  document.getElementById(".author").textContent = data.author;
}

fetchRandomQuote(apiUrl);
 */
document
  .querySelector(".generate-quote")
  .addEventListener("click", function () {
    document.querySelector(".quote").textContent = "Holla";
  });
//   try {
//     const response = await fetch(apiUrl);
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }
//     var data = await response.json();
//     console.log(data);
//   } catch (error) {
//     console.error("There has been a problem with your fetch operation:", error);
//   }
// }

// fetchRandomQuote(apiUrl);
// fetchRandomQuote().then((quote) => {
//   if (quote) {
//     console.log(`"${quote.content}" - ${quote.author}`);
//   }
// });
