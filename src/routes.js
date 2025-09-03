import React from 'react';

import { Icon } from '@chakra-ui/react';
import {
  MdBarChart,
  MdPerson,
  MdHome,
} from 'react-icons/md';

// Admin Imports
import Usuario from 'views/admin/usuario';
import Nutricionista from 'views/admin/nuticionista'
import Dieta from 'views/admin/dieta';

// Auth Imports
import Landing from 'views/admin/landing';

const routes = [
  // {
  //   name: 'Main Dashboard',
  //   layout: '/admin',
  //   path: '/default',
  //   icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
  //   component: <MainDashboard />,
  // },
  {
    name: 'Land Page',
    layout: '/admin',
    path: '/landing',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: <Landing />,
  },
  // {
  //   name: 'NFT Marketplace',
  //   layout: '/admin',
  //   path: '/nft-marketplace',
  //   icon: (
  //     <Icon
  //       as={MdOutlineShoppingCart}
  //       width="20px"
  //       height="20px"
  //       color="inherit"
  //     />
  //   ),
  //   component: <NFTMarketplace />,
  //   secondary: true,
  // },
  {
    name: 'Tabela Usuários',
    layout: '/admin',
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    path: '/usuario',
    component: <Usuario />,
  },
  // {
  //   name: 'Profile',
  //   layout: '/admin',
  //   path: '/profile',
  //   icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
  //   component: <Profile />,
  // },
  {
    name: 'Tabela Nutricionistas',
    layout: '/admin',
    path: '/nutricionista',
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: <Nutricionista />,
  },
  {
    name: 'Tabela Dietas',
    layout: '/admin',
    path: '/dieta',
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: <Dieta />,
  },

];

export default routes;
