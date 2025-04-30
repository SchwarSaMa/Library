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
const bookData = new FormData(bookForm);
const formInput = [];
for(const [key, value] of bookData){
    formInput.push(value);
}
// seperate from this function
addBookToLibrary(formInput[0], formInput[1], formInput[2]);
event.preventDefault();
}

// better to find a solution where old and new entries are compared
function resetLibrary(){
    cardContainer.innerHTML = '';
}


submitBtn.addEventListener("click", (event) => {
    retrieveFormData(event);
    resetLibrary();
    displayBooks();
    console.log(myLibrary);
});


