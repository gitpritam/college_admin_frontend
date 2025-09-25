import React, { useState } from "react";
import type { INotice } from "../../@types/interface/notice.interface";
import { noticeValidationSchema } from "../../validations/notice.validation";
import z from "zod";
import api from "../../config/axios.config";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { FaSpinner } from "react-icons/fa";

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
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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
    setLoading(true);
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
      const response = await api.post("/notice", validateData.data);
      if (response.status === 201) {
        handleReset();
        toast("Notice added successfully", { type: "success" });
      }
      console.log(response);
    } catch (error) {
      console.error("Error submitting form:", error);
      if (error instanceof AxiosError) {
        toast(error.response?.data?.message || "Failed to add notice", {
          type: "error",
        });
      } else {
        toast("Something went wrong", { type: "error" });
      }
    } finally {
      setLoading(false);
    }
  };

  //  useEffect(()=>{
  //   const postData = async()=>{
  //     try {

  //     } catch (error) {

  //     }
  //   }

  //   postData();
  //  },[]);

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
                Title<span className="text-red-500 font-bold">*</span>
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
                Year<span className="text-red-500 font-bold">*</span>
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
              Description
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
            disabled={loading}
          >
            {loading ? (
              <FaSpinner className="animate-spin text-white" size={16} />
            ) : (
              "Submit"
            )}
          </button>
          <button
            type="button"
            onClick={handleReset}
            disabled={loading}
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
