# Library App

**Library App** is designed to help users keep track of the books in their collection. Whether you want to monitor the books you've read or simply maintain a list of your favorites, this app provides an intuitive interface to manage your personal library. The application prevents duplicate entries and enforces a limit on the total number of stored books.

## Features

- **Add New Books:**  
  Enter book information, including title, author, number of pages, and read status via a dynamic form.

- **Display Books:**  
  Books are presented as cards in a responsive grid layout, showing key details with clear typography and shadow effects.

- **Toggle Read Status:**  
  Easily switch the read status of any book between "READ" and "not READ" with a dedicated button.

- **Delete Books:**  
  Remove books from your library with a simple click on the "Delete" button.

- **Responsive Design:**  
  The layout adapts to different screen sizes using CSS Grid and media queries, ensuring a seamless experience on all devices.

- **Input Validation:**  
  The form checks for required fields and avoids duplicate entries, alerting the user as needed.

## Technologies

- **HTML5:**  
  Provides the basic structure and content of the web application.

- **CSS3:**  
  Implements a modern, responsive design with CSS Grid, Flexbox, and media queries. Custom properties (CSS variables) are used for a consistent color theme.

- **JavaScript (ES6+):**  
  Drives the app’s logic for managing the library, handling events, and updating the DOM dynamically. Features include object constructors with error checking, unique identifier generation using `crypto.randomUUID()`, and array manipulation.
