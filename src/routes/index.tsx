import App from '@/App';
import AllBooks from '@/pages/AllBooks';
import {createBrowserRouter} from 'react-router';

const router = createBrowserRouter([
    {
        path: "/",
        // element: <App/>
        Component: App,
        children:[
            {
                path: "books",
                Component: AllBooks
            }
        ]
    }
]);

export default router;