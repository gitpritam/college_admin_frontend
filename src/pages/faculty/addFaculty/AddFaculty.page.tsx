import React, { useState } from "react";
import Address from "../../../components/form/address/Address.component";
import type { IFaculty } from "../../../@types/interface/faculty.interface";
import z from "zod";
import { facultyValidationSchema } from "../../../validations/faculty.validation";
import { addressValidationSchema } from "../../../validations/address.validation";

function AddFacultyPage() {
  const [formData, setFormData] = React.useState<IFaculty>({
    first_name: "",
    middle_name: "",
    last_name: "",
    dob: "",
    phone_number: "",
    email: "",
    qualification: "",
    designation: "",
    department: "",
    experience: "",
    password: "",
    joining_date: "",
    current_address: {
      address: "",
      district: "",
      state: "",
      country: "",
      pincode: "",
    },
    permanent_address: {
      address: "",
      district: "",
      state: "",
      country: "",
      pincode: "",
    },
  });

  const [error, setError] = useState<
    | {
        first_name?: { errors: string[] };
        middle_name?: { errors: string[] };
        last_name?: { errors: string[] };
        dob?: { errors: string[] };
        phone_number?: { errors: string[] };
        email?: { errors: string[] };
        qualification?: { errors: string[] };
        designation?: { errors: string[] };
        department?: { errors: string[] };
        experience?: { errors: string[] };
        password?: { errors: string[] };
        joining_date?: { errors: string[] };
      }
    | undefined
  >(undefined);
  const [currentAddressError, setCurrentAddressError] = useState<
    | {
        address?: { errors: string[] };
        district?: { errors: string[] };
        state?: { errors: string[] };
        pincode?: { errors: string[] };
        country?: { errors: string[] };
      }
    | undefined
  >(undefined);
  const [permanentAddressError, setPermanentAddressError] = useState<
    | {
        address?: { errors: string[] };
        district?: { errors: string[] };
        state?: { errors: string[] };
        pincode?: { errors: string[] };
        country?: { errors: string[] };
      }
    | undefined
  >(undefined);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(name, value);
  };

  const handleReset = () => {
    setFormData({
      first_name: "",
      middle_name: "",
      last_name: "",
      dob: "",
      phone_number: "",
      email: "",
      qualification: "",
      designation: "",
      department: "",
      experience: "",
      password: "",
      joining_date: "",
      current_address: {
        address: "",
        district: "",
        state: "",
        country: "",
        pincode: "",
      },
      permanent_address: {
        address: "",
        district: "",
        state: "",
        country: "",
        pincode: "",
      },
    });
    setError(undefined);
    setCurrentAddressError(undefined);
    setPermanentAddressError(undefined);
    setIsSuccess(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(undefined);
    setCurrentAddressError(undefined);
    setPermanentAddressError(undefined);
    console.log(formData);
    try {
      const validateData = facultyValidationSchema
        .omit({ faculty_id: true, posted_by: true })
        .safeParse(formData);
      const currentAddressValidateData = addressValidationSchema.safeParse(
        formData.current_address
      );
      const permanentAddressValidateData = addressValidationSchema.safeParse(
        formData.permanent_address
      );

      if (!currentAddressValidateData.success) {
        const errors = z.treeifyError(
          currentAddressValidateData.error
        ).properties;
        setCurrentAddressError(errors);
      }
      if (!permanentAddressValidateData.success) {
        const errors = z.treeifyError(
          permanentAddressValidateData.error
        ).properties;
        setPermanentAddressError(errors);
      }
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

  console.log(error);
  return (
    <div className="flex w-full p-6 flex-col">
      <h1 className="main-heading font-bold text-xl mb-5">Add Faculty</h1>
      <form
        noValidate
        onSubmit={handleSubmit}
        className="faculty_form flex flex-col w-full"
      >
        <h1 className="text-lg font-bold mt-2">Basic Details</h1>
        <div className="form_group flex gap-3 my-1 flex-col lg:flex-row">
          <div className="form_field flex flex-col w-full gap-2">
            <label htmlFor="first_name">
              First Name<span className="text-red-500 font-bold">*</span>
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Input your first name"
              required
              value={formData.first_name}
              onChange={handleChange}
            />
            {error?.first_name && (
              <p className="text-red-500">* {error.first_name.errors[0]}</p>
            )}
          </div>
          <div className="form_field flex flex-col w-full gap-2">
            <label htmlFor="middle_name">Middle Name</label>
            <input
              id="middle_name"
              name="middle_name"
              placeholder="Middle Name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              onChange={handleChange}
              value={formData.middle_name}
            />
            {error?.middle_name && (
              <p className="text-red-500">* {error.middle_name.errors[0]}</p>
            )}
          </div>
          <div className="form_field flex flex-col w-full gap-2">
            <label htmlFor="last_name">
              Last Name<span className="text-red-500 font-bold">*</span>
            </label>
            <input
              id="last_name"
              name="last_name"
              placeholder="Last Name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
              onChange={handleChange}
              value={formData.last_name}
            />
            {error?.last_name && (
              <p className="text-red-500">* {error.last_name.errors[0]}</p>
            )}
          </div>
        </div>
        <div className="form_group flex gap-3 my-1 flex-col lg:flex-row">
          <div className="form_field flex flex-col w-full gap-2">
            <label htmlFor="dob">
              Date of Birth<span className="text-red-500 font-bold">*</span>
            </label>
            <input
              type="date"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              name="dob"
              id="dob"
              required
              onChange={handleChange}
              value={formData.dob}
            />
            {error?.dob && (
              <p className="text-red-500">* {error.dob.errors[0]}</p>
            )}
          </div>
          <div className="form_field flex flex-col w-full gap-2">
            <label htmlFor="phone_number">
              Phone Number<span className="text-red-500 font-bold">*</span>
            </label>
            <input
              id="phone_number"
              name="phone_number"
              placeholder="Phone Number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              type="tel"
              required
              onChange={handleChange}
              value={formData.phone_number}
            />
            {error?.phone_number && (
              <p className="text-red-500">* {error.phone_number.errors[0]}</p>
            )}
          </div>
          <div className="form_field flex flex-col w-full gap-2">
            <label htmlFor="email">
              Email<span className="text-red-500 font-bold">*</span>
            </label>
            <input
              id="email"
              name="email"
              placeholder="Email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              type="email"
              required
              onChange={handleChange}
              value={formData.email}
            />
            {error?.email && (
              <p className="text-red-500">* {error.email.errors[0]}</p>
            )}
          </div>
        </div>
        <div className="form_group flex gap-3 my-1 flex-col lg:flex-row">
          <div className="form_field flex flex-col w-full gap-2">
            <label htmlFor="qualification">
              Qualification<span className="text-red-500 font-bold">*</span>
            </label>
            <input
              id="qualification"
              name="qualification"
              placeholder="Qualification"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
              onChange={handleChange}
              value={formData.qualification}
            />
            {error?.qualification && (
              <p className="text-red-500">* {error.qualification.errors[0]}</p>
            )}
          </div>
          <div className="form_field flex flex-col w-full gap-2">
            <label htmlFor="designation">
              Designation<span className="text-red-500 font-bold">*</span>
            </label>
            <input
              id="designation"
              name="designation"
              placeholder="Designation"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
              onChange={handleChange}
              value={formData.designation}
            />
            {error?.designation && (
              <p className="text-red-500">* {error.designation.errors[0]}</p>
            )}
          </div>
          <div className="form_field flex flex-col w-full gap-2">
            <label htmlFor="department">
              Department<span className="text-red-500 font-bold">*</span>
            </label>
            <input
              id="department"
              name="department"
              placeholder="Department"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
              onChange={handleChange}
              value={formData.department}
            />
            {error?.department && (
              <p className="text-red-500">* {error.department.errors[0]}</p>
            )}
          </div>
        </div>
        <div className="form_group flex gap-3 my-1 flex-col lg:flex-row">
          <div className="form_field flex flex-col w-full gap-2">
            <label htmlFor="experience">
              Experience<span className="text-red-500 font-bold">*</span>
            </label>
            <input
              id="experience"
              name="experience"
              placeholder="Experience"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
              onChange={handleChange}
              value={formData.experience}
            />
            {error?.experience && (
              <p className="text-red-500">* {error.experience.errors[0]}</p>
            )}
          </div>
          <div className="form_field flex flex-col w-full gap-2">
            <label htmlFor="password">
              Password<span className="text-red-500 font-bold">*</span>
            </label>
            <input
              id="password"
              name="password"
              placeholder="Password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              type="password"
              required
              onChange={handleChange}
              value={formData.password}
            />
            {error?.password && (
              <p className="text-red-500">* {error.password.errors[0]}</p>
            )}
          </div>
          <div className="form_field flex flex-col w-full gap-2">
            <label htmlFor="joining_date">
              Joining Date<span className="text-red-500 font-bold">*</span>
            </label>
            <input
              type="date"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              name="joining_date"
              id="joining_date"
              required
              onChange={handleChange}
              value={formData.joining_date}
            />
            {error?.joining_date && (
              <p className="text-red-500">* {error.joining_date.errors[0]}</p>
            )}
          </div>
        </div>
        <div>
          <h1 className="text-lg font-bold mt-2">Current Address</h1>
          <Address
            error={currentAddressError}
            input={formData.current_address}
            setInput={(value) =>
              setFormData((prev) => ({
                ...prev,
                current_address:
                  typeof value === "function"
                    ? value(prev.current_address)
                    : value,
              }))
            }
          />
          <h1 className="text-lg font-bold mt-2">Permanent Address</h1>
          <Address
            error={permanentAddressError}
            input={formData.permanent_address}
            setInput={(value) =>
              setFormData((prev) => ({
                ...prev,
                permanent_address:
                  typeof value === "function"
                    ? value(prev.permanent_address)
                    : value,
              }))
            }
          />
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
            <span>Faculty added successfully.</span>
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
            <span>Failed to add faculty.</span>
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
export default AddFacultyPage;
