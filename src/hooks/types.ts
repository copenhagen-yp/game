export type Options = {
    method?: string,
    headers?: Headers,
    body?: any
};

export type Fields = {[index:string]:string};
export type Error = {[index:string]:{value: boolean, text: string}};

export type TForum = {
    id: number,
    name: string,
    description?: string
};

export type TComment = {
    id: number,
    idForum: number,
    comment: string
};
