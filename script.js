const bookForm = document.querySelector(".add-new-book");
const cardContainer = document.querySelector(".card-container");
const submitBtn = document.querySelector("#submit-btn");
const myLibrary = [];

function Book(title, author, pages) {
    if(!new.target) {
        throw new Error("Constructor Book requires 'new' operator");
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
}

function addBookToLibrary(title, author, pages) {
    // implement unique id here!
        const book = new Book(title, author, pages);
        myLibrary.push(book);
}

function displayBooks() {
    const uniqueId = crypto.randomUUID();
    myLibrary.forEach(book => {
        cardContainer.innerHTML += `
        <div class="book-${uniqueId}">
            <h3 class="title">${book.title}</h3>
            <p class="author">${book.author}</p>
            <p class="pages">${book.pages}</p>
            <button class="read">Read</button>
            <button class="delete">Delete</button>
        </div>
        `
    });
}

function retrieveFormData(event){
event.preventDefault();
const bookData = new FormData(bookForm);
const formInput = []
for(const [key, value] of bookData){
    formInput.push(value);
}
return formInput;
}

// seperate from this function
function checkForDoubleEntries(event){
const formInput = retrieveFormData(event);
const [title, author, pages] = formInput;
let allowEntry;
if(myLibrary.length < 1){
    addBookToLibrary(title, author, pages);
} else {
    myLibrary.forEach(book => 
        book.title === title 
        ? allowEntry = false
        : allowEntry = true)
    allowEntry
    ? addBookToLibrary(title, author, pages) 
    : alert('This book has already been added!')
}
}

// better to find a solution where old and new entries are compared
function resetLibrary(){
    cardContainer.innerHTML = '';
}


submitBtn.addEventListener("click", (event) => {
    checkForDoubleEntries(event);
    resetLibrary();
    displayBooks();
});


