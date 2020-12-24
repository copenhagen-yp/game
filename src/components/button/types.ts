import React from 'react';

export type Props = {
    className?: string;
    tagType?: 'link' | 'button';
    type?: 'submit' | 'button' | 'reset';
    onClick: (e: React.MouseEvent) => void;
    children: React.ReactNode;
};