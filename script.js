/*
    avoid HTML injection
*/

const bookForm = document.querySelector(".add-new-book");
const cardContainer = document.querySelector(".card-container");
const submitBtn = document.querySelector("#submit-btn");
const inputFields = document.querySelectorAll("input");
const myLibrary = [];

function Book(title, author, pages, uniqueId) {
    if(!new.target) {
        throw new Error("Constructor Book requires 'new' operator");
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus;
    this.uniqueId = uniqueId;

    this.verifyReadStatus = function(readStatus){
        this.readStatus = readStatus === true ? 'READ' : 'not READ';
    };
}

function addBookToLibrary(title, author, pages, readStatus) {
    const uniqueId = crypto.randomUUID();
    const readStatusConversion = readStatus === 'true' ? true : false;
    const book = new Book(title, author, pages, uniqueId);
    book.verifyReadStatus(readStatusConversion);
    myLibrary.push(book);
}

function displayBooks() {
    myLibrary.forEach(book => {
        cardContainer.innerHTML += `
        <div class="book-info" data-unique-id="${book.uniqueId}">
            <h3 class="title">${book.title}</h3>
            <p class="author">${book.author}</p>
            <p class="pages">${book.pages}</p>
            <button class="read-btn" onclick="toggleReadStatus(event)">${book.readStatus}</button>
            <button class="delete-btn" onclick="deleteBook(event)">Delete</button>
        </div>
        `;
    });
}

function retrieveFormData(){
    const bookData = new FormData(bookForm);
    const formInput = []
    for(const [key, value] of bookData){
        formInput.push(value);
    }
    return formInput;
}

function checkForDoubleEntries(){
    const [title, author, pages, readStatus] = retrieveFormData();
    if(!title || !author){
        alert('Fill in both TITLE and AUTHOR');
    } else {
        if(myLibrary.length < 1){
            addBookToLibrary(title, author, pages, readStatus);
        } else {
            const allowEntry = myLibrary.every(book => book.title != title);
            allowEntry
            ? addBookToLibrary(title, author, pages, readStatus) 
            : alert('This book has already been added!');
        }
    }
}

// better to find a solution where old and new entries are compared
function resetLibrary(){
    cardContainer.innerHTML = '';
}

function resetInputFields(){
    inputFields.forEach(input => {
        input.value = '';
        input.checked = false;
    });
}

function deleteBook(event){
    const uniqueId = event.currentTarget.parentNode.dataset.uniqueId;
    const index = myLibrary.findIndex(book => book.uniqueId === uniqueId);
    myLibrary.splice(index, 1);
    resetLibrary();
    displayBooks();
}

function toggleReadStatus(event){
    const uniqueId = event.currentTarget.parentNode.dataset.uniqueId;
    const index = myLibrary.findIndex(book => book.uniqueId === uniqueId);
    const readStatusConversion = myLibrary[index].readStatus === 'READ' ? true : false;
    const toggle = !readStatusConversion;
    myLibrary[index].readStatus = toggle === true ? 'READ' : 'not READ';
    resetLibrary();
    displayBooks();
}

submitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    if(myLibrary.length >= 12){
        alert('You can only store 12 books. First delete an old one, then add a new book');
    }else{
        checkForDoubleEntries();
        resetLibrary();
        displayBooks();
    }
});

const bookTest = new Book('Eragon', 'Christopher Paolini', '300');
const bookTest1 = new Book('Eragon1', 'Christopher Paolini', '300');
const bookTest2 = new Book('Eragon1', 'Christopher Paolini', '300');
const bookTest3 = new Book('Eragon1', 'Christopher Paolini', '300');
const bookTest4 = new Book('Eragon1', 'Christopher Paolini', '300');
const bookTest5 = new Book('Eragon1', 'Christopher Paolini', '300');
const bookTest6 = new Book('Eragon1', 'Christopher Paolini', '300');
const bookTest7 = new Book('Eragon1', 'Christopher Paolini', '300');
const bookTest8 = new Book('Eragon1', 'Christopher Paolini', '300');
const bookTest9 = new Book('Eragon1', 'Christopher Paolini', '300');
const bookTest10 = new Book('Eragon1', 'Christopher Paolini', '300');
const bookTest11 = new Book('Eragon1', 'Christopher Paolini', '300');
myLibrary.push(bookTest);
myLibrary.push(bookTest1);
myLibrary.push(bookTest2);
myLibrary.push(bookTest3);
myLibrary.push(bookTest4);
myLibrary.push(bookTest5);
myLibrary.push(bookTest6);
myLibrary.push(bookTest7);
myLibrary.push(bookTest8);
myLibrary.push(bookTest9);
myLibrary.push(bookTest10);
myLibrary.push(bookTest11);
displayBooks();
