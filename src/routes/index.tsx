import App from '@/App';
import AllBooks from '@/pages/AllBooks';
import AddBook from '@/pages/AddBook';
import {createBrowserRouter} from 'react-router';
import BorrowSummery from '@/pages/BorrowSummery';
import SingleBook from '@/pages/SingleBook';

const router = createBrowserRouter([
    {
        path: "/",
        // element: <App/>
        Component: App,
        children:[
            {
                path: "books",
                Component: AllBooks
            },
            {
                path: "create-book",
                Component: AddBook
            },
            {
                path: "edit-book/:id",
                Component: AddBook
            },
            {
                path: "books/:id",
                Component: SingleBook
            },
            {
                path: "borrow-summery",
                Component: BorrowSummery
            },
        ]
    }
]);

export default router;