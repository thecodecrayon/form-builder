import useFormDetail from "../../hooks/useFormDetail.js";
import FillForm from "../../pages/FillForm/FillForm.js";

const FillFormView = () => {
  const {
    form,
    loading,
    error,
    formData,
    isSubmitting,
    filePreviews,
    handleSubmit,
    handleFileChange,
    handleChange
  } = useFormDetail();

  return (
    <FillForm
      error={error}
      loading={loading}
      form={form}
      formData={formData}
      isSubmitting={isSubmitting}
      filePreviews={filePreviews}
      handleSubmit={handleSubmit}
      handleFileChange={handleFileChange}
      handleChange={handleChange} />
  );
}

export default FillFormView;