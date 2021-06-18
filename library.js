console.log('Library App');

let library = [];

// Book object constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Adds a book to library array
function addBook(title, author, pages, read) {
    let book = new Book(title, author, pages, read);
    library.push(book);
}

// Displays the books on HTML page
function displayBook() {
    const container = document.querySelector('.library-container');
    for (let i = 0; i < library.length; i++) {
        console.log(`Adding ${library[i].title} to page.`); // for debug purposes
        console.log(library[i]);

        // Create the Card
        const div = document.createElement('div');
        const title = document.createElement('h2');
        div.classList.add('card', 'card-flex');
        div.setAttribute('id', [i]);
        container.appendChild(div);

        // Write text to card
        const card = document.getElementById([i]);
        title.innerText = library[i].title;
        title.classList.add('card-title');
        card.appendChild(title);

        // Write author to card
        const pAuthor = document.createElement('p');
        pAuthor.innerText = library[i].author;
        pAuthor.classList.add('author');
        card.appendChild(pAuthor);

        // Write pages to card
        const pPages = document.createElement('p');
        pPages.innerText = library[i].pages + ' pages';
        pPages.classList.add('pages');
        card.appendChild(pPages);

        // Write read to card
        const pRead = document.createElement('p');
        pRead.innerText = library[i].read;
        pRead.classList.add('read');
        card.appendChild(pRead);
    }
}

addBook('Game of Thrones', 'George R. R. Martin', '1320', 'Read');
addBook('Diary of a Wimpy Kid', 'Random Author', '150', 'Read');

displayBook();