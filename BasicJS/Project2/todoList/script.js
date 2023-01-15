// function connectBtn() {
//     let input = document.getElementById('name');

//     input.addEventListener("keypress", (event) => {
//         if (event.key === "Enter") {
//             event.preventDefault();
//             document.getElementById('myBtn').click();
//             return;
//         }
//     });
// }

let btn = document.querySelector('#item');
btn.addEventListener('click', (event) => {
    let listItem = document.getElementById('item');
    let item = event.target.parentNode;

    listItem.removeChild(item);
});

let addBtn = document.querySelector('#myBtn');
addBtn.addEventListener('click', () => {

    let text = document.getElementById('name').value;
    let listItem = document.getElementById('item');

    if (text == '') {
        alert("Please enter text");

    } else {


        let item = document.createElement('li');
        item.textContent = text;

        let remove = document.createElement('a');
        remove.textContent = 'x';
        remove.href = "javascript:void(0)";
        remove.className = "remove";
        item.appendChild(remove);

        let pos = listItem.firstElementChild;
        console.log("Child Pos:",pos);

        if (pos == null) {
            listItem.appendChild(item);
        } else {
            listItem.insertBefore(item, pos);
        }

        document.getElementById('name').value = "";

    }

});