import { BreadcrumbsProps } from '@mui/material/Breadcrumbs';



export type BreadcrumbsLinkProps = {
  name?: string;
  href?: string;
  icon?: React.ReactElement;
};

export interface CustomBreadcrumbsProps extends BreadcrumbsProps {
  heading?: string;
  moreLink?: string[];
  activeLast?: boolean;
  actionRouter?: {
    type: 'list' | 'create';
    route?: string;
    onClick?: () => void;
    label: string;
    disabled?: boolean;
  };
  action?: React.ReactNode;
  links?: BreadcrumbsLinkProps[];
}
