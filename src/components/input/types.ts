import { ChangeEvent, EventHandler } from 'react';

export type Props = {
    name?: string,
    placeholder?: string,
    value?: string | number,
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void,
    onBlur?: (event: EventHandler<any>) => void,
    className?: string,
    type?: string,
    isError?: boolean 
}