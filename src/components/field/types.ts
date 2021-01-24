import { ReactNode } from 'react';

export type Props = {
    children: ReactNode,
    label?: string,
    error?: {value: boolean, text: string},
    className?: string
};
