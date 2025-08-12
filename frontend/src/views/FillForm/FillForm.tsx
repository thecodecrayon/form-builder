import useFormData from "../../hooks/useFormData.js";
import useFormDetail from "../../hooks/useFormDetail.js";
import FillForm from "../../pages/FillForm/FillForm.js";

const FillFormView = () => {
  const {
    form,
    loading,
    error
  } = useFormDetail();

  return (
    <FillForm
      error={error}
      loading={loading}
      form={form} />
  );
}

export default FillFormView;