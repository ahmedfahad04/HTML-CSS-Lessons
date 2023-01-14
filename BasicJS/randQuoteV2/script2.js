const quoteText = document.querySelector(".quote");
const quoteAuthor = document.querySelector(".name")
quoteBtn = document.querySelector("button");
soundBtn = document.querySelector(".sound");
copyBtn = document.querySelector(".copy");
twitterBtn = document.querySelector(".twitter");


// RAPID API CODE INTEGRATION
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '072afd5ec9msha41e7d060f4bfc2p169b81jsnbdfe9f7d475c',
		'X-RapidAPI-Host': 'quotes15.p.rapidapi.com'
	}
};


function randomQuote() {
    quoteBtn.innerText = "Loading...";
    quoteBtn.classList.add("loading");
    // fetching random quotes from the API and parsing it into JS object
    fetch('https://quotes15.p.rapidapi.com/quotes/random/', options)
	.then((response) => response.json())
	.then((result) => {
        quoteText.innerText = result.content;
        quoteAuthor.innerText = result.originator.name;
        quoteBtn.innerText = "New Quote";
        quoteBtn.classList.remove("loading");
    })
	.catch(err => console.error(err));
}

// () => {} is arrow function
// callback function are those function that are passed as an argument to
// another function

quoteBtn.addEventListener("click", randomQuote);
soundBtn.addEventListener("click", () => {
    // SpeechSynthesisUtterance is a web speech api that represents a speech request
    let utterance = new SpeechSynthesisUtterance(`by ${quoteAuthor.innerText} ${quoteText.innerText}`);
    speechSynthesis.speak(utterance);
});
copyBtn.addEventListener("click", () => {
    // copying the quote to the clipboard
    navigator.clipboard.writeText(`${quoteText.innerText} - ${quoteAuthor.innerText}`);
    window.alert("Copied to clipboard");
})
twitterBtn.addEventListener("click", () => {
    // opening a new tab with the quote and author
    window.open(`https://twitter.com/intent/tweet?text=${quoteText.innerText} - ${quoteAuthor.innerText}`, "_blank");
})



