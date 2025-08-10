type Field = {
  _id: string;
  label: string;
  type: string;
  required: boolean;
  options: string[];
};

type FormProps = {
  form: {
    _id: string;
    title: string;
    description?: string;
    fields: Field[];
  };
};

const Form = ({ form }: FormProps) => {
  if (!form) return <p>No form data available</p>;

  return (
    <form>
      <h2>{form.title}</h2>
      {form.description && <p>{form.description}</p>}

      {form.fields.map((field) => {
        switch (field.type) {
          case "textarea":
            return (
              <div key={field._id}>
                <label>{field.label}</label>
                <textarea required={field.required} />
              </div>
            );
          case "select":
            return (
              <div key={field._id}>
                <label>{field.label}</label>
                <select required={field.required}>
                  {field.options.map((opt, i) => (
                    <option key={i} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            );
          default:
            return (
              <div key={field._id}>
                <label>{field.label}</label>
                <input type={field.type} required={field.required} />
              </div>
            );
        }
      })}

      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
