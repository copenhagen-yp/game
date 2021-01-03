import { ReactNode } from 'react';

export type Props = {
    className?: string;
    type?: 'submit' | 'button' | 'reset';
    disabled?: boolean;
    viewType?: 'link' | 'icon' | 'button' ;
    onClick?: () => void;
    children: ReactNode;
};