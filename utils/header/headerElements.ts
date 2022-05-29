import { NavItem } from '@interface/components/header/NavItem';
import { NavItems, adminSite } from '@constants/components/header';

export const getHeaderElements = (admin?: boolean): NavItem[] => {
  const items = [...NavItems];
  const adminItems = [adminSite];
  if (admin) {
    items.push(...adminItems);
  }
  return items;
};
