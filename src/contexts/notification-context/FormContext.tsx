import { PropsWithChildren, createContext } from 'react';

type FormContextType = PropsWithChildren & {
  formValue: any;
  setFormValue: (value: any) => void;
};

export const FormContext = createContext<FormContextType>({} as FormContextType);
