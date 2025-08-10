import mongoose from 'mongoose';

const fieldSchema = new mongoose.Schema({
  label: { type: String, required: true },
  type: { type: String, required: true }, 
  required: { type: Boolean, default: false },
  options: { type: [String], default: [] } 
});

const formSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    fields: {
      type: [fieldSchema],
      required: true
    }
  },
  { timestamps: true }
);

const Form = mongoose.model('Form', formSchema);

export default Form;