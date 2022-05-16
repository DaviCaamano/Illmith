export interface HeaderItem {
  name: string;
  to: string;
  external?: boolean;
  external_same_page?: boolean;
}

const explore: HeaderItem = {
  name: 'Explore',
  to: '/explore',
};

const kickstarter: HeaderItem = {
  name: 'Kickstarter',
  to: 'https://www.kickstarter.com',
  external: true,
};

const adminSite: HeaderItem = {
  name: 'Admin',
  to: process.env.REACT_APP_ENV === 'prod' ? 'https://www.illmith.com/admin' : 'http://localhost:4000',
  external_same_page: true,
};

export const getHeaderElements = (admin?: boolean): HeaderItem[] => {
  const items: HeaderItem[] = [explore, kickstarter];

  const adminItems = [adminSite];
  if (admin) {
    items.push(...adminItems);
  }
  return items;
};
