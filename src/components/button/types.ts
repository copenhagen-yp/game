import React from 'react';

export type Props = {
    className?: string;
    type?: 'submit' | 'button' | 'reset';
    disabled?: boolean;
    viewType?: string;
    onClick: (e: React.MouseEvent) => void;
    children: React.ReactNode;
};