import React, { FC } from 'react';

import {Props} from './types';
import styles from './input.pcss';


export const Input: FC<Props> = (props) => {
    return (<input className={styles.input} {...props}/>);
};
