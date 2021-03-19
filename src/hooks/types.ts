export type Options = {
  method?: string;
  headers?: Headers;
  body?: any;
};

export type Fields = { [index: string]: string };
export type Error = { [index: string]: { value: boolean; text: string } };

export type TForum = {
  id: number;
  title: string;
  description?: string;
  Author: {
    firstName;
    lastName;
  };
};

export type TComment = {
  id: number;
  idForum: number;
  message: string;
  Author: {
    firstName;
    lastName;
  };
};

export type UseFormProps = {
  requiredFields: string[];
  successResult?: string;
  url?: string;
  method?: string;
};
