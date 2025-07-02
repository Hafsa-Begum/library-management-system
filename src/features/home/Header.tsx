import {Link} from 'react-router'

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
  ]
const Header = () => {
    return (
      <div className="shadow-md text-gray-600">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          {/* Logo */}
          <div className="text-2xl font-bold">
            <Link className="hover:text-gray-300" to="/">
              Logo
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