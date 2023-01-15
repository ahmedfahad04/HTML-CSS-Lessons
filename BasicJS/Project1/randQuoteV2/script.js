const quoteText = document.querySelector(".quote");
const quoteAuthor = document.querySelector(".name")
quoteBtn = document.querySelector("button");
soundBtn = document.querySelector(".sound");
copyBtn = document.querySelector(".copy");
twitterBtn = document.querySelector(".twitter");


function randomQuote() {
    quoteBtn.innerText = "Loading...";
    quoteBtn.classList.add("loading");
    // fetching random quotes from the API and parsing it into JS object
    fetch("https://api.quotable.io/random").then(res => res.json()).then(result => {
        quoteText.innerText = result.content;
        quoteAuthor.innerText = result.author;
        quoteBtn.innerText = "New Quote";
        quoteBtn.classList.remove("loading");
    });
}

// () => {} is a callback function

quoteBtn.addEventListener("click", randomQuote);
soundBtn.addEventListener("click", () => {
    // SpeechSynthesisUtterance is a web speech api that represents a speech request
    let utterance = new SpeechSynthesisUtterance(`by ${quoteAuthor.innerText} ${quoteText.innerText}`);
    speechSynthesis.speak(utterance);
});
copyBtn.addEventListener("click", () => {
    // copying the quote to the clipboard
    navigator.clipboard.writeText(`${quoteText.innerText} - ${quoteAuthor.innerText}`);
})
twitterBtn.addEventListener("click", () => {
    // opening a new tab with the quote and author
    window.open(`https://twitter.com/intent/tweet?text=${quoteText.innerText} - ${quoteAuthor.innerText}`, "_blank");
})
