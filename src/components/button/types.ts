import React from "react";

export type Props = {
    className?: string;
    disabled?: boolean;
    type?: string;
    color?: string;
    onClick: () => void;
    children: React.ReactNode;
};