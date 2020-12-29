import { ReactNode } from 'react';

export type Props = {
    children: ReactNode,
    label?: string,
    isError?: boolean,
    className?: string
};