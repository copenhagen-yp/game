import { ChangeEvent, FocusEvent } from 'react';

export type Props = {
    name: string,
    placeholder?: string,
    value?: string | number,
    onChange?: (event: ChangeEvent<HTMLInputElement> | null) => void,
    onBlur?: (event: FocusEvent<HTMLInputElement> | null) => void,
    className?: string,
    type?: string,
    error?: {value: boolean, text: string} 
}
