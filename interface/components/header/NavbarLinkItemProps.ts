export interface NavbarLinksItemProps {
  to: string;
  text: string;
  onClick: (...args: any[]) => any;
  firstItem?: boolean;
  lastItem?: boolean;
}
