// import { useHistory } from "react-router-dom";
// import React from "react";


// export default function DashNav() {
//     const profile = () => history.push("/profile");
//     const dashboard = () => history.push("/dashboard");
//     const customers = () => history.push("/customers")
//     const logout = () => {
//         /* eslint-disable */
//         const toLogout = confirm("Are you sure to logout ?");
//         /* eslint-enable */
//         if (toLogout) {
//           localStorage.clear();
//           history.push("/login");
//         }
//       };
    
//     const history = useHistory();

//     return(
//         <nav className="navbar_container">
//           <ul className="navbar-nav">
//           <li className="nav-item">
//               <span
//                 className="nav-link cursor-pointer"
//                 onClick={() => dashboard()}
//               >
//                 Dashboard
//               </span>
//             </li>
//             <li className="nav-item">
//               <span
//                 className="nav-link cursor-pointer"
//                 onClick={() => customers()}
//               >
//                 Customers
//               </span>
//             </li>
//             <li className="nav-item">
//               <span
//                 className="nav-link cursor-pointer"
//                 onClick={() => profile()}
//               >
//                 Account
//               </span>
//             </li>
//             <li className="nav-item">
//               <span
//                 className="nav-link cursor-pointer"
//                 onClick={() => logout()}
//               >
//                 Logout
//               </span>
//             </li>
//           </ul>
//         </nav>
//     )
// }

import React from 'react';
import { useHistory, useLocation } from "react-router-dom";

import {Navigation} from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';

export default function DashNav() {
  const history = useHistory();
  const location = useLocation();

  return (
      <>
        <Navigation
            // you can use your own router's api to get pathname
            activeItemId={location.pathname}
            onSelect={({itemId}) => {
              history.push(itemId);
            }}
            items={[
              {
                title: 'Dashboard',
                itemId: '/dashboard',
                // you can use your own custom Icon component as well
                // icon is optional
              },
              {
                title: 'Accounts',
                itemId: 'accounts/profile',
                subNav: [
                  {
                    title: 'Accounts List',
                    itemId: '/accounts/all',
                  },
                  {
                    title: 'My Account',
                    itemId: '/accounts/profile',
                  },
                  {
                    title: 'Add New',
                    itemId: '/accounts/add',
                  }
                ],
              },
              {
                title: 'Rep Management',
                itemId: '/rep_management',
                // you can use your own custom Icon component as well
                // icon is optional
              },
              {
                title: 'Products',
                itemId: '/products/all',
                subNav: [
                  {
                    title: 'Products List',
                    itemId: '/products/all',
                  },
                  {
                    title: 'Product Detail',
                    itemId: '/products/detail',
                  },
                  {
                    title: 'Add New',
                    itemId: '/products/add',
                  },
                ],
              },
              {
                title: 'Customers',
                itemId: '/customers',
                subNav: [
                  {
                    title: 'Projects',
                    itemId: '/customers/projects',
                  },
                  {
                    title: 'Members',
                    itemId: '/customers/members',
                  },
                ],
              },
              {
                title:'Analytics',
                itemId: '/analytics'
              }
            ]}
          />
      </>
    );
}