import { asyncHandler } from "../utils/asyncHandler.js";
import Form from "../models/form.model.js";

export const getForms = asyncHandler(async (req, res) => {

  const forms = await Form.find({}, {
    title: 1,
    description: 1,
    _id: 1,
    createdAt: 1
  });

  if(!forms)
    throw new Error("Unable to fetch forms. Some error occured!");

  return res.status(200).json({
    status: "success",
    forms,
    msg: "forms loaded successfully."
  })
});

export const getFormById = asyncHandler(async (req, res) => {
  const { formId } = req.params;

  const form = await Form.findById(formId).select('-_id title description fields');

  if(!form) 
    throw new Error("Unable to find form with the given ID.");

  return res.status(200).json({
    status: true,
    form,
    msg: "Form fetched successfully."
  })
})

export const createForm = asyncHandler(async (req, res) => {

  const {
    title,
    description,
    fields
  } = req.body;

  const form = await Form.create({
    title,
    description,
    fields
  });

  if(!form)
    throw new Error("Unable to create form. Some error occured!");

  return res.status(201).json({
    status: true,
    msg: "form created successfully."
  });
});

