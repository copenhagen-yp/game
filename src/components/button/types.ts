import { ReactNode } from 'react';

export type Props = {
    className?: string;
    type?: 'submit' | 'button' | 'reset';
    disabled?: boolean;
    viewType?: string;
    onClick: () => void;
    children: ReactNode;
};