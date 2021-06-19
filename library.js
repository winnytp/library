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
    displayLastBook();
}

// Displays the books on HTML page
function displayLastBook() {
    const container = document.querySelector('.library-container');

    let i = library.length - 1;

    // Log what this function is doing (for debug purposes)
    console.log(`Adding ${library[i].title} to page.`);
    console.table(library[i]);

    // Create the Card
    const div = document.createElement('div');
    div.classList.add('card', 'card-flex');
    div.setAttribute('id', [i]);
    container.appendChild(div);

    // Card Query Selector
    const card = document.getElementById([i]);

    // Write remove button to card
    const btnRemove = document.createElement('button');
    btnRemove.innerText = '✖';
    btnRemove.classList.add('remove');
    btnRemove.setAttribute('data-index', [i]);
    card.appendChild(btnRemove);

    // Write text to card
    const title = document.createElement('h2');
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
    if (library[i].read === 'Read') {
        pRead.classList.add('read');
    } else {
        pRead.classList.add('not-read');
    }
    card.appendChild(pRead);
}

// Form show and hide
function displayForm() {
    bookForm.setAttribute('class', 'form-container display');
}

function hideForm() {
    bookForm.setAttribute('class', 'form-container hidden');
    clearForm();
}

// Form functionality
function clearForm() {
    bookInput.value = '';
    authorInput.value = '';
    pagesInput.value = '';
}

function writeInputToLibrary() {
    const bookTitle = bookInput.value;
    const authorName = authorInput.value;
    const pageNum = pagesInput.value;
    const readCheck = readInput.value;

    if (bookTitle === '' || authorName === '' || pageNum === '') {
        alert('Please fill in all required details.')
        return;
    } else {
        let readText = '';
        if (readCheck === 'not-read') {
            readText = 'Not Read';
        } else {
            readText = 'Read';
        }
        addBook(bookTitle, authorName, pageNum, readText);
        clearForm();
    }
}

// Query Selectors
const formBtn = document.getElementById('form-btn');
const bookForm = document.querySelector('.form-container');
const cancelBtn = document.getElementById('cancel-btn');
const bookInput = document.getElementById('book-title');
const authorInput = document.getElementById('author');
const pagesInput = document.getElementById('pages');
const readInput = document.getElementById('read-check');
const submitBtn = document.getElementById('submit-btn');

// Event Listeners
formBtn.addEventListener('click', displayForm);
cancelBtn.addEventListener('click', hideForm);
submitBtn.addEventListener('click', writeInputToLibrary);

// Initialise (for testing purposes)
addBook('Book Title', 'Author Name', '1234', 'Read');