# Library Management System 

A minimal library management system using React, Redux Toolkit Query (RTK Query), and TypeScript. The system will allow users to view a list of books, perform CRUD operations, borrow books, and view a simple borrow summary.

- [Live link](https://library-management-system-mu-weld.vercel.app) 
- [Server link](https://library-management-server-test.vercel.app) 

## Project Setup Instructions
1. Clone the project.
```
git clone https://github.com/Hafsa-Begum/library-management-system.git
cd library-management-system

```
2. Install dependencies. Recomended node version v22.11.0
```
bun install

```
3. Run locally (in dev mode)
```
bun dev

```

## Features
### Landing Page Components
- Navbar: Simple navigation bar with links to:
  All Books
  Add Book
  Borrow Summary
- Book: Display books in grid view with all core actions.
- Footer: Standard footer with site info or credits.

### Page List or Modal
- /books – Displays a list of all books with options to view, edit, delete, and borrow.
- /create-book – Page having Form to add a new book to the system.
- /books/:id – Detailed view of a single book’s information.
- /edit-book/:id – Page to update an existing book’s details.
- /borrow/:bookId – Modal having Form to borrow a selected book.
- /borrow-summary – Displays an aggregated summary of all borrowed books.

### Technical Integration (Frontend + API Integration)

1. API Integration

- Consume backend endpoints via RTK Query in the frontend.
- All API calls typed and organized using Redux Toolkit Query best practices.

2. State Management

- Redux Toolkit with RTK Query:
- Used for managing all book and borrow-related API calls and states.
