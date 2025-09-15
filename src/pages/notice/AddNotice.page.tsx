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
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
        className="notice_form flex flex-col w-full "
      >
        <h1 className="text-lg font-bold mt-2">Basic Details</h1>
        <div className="form_group flex gap-3 my-1 flex-col">
          <div className="flex flex-col lg:flex-row gap-2 ">
            <div className="form_field flex flex-col gap-2  grow">
              <label htmlFor="title">
                title<span className="text-red-500 font-bold">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 "
                placeholder="Input notice title"
                required
                value={formData.title}
                onChange={handleChange}
              />

              {error?.title && (
                <p className="text-red-500">* {error.title.errors[0]}</p>
              )}
            </div>

            <div className="form_field flex flex-col gap-2 grow lg:max-w-[25%]">
              <label htmlFor="year">
                year<span className="text-red-500 font-bold">*</span>
              </label>
              <input
                type="number"
                id="year"
                name="year"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 "
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

          <div className="form_field flex flex-col grow gap-2  ">
            <label htmlFor="description">
              description
              <span className="text-red-500 font-bold text-lg">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 placeholder:absolute placeholder:top-2 placeholder:left-3 placeholder:text-gray-400"
              placeholder="Input notice description"
              required
              value={formData.description}
              onChange={handleChange}
              rows={10}
            />
            {error?.description && (
              <p className="text-red-500">* {error.description.errors[0]}</p>
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
      {isSuccess && (
        <div
          className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 relative"
          role="alert"
        >
          <div className="flex items-center justify-between">
            <span>Notice added successfully.</span>
            <button
              type="button"
              onClick={() => setIsSuccess(null)}
              className="ml-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700"
              aria-label="Close"
            >
              <span className="sr-only">Close</span>
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
      {!isSuccess && isSuccess !== null && (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 relative"
          role="alert"
        >
          <div className="flex items-center justify-between">
            <span>Failed to add notice.</span>
            <button
              type="button"
              onClick={() => setIsSuccess(null)}
              className="ml-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"
              aria-label="Close"
            >
              <span className="sr-only">Close</span>
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default AddNoticePage;
