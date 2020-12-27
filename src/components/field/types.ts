import { ReactNode } from 'react';

export type Props = {
    children: ReactNode,
    label?: string,
    error?: string,
    disabled?: boolean
};