import { Field } from "../../../pages/FillForm/types";

export interface FormRadioButtonsProps {
  field: Form;
  name: string;
  handleChange: (name: string, value: any) => void;
}