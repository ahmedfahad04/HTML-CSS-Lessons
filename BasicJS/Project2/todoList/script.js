// function connectBtn() {
//     let input = document.getElementById('name');

//     input.addEventListener("keypress", (event) => {
//         if (event.key === "Enter") {
//             event.preventDefault();
//             document.getElementById('myBtn').click();
//         }

//     });

//     // addBtn.removeEventListener("click", listener);
// }

// couldn't figure out how to connet key press with button click
// the above function works but the button is recursively pressed
// with empty input and cause error.

function listener(){

    console.log('Triggered');
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
}

// remove item when the 'x' [anchor] tag is pressed
let btn = document.querySelector('#item');
btn.addEventListener('click', (event) => {
    let listItem = document.getElementById('item');
    /*
    event.target is a property of the event object that refers to the element that triggered the event. 
    In this case, when the 'x' anchor tag is clicked, the event.target property refers to the anchor tag 
    element itself. The code then uses the parentNode property to get the parent node of the anchor tag, 
    which is the list item element that contains the anchor tag. This element is then removed from the 
    list using the removeChild method.
    */
    let item = event.target.parentNode;

    listItem.removeChild(item);
});

// add new item in the list
let addBtn = document.querySelector('#myBtn');
addBtn.addEventListener('click', listener);