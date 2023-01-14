function generate() {

    // learned about: dictionary
    let quotes = {
        "-Ronald Reagan":'"A people free to choose will always choose peace."',
        "-A P J Abdul Kalam": '"If a country is to be corruption free and become a nation of beautiful minds, I strongly feel there are three key societal members who can make a difference. They are the father, the mother and the teacher."',
        "-Albert Einestein":'"Our task must be to free ourselves by widening our circle of compassion to embrace all living creatures and the whole of nature and its beauty."'
    }

    let authors = Object.keys(quotes);
    let q = Object.values(quotes);
    console.log(q);

    let index = Math.floor(Math.random() * authors.length);

    let author = authors[index];

    let quote = quotes[author];

    document.getElementById('quote').innerHTML = quote;
    document.getElementById('author').innerHTML = author;

}
