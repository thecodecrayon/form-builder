import useFormData from "../../hooks/useFormData.js";
import FillForm from "../../pages/FillForm/FillForm.js";

const FillFormView = () => {
  const {
    forms
  } = useFormData();

  return (
    <FillForm
      form={forms?.[0]} />
  );
}

export default FillFormView;