import { ChangeEvent, FocusEvent } from 'react';

export type Props = {
    name?: string,
    placeholder?: string,
    value?: string | number,
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void,
    onBlur?: (event: FocusEvent<any>) => void,
    className?: string,
    type?: string,
    isError?: boolean
}
