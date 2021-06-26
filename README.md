# library
`library` is a simple, lightweight app which keeps track of books you've read.

## Features
1. Display books from your library using a flexible card-based interface.
2. Edit entries in your library, including book title, author, and number of pages.
3. Remembers what books you've added on your browser.

### Book Removal Behaviour:
If you had books `A`, `B` and `C`, then removed `Book B`:
- `Book A` would remain at index 0;
- `Book C` would shift down from index 2 to index 1 (taking `Book B`'s place);
- `Book C`'s DOM attributes (`id`, `data-index`) will also shift to the index value (so, they would go from 2 to 1).

This keeps the library array and DOM elements in sync.

### Planned features:
- Local storage: Added (26 June 2021)
- Cloud storage