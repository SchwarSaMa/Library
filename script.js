const cardContainer = document.querySelector(".card-container");
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
    const book = new Book(title, author, pages);
    myLibrary.push(book);
}

// add books to myLibrary for testing purposes
addBookToLibrary('Test1', 'test author 1', '100');

function displayBooks() {
    const uniqueId = crypto.randomUUID();
    myLibrary.forEach(book => {
        cardContainer.innerHTML = `
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

displayBooks();
