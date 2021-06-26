console.log('Library App');

let library = [];
let editIndex;

initialiseLibrary();

// Book object constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Adds a book to library array
function addBook(title, author, pages, read) {
    if (pages <= 0) {
        return alert('Sneaky, you can\'t have less than one page.');
    }
    let book = new Book(title, author, pages, read);
    library.push(book);
    createBookCard(library.length - 1);
    updateLocalStorage();
}

// Local storage
function updateLocalStorage() {
    localStorage.setItem('library', JSON.stringify(library));
}

function loadSavedBooks() {
    let localBooksArray = localStorage.getItem('library');
    localBooksArray = JSON.parse(localBooksArray);
    console.table(localBooksArray);

    for (let i = 0; i < localBooksArray.length; i ++) {
        createBookCard(i);
    }
}

function initialiseLibrary() {
    if (localStorage.length === 0) {
        return;
    }
    library = JSON.parse(localStorage.getItem('library'));
    loadSavedBooks();
}

function createBookCard(i) {
    const container = document.querySelector('.library-container');
    
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
    btnRemove.classList.add('remove', 'card-btn');
    btnRemove.setAttribute('data-index', [i]);
    btnRemove.addEventListener('click', removeFromLibrary);
    card.appendChild(btnRemove);

    // Write text to card
    const title = document.createElement('h2');
    title.innerText = library[i].title;
    title.classList.add('card-title');
    card.appendChild(title);

    // Write author to card
    const pAuthor = document.createElement('p');
    pAuthor.innerText = `by ${library[i].author}`;
    pAuthor.classList.add('author');
    card.appendChild(pAuthor);

    // Write pages to card
    const pPages = document.createElement('p');
    pPages.innerText = library[i].pages + ' pages';
    pPages.classList.add('pages');
    card.appendChild(pPages);

    // Create card footer div
    const dCardFooter = document.createElement('div');
    dCardFooter.setAttribute('class', 'card-footer');
    card.appendChild(dCardFooter);

    // Select newly created card footer
    const cardFooter = card.querySelector('.card-footer');

    // Write read to card
    const pRead = document.createElement('p');
    pRead.innerText = library[i].read;
    pRead.setAttribute('class', 'read-status');
    if (library[i].read === 'Read') {
        pRead.classList.add('read');
    } else {
        pRead.classList.add('not-read');
    }
    cardFooter.appendChild(pRead);

    // Write edit to card
    const pEdit = document.createElement('p');
    pEdit.innerText = 'Edit';
    pEdit.setAttribute('class', 'card-footer-edit');
    pEdit.setAttribute('data-index', [i]);
    pEdit.addEventListener('click', showEditForm);
    cardFooter.appendChild(pEdit);
}

function removeFromLibrary() {
    let index = this.getAttribute('data-index');
    const cardToRemove = document.getElementById(index);
    console.log(`Removed index ${index} from library (Book: ${library[index].title}).`);
    cardToRemove.remove(); // Remove card div from HTML DOM
    library.splice(index, 1); // Remove index entry in library array
    for (i = Number(index); i < library.length; i++) {
        let indexToChange = i + 1;
        let cardToChange = document.getElementById(`${indexToChange}`);
        let btnToChange = document.querySelector(`button[data-index='${indexToChange}']`);

        // Modify DOM attributes to match their new index in the library
        cardToChange.setAttribute('id', `${i}`);
        btnToChange.setAttribute('data-index', `${i}`);
    }
    updateLocalStorage();
}

function displayForm() {
    bookForm.setAttribute('class', 'form-container display fade-in');
}

function hideForm() {
    bookForm.setAttribute('class', 'form-container hidden');
    clearForm();
    submitBtn.setAttribute('class', 'display');
    editSubmitBtn.setAttribute('class', 'hidden');
}

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
        hideForm();
    }
}

function showEditForm() {
    editIndex = this.getAttribute('data-index');
    submitBtn.classList.add('hidden');
    editSubmitBtn.setAttribute('class', 'display');
    console.log('Attribute: ' + editIndex);
    bookInput.value = library[editIndex].title;
    authorInput.value = library[editIndex].author;
    pagesInput.value = library[editIndex].pages;
    displayForm();
}

// Change the text of card and library array to match new values that user inputs
function editBook() {
    // Edit title text
    let editTitle = document.getElementById(editIndex).querySelector('.card-title');
    editTitle.innerText = bookInput.value;

    // Edit author text
    let editAuthor = document.getElementById(editIndex).querySelector('.author');
    editAuthor.innerHTML = authorInput.value;

    // Edit pages text
    let editPages = document.getElementById(editIndex).querySelector('.pages');
    if (Number(pagesInput.value) <= 0) {
        alert('Sneaky, you can\'t have less than one page.');
        return;
    } else {
        editPages.innerHTML = pagesInput.value;
    }

    // Edit read status
    let editRead = document.getElementById(editIndex).querySelector('.read-status');
    if (readInput.value === 'not-read') {
        editRead.innerText = 'Not read';
        editRead.setAttribute('class', 'read-status not-read');
        library[editIndex].read = editRead.innerText;
    } else {
        editRead.innerText = 'Read';
        editRead.setAttribute('class', 'read-status read');
        library[editIndex].read = editRead.innerText;
    }

    // Modify the library to reflect new user input
    library[editIndex].title = bookInput.value;
    library[editIndex].author = authorInput.value;
    library[editIndex].pages = pagesInput.value;

    // Update local storage
    updateLocalStorage();

    // Reset form
    hideForm();
    clearForm();
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
const editSubmitBtn = document.getElementById('edit-submit-btn');

// Event Listeners
formBtn.addEventListener('click', displayForm);
cancelBtn.addEventListener('click', hideForm);
submitBtn.addEventListener('click', writeInputToLibrary);
editSubmitBtn.addEventListener('click', editBook);

/* Initialise (for testing purposes)
addBook('Book Title', 'Author Name', '123', 'Read');
addBook('Untitled', 'Anonymous', '1', 'Not Read');
*/