export type Options = {
    method?: string,
    headers?: Headers,
    body?: string
};

export type Fields = {[index:string]:string};
export type Error = {[index:string]:{value: boolean, text: string}};
