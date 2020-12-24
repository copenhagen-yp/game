import React from 'react';

export type Props = {
    className?: string;
    tagType?: 'link' | 'button';
    type?: 'submit' | 'button' | 'reset';
    disabled?: boolean;
    onClick: (e: React.MouseEvent) => void;
    children: React.ReactNode;
};