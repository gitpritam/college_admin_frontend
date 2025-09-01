import React, { useState } from "react";
import type { INotice } from "../../@types/interface/notice.interface";
import { noticeValidationSchema } from "../../validations/notice.validation";
import z from "zod";

function AddNoticePage() {
  const [formData, setFormData] = React.useState<INotice>({
    title: "",
    description: "",
    year: 0,
  });
  const [error, setError] = useState<
    | {
        title?: { errors: string[] };
        description?: { errors: string[] };
        year?: { errors: string[] };
      }
    | undefined
  >(undefined);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(name, value);
  };

  const handleReset = () => {
    setFormData({
      title: "",
      description: "",
      year: 0,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(undefined);
    try {
      const validateData = noticeValidationSchema
        .omit({ notice_id: true, posted_by: true })
        .safeParse(formData);
      console.log("Validated data:", validateData);
      if (!validateData.success) {
        const errors = z.treeifyError(validateData.error).properties;
        console.log(errors);
        setError(errors);
      }

      console.log(validateData.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="flex w-full p-6 flex-col">
      <h1 className="main-heading font-bold text-xl mb-5">Add Notice</h1>
      <form
        noValidate
        onSubmit={handleSubmit}
        className="notice_form flex flex-col w-full"
      >
        <h1 className="text-lg font-bold mt-2">Basic Details</h1>
        <div className="form_group flex gap-3 my-1 flex-col lg:flex-row">
          <div className="form_field flex flex-col w-full gap-2">
            <label htmlFor="title">
              title<span className="text-red-500 font-bold">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Input notice title"
              required
              value={formData.title}
              onChange={handleChange}
            />
            {error?.title && (
              <p className="text-red-500">* {error.title.errors[0]}</p>
            )}
          </div>
          <div className="form_field flex flex-col w-full gap-2">
            <label htmlFor="description">
              description<span className="text-red-500 font-bold">*</span>
            </label>
            <input
              type="text"
              id="description"
              name="description"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Input notice description"
              required
              value={formData.description}
              onChange={handleChange}
            />
            {error?.description && (
              <p className="text-red-500">* {error.description.errors[0]}</p>
            )}
          </div>
          <div className="form_field flex flex-col w-full gap-2">
            <label htmlFor="year">
              year<span className="text-red-500 font-bold">*</span>
            </label>
            <input
              type="number"
              id="year"
              name="year"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Input notice year"
              required
              value={formData.year}
              onChange={handleChange}
            />
            {error?.year && (
              <p className="text-red-500">* {error.year.errors[0]}</p>
            )}
          </div>
        </div>
        <div className="button_group flex gap-3 my-5">
          <button
            type="submit"
            className="rounded-md bg-green-600 px-4 py-2 cursor-pointer text-white hover:bg-green-700"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="rounded-md bg-red-600 px-4 py-2 cursor-pointer text-white hover:bg-red-700"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
export default AddNoticePage;
