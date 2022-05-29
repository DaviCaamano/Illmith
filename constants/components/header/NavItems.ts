import { NavItem } from '@interface/components/header/NavItem';

const explore: NavItem = {
  name: 'Explore',
  to: '/explore',
};

const kickstarter: NavItem = {
  name: 'Kickstarter',
  to: 'https://www.kickstarter.com',
  external: true,
};

export const adminSite: NavItem = {
  name: 'Admin',
  to: process.env.REACT_APP_ENV === 'prod' ? 'https://www.illmith.com/admin' : 'http://localhost:4000',
  external_same_page: true,
};

export const NavItems = [explore, kickstarter];
