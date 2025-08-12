import type { Field } from "../../../pages/FillForm/types";

export interface FormDefaultProps {
  field: Field;
  name: string;
  handleChange: (name: string, value: any) => void;
}