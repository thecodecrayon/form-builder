interface FormField {
  label: string;
  type: string;
  required: boolean;
  options?: string[]; 
}

interface CreateFormProps {
  error: string | null,
  loading: boolean,
  title: string;
  description: string;
  handleTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDescription: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  fields: FormField[]; 
  addField: () => void;
  updateField: (index: number, key: keyof FormField, value: any) => void;
  addOption: (index: number, option: string) => void;
  removeField: (index: number) => void;
  removeOption: (fieldIndex: number, optionIndex: number) => void;
  handleSubmit: () => void;
}

const CreateForm = (props: CreateFormProps) => {

  const {
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
    handleSubmit
  } = props;

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "20px" }}>
      <h1>Create Form</h1>

      {/* Title */}
      <input
        type="text"
        placeholder="Form Title"
        value={title}
        onChange={handleTitle}
        style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
      />

      <textarea
        placeholder="Form Description"
        value={description}
        onChange={handleDescription}
        style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
      />

      <button
        type="button"
        onClick={addField}
        style={{ margin: "10px 0", padding: "8px 12px" }}
      >
        + Add Field
      </button>

      {fields?.map((field, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
          }}
        >
          <input
            type="text"
            placeholder="Field Label"
            value={field.label}
            onChange={(e) => updateField(index, "label", e.target.value)}
            style={{ marginRight: "10px", padding: "5px" }}
          />
          <select
            value={field.type}
            onChange={(e) => updateField(index, "type", e.target.value)}
            style={{ marginRight: "10px", padding: "5px" }}
          >
            <option value="text">Text</option>
            <option value="textarea">Textarea</option>
            <option value="number">Number</option>
            <option value="date">Date</option>
            <option value="email">Email</option>
            <option value="password">Password</option>
            <option value="select">Dropdown</option>
            <option value="checkbox">Checkbox</option>
            <option value="radio">Radio</option>
            <option value="file">File Upload</option>
          </select>
          <label>
            <input
              type="checkbox"
              checked={field.required}
              onChange={(e) => updateField(index, "required", e.target.checked)}
            />{" "}
            Required
          </label>
          <button
            type="button"
            onClick={() => removeField(index)}
            style={{ marginLeft: "10px", color: "red" }}
          >
            Remove
          </button>

          {(field.type === "select" ||
            field.type === "checkbox" ||
            field.type === "radio") && (
            <div style={{ marginTop: "10px" }}>
              <h4>Options</h4>
              {(field.options || []).map((opt, optIndex) => (
                <div key={optIndex} style={{ display: "flex", marginBottom: "5px" }}>
                  <input
                    type="text"
                    value={opt}
                    onChange={(e) => {
                      const updated = [...(field.options || [])];
                      updated[optIndex] = e.target.value;
                      updateField(index, "options", updated);
                    }}
                    style={{ flex: 1, padding: "5px" }}
                  />
                  <button
                    type="button"
                    onClick={() => removeOption(index, optIndex)}
                    style={{ marginLeft: "5px", color: "red" }}
                  >
                    X
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addOption(index, "")}
                style={{ marginTop: "5px" }}
              >
                + Add Option
              </button>
            </div>
          )}
        </div>
      ))}

      <button
        onClick={handleSubmit}
        style={{ marginTop: "20px", padding: "10px 20px" }}
      >
        Save Form
      </button>
    </div>
  );
};

export default CreateForm;
