import useFormData from "../hooks/useFormData.js";
import Form from "../pages/form.js";

const FormView = () => {
  const {
    forms, loading, error
  } = useFormData();

  return (
    <Form
      form={forms?.[0]} />
  );
}

export default FormView;