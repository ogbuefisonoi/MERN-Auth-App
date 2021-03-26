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
            activeItemId={location.pathname}
            onSelect={({itemId}) => {
              history.push(itemId);
            }}
            items={[
              {
                title: 'Dashboard',
                itemId: '/dashboard',
              },
              {
                title: 'Accounts',
                itemId: '/accounts/all',
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