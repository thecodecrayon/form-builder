import useCreateForm from "../../hooks/useCreateFrom";
import CreateForm from "../../pages/CreateForm/CreateForm";

const CreateFormView = () => {
  const {
    error,
    loading,
    title,
    description,
    handleTitle,
    handleDescription,
    fields,
    addField,
    updateField,
    addOption,
    removeField,
    removeOption,
    handleSubmit,
    isSubmitting,
    isPreviewOpen,
    handlePreviewClick
  } = useCreateForm();

  return (
    <CreateForm
      error={error}
      loading={loading}
      title={title}
      description={description}
      handleTitle={handleTitle}
      handleDescription={handleDescription}
      fields={fields}
      addField={addField}
      updateField={updateField}
      addOption={addOption}
      removeField={removeField}
      removeOption={removeOption}
      handleSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      isPreviewOpen={isPreviewOpen}
      handlePreviewClick={handlePreviewClick} />
  )
}

export default CreateFormView;