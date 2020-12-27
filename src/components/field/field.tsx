import React, { FC } from 'react';

import { Props } from './types';
import styles from './field.pcss';

export const Field: FC<Props> = (props) => {
    const {children, label, isError} = props;
    
    return (
        <div className={styles.field}>
            <label className={styles.field__label}>{label}</label>
            {children}
            {isError ? <span className={styles.error}>Поле обязательно для заполнения</span> : null}
        </div>
    )
};
