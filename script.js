const bookForm = document.querySelector(".add-new-book");
const cardContainer = document.querySelector(".card-container");
const submitBtn = document.querySelector("#submit-btn");
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

function retrieveFormData(event){
    event.preventDefault();
    const bookData = new FormData(bookForm);
    const formInput = []
    for(const [key, value] of bookData){
        formInput.push(value);
    }
    return formInput;
}

function checkForDoubleEntries(event){
    const [title, author, pages, readStatus] = retrieveFormData(event);
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
    checkForDoubleEntries(event);
    resetLibrary();
    displayBooks();
});

