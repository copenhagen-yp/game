import { ChangeEvent, FocusEvent } from 'react';

export type Props = {
    name: string,
    placeholder?: string,
    value?: string | number,
    onChange?: (event: ChangeEvent<HTMLTextAreaElement> | null) => void,
    onBlur?: (event: FocusEvent<HTMLTextAreaElement> | null) => void,
    className?: string,
    type?: string,
    error?: {value: boolean, text: string} 
}
