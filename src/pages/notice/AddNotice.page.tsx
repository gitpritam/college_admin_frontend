import React from "react";
import type { INotice } from "../../@types/interface/notice.interface";
function AddNoticePage() {
  const [formData, setFormData] = React.useState<INotice>({
    title: "",
    description: "",
    year: 0,
    });
 

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="flex w-full p-6 flex-col">
      <h1 className="main-heading font-bold text-xl mb-5">Add Notice</h1>
      <form
        onSubmit={handleSubmit}
        className="notice_form flex flex-col w-full"
      >
        <h1 className="text-lg font-bold mt-2">Basic Details</h1>
        <div className="form_group flex gap-3 my-1 flex-col lg:flex-row">
          <div className="form_field flex flex-col w-full gap-2">
            <label htmlFor="title">
              First Name<span className="text-red-500 font-bold">*</span>
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
          </div> 
          <div className="form_field flex flex-col w-full gap-2">
            <label htmlFor="yearl">
              Email<span className="text-red-500 font-bold">*</span>
            </label>
            <input
              id="year"
              name="year"
              placeholder="Year"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              type="year"
              required
              onChange={handleChange}
              value={formData.year}
            />
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
            onClick={ handleReset}
            className="rounded-md bg-red-600 px-4 py-2 cursor-pointer text-white hover:bg-red-700"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  ); };
export default AddNoticePage;
