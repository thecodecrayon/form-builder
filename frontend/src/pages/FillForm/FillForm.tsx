import { useState } from "react";

type Field = {
  _id: string;
  label: string;
  type: string;
  required: boolean;
  options: string[];
};

type FillFormProps = {
  form: {
    title: string;
    description?: string;
    fields: Field[];
  };
};

const FillForm = ({ form }: FillFormProps) => {
  const [formData, setFormData] = useState<Record<string, any>>({});

  if (!form) return <p>No form data available</p>;

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{form.title}</h2>
      {form.description && <p>{form.description}</p>}

      {form.fields.map((field) => {
        const name = field._id; 

        switch (field.type) {
          case "textarea":
            return (
              <div key={field._id}>
                <label>{field.label}:</label>
                <textarea
                  required={field.required}
                  name={name}
                  onChange={(e) => handleChange(name, e.target.value)}
                />
              </div>
            );

          case "select":
            return (
              <div key={field._id}>
                <label>{field.label}:</label>
                <select
                  required={field.required}
                  name={name}
                  onChange={(e) => handleChange(name, e.target.value)}
                >
                  <option value="">Select...</option>
                  {field.options.map((opt, i) => (
                    <option key={i} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            );

          case "checkbox":
            return (
              <div key={field._id}>
                <label>{field.label}:</label>
                {field.options.length > 0 ? (
                  field.options.map((opt, i) => (
                    <label key={i} style={{ marginLeft: "10px" }}>
                      <input
                        type="checkbox"
                        name={name}
                        value={opt}
                        onChange={(e) => {
                          const selected = formData[name] || [];
                          if (e.target.checked) {
                            handleChange(name, [...selected, opt]);
                          } else {
                            handleChange(
                              name,
                              selected.filter((v: string) => v !== opt)
                            );
                          }
                        }}
                      />
                      {opt}
                    </label>
                  ))
                ) : (
                  <input
                    type="checkbox"
                    name={name}
                    required={field.required}
                    onChange={(e) => handleChange(name, e.target.checked)}
                  />
                )}
              </div>
            );

          case "radio":
            return (
              <div key={field._id}>
                <label>{field.label}:</label>
                {field.options.map((opt, i) => (
                  <label key={i} style={{ marginLeft: "10px" }}>
                    <input
                      type="radio"
                      name={name}
                      value={opt}
                      required={field.required}
                      onChange={(e) => handleChange(name, e.target.value)}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            );

          case "file":
            return (
              <div key={field._id}>
                <label>{field.label}:</label>
                <input
                  type="file"
                  name={name}
                  required={field.required}
                  onChange={(e) => handleChange(name, e.target.files?.[0] || null)}
                />
              </div>
            );

          default:
            return (
              <div key={field._id}>
                <label>{field.label}:</label>
                <input
                  type={field.type}
                  name={name}
                  required={field.required}
                  onChange={(e) => handleChange(name, e.target.value)}
                />
              </div>
            );
        }
      })}

      <button type="submit">Submit</button>
    </form>
  );
};

export default FillForm;

