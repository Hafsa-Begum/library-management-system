import {Link} from 'react-router';
import { BookOpenText } from 'lucide-react';

const routes = [
    {
        id: 1,
        routeName: 'Home',
        routePath: '/'
    },
    {
        id: 2,
        routeName: 'All Books',
        routePath: '/books'
    },
    {
        id: 3,
        routeName: 'Add Book',
        routePath: '/create-book'
    },
    {
        id: 4,
        routeName: 'Borrow Summery',
        routePath: '/borrow-summery'
    },
  ]
const Header = () => {
    return (
      <div className="bg-blue-100 shadow-lg text-gray-600 py-4">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          {/* Logo */}
          <div className="text-xl">
            <Link className="hover:text-gray-100" to="/">
            <BookOpenText />
              LMS
            </Link>
          </div>
  
          {/* Navigation Links */}
          <nav>
            <ul className="flex space-x-6">
              {
                  routes.map(route=>(
                      <li className="text-2xl mx-2 px-2" key={route.id}>
                          <Link className="hover:text-gray-300" to={route.routePath}>
                              {route.routeName}
                          </Link>
                      </li>
                  ))
              }
            </ul>
          </nav>
        </div>
      </div>
    );
  };
  
  export default Header;