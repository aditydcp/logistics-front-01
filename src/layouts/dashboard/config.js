import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import UserPlusIcon from '@heroicons/react/24/solid/UserPlusIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import XCircleIcon from '@heroicons/react/24/solid/XCircleIcon';
import { SvgIcon } from '@mui/material';
import DocumentTextIcon from '@heroicons/react/24/solid/DocumentTextIcon'
import TruckIcon from '@heroicons/react/24/solid/TruckIcon'
import FlightIcon from '@mui/icons-material/Flight';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import FlightRoundedIcon from '@mui/icons-material/FlightRounded';
import LocalShippingRoundedIcon from '@mui/icons-material/LocalShippingRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import SupervisorAccountRoundedIcon from '@mui/icons-material/SupervisorAccountRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';

export const items = [
  {
    title: 'Shipments',
    path: '/',
    icon: (
      <SvgIcon fontSize="small">
        <AssignmentRoundedIcon />
      </SvgIcon>
    )
  },
  // {
  //   title: 'Customers',
  //   path: '/customers',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <UsersIcon />
  //     </SvgIcon>
  //   )
  // },
  {
    title: 'Flights',
    path: '/flights',
    icon: (
      <SvgIcon fontSize="small">
        <FlightRoundedIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Exporters & Importers',
    path: '/companies',
    icon: (
      <SvgIcon fontSize="small">
        <LocalShippingRoundedIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Employees',
    path: '/employees',
    role: ['manager', 'admin'],
    icon: (
      <SvgIcon fontSize="small">
        <SupervisorAccountRoundedIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Account',
    path: '/account',
    icon: (
      <SvgIcon fontSize="small">
        <AccountCircleRoundedIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: (
      <SvgIcon fontSize="small">
        <SettingsRoundedIcon />
      </SvgIcon>
    )
  },
  // {
  //   title: 'Login',
  //   path: '/auth/login',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <LockClosedIcon />
  //     </SvgIcon>
  //   )
  // },
  // {
  //   title: 'Register',
  //   path: '/auth/register',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <UserPlusIcon />
  //     </SvgIcon>
  //   )
  // },
  // {
  //   title: 'Error',
  //   path: '/404',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <XCircleIcon />
  //     </SvgIcon>
  //   )
  // }
];
