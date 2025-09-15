import React, { useState } from "react";
import type { IStudent } from "../../../@types/interface/student.interface";
import Address from "../../../components/form/address/Address.component";
import { z } from "zod";
import { studentValidationSchema } from "../../../validations/student.validation";

function AddStudentPage() {
  const [formData, setFormData] = useState<IStudent>({
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    dob: "",
    guardian_name: "",
    guardian_phone_number: "",
    guardian_email: "",
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
    department: "",
    year_of_admission: 0,
    year_of_passing: 0,
    remark: "",
  });

  const [error, setError] = useState<
    | {
        first_name?: { errors: string[] };
        middle_name?: { errors: string[] };
        last_name?: { errors: string[] };
        email?: { errors: string[] };
        phone_number?: { errors: string[] };
        dob?: { errors: string[] };
        guardian_name?: { errors: string[] };
        guardian_phone_number?: { errors: string[] };
        guardian_email?: { errors: string[] };
        current_address?: { errors: string[] };
        permanent_address?: { errors: string[] };
        department?: { errors: string[] };
        year_of_admission?: { errors: string[] };
        year_of_passing?: { errors: string[] };
        remark?: { errors: string[] };
      }
    | undefined
  >(undefined);

  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormData({
      first_name: "",
      middle_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      dob: "",
      guardian_name: "",
      guardian_phone_number: "",
      guardian_email: "",
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
      department: "",
      year_of_admission: 0,
      year_of_passing: 0,
      remark: "",
    });
    setError(undefined);
  };

  const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(undefined);
        try {
          const validateData = studentValidationSchema
            .omit({ student_id: true, posted_by: true })
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
      <h1 className="main-heading font-bold text-xl mb-5">Add Student</h1>
      <form noValidate onSubmit={handleSubmit} className="student_form flex flex-col w-full">
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
              placeholder="Input your first name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              required
              value={formData.first_name}
              onChange={handleChange}
            />
            {error?.first_name && <p className="text-red-500">* {error.first_name.errors[0]}</p>}
          </div>
          <div className="form_field flex flex-col w-full gap-2">
            <label htmlFor="middle_name">Middle Name</label>
            <input
              id="middle_name"
              name="middle_name"
              placeholder="Middle Name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              value={formData.middle_name}
              onChange={handleChange}
            />
            {error?.middle_name && <p className="text-red-500">* {error.middle_name.errors[0]}</p>}
          </div>
          <div className="form_field flex flex-col w-full gap-2">
            <label htmlFor="last_name">
              Last Name<span className="text-red-500 font-bold">*</span>
            </label>
            <input
              id="last_name"
              name="last_name"
              placeholder="Last Name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              required
              value={formData.last_name}
              onChange={handleChange}
            />
            {error?.last_name && <p className="text-red-500">* {error.last_name.errors[0]}</p>}
          </div>
        </div>

        <div className="form_group flex gap-3 my-1 flex-col lg:flex-row">
          <div className="form_field flex flex-col w-full gap-2">
            <label htmlFor="dob">Date of Birth<span className="text-red-500 font-bold">*</span></label>
            <input
              type="date"
              id="dob"
              name="dob"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              required
              value={formData.dob}
              onChange={handleChange}
            />
            {error?.dob && <p className="text-red-500">* {error.dob.errors[0]}</p>}
          </div>
          <div className="form_field flex flex-col w-full gap-2">
            <label htmlFor="phone_number">Phone Number<span className="text-red-500 font-bold">*</span></label>
            <input
              type="tel"
              id="phone_number"
              name="phone_number"
              placeholder="Phone Number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              required
              value={formData.phone_number}
              onChange={handleChange}
            />
            {error?.phone_number && <p className="text-red-500">* {error.phone_number.errors[0]}</p>}
          </div>
          <div className="form_field flex flex-col w-full gap-2">
            <label htmlFor="email">Email<span className="text-red-500 font-bold">*</span></label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              required
              value={formData.email}
              onChange={handleChange}
            />
            {error?.email && <p className="text-red-500">* {error.email.errors[0]}</p>}
          </div>
        </div>
        <div className="form_group flex gap-3 my-1 flex-col lg:flex-row">
          <div className="form_field flex flex-col w-full gap-2">
            <label htmlFor="guardian_name">Guardian Name<span className="text-red-500 font-bold">*</span></label>
            <input
              id="guardian_name"
              name="guardian_name"
              placeholder="Guardian Name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              required
              value={formData.guardian_name}
              onChange={handleChange}
            />
            {error?.guardian_name && <p className="text-red-500">* {error.guardian_name.errors[0]}</p>}
          </div>
          <div className="form_field flex flex-col w-full gap-2">
            <label htmlFor="guardian_phone_number">Guardian Phone<span className="text-red-500 font-bold">*</span></label>
            <input
              id="guardian_phone_number"
              name="guardian_phone_number"
              placeholder="Guardian Phone"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              required
              value={formData.guardian_phone_number}
              onChange={handleChange}
            />
            {error?.guardian_phone_number && <p className="text-red-500">* {error.guardian_phone_number.errors[0]}</p>}
          </div>
          <div className="form_field flex flex-col w-full gap-2">
            <label htmlFor="guardian_email">Guardian Email</label>
            <input
              type="email"
              id="guardian_email"
              name="guardian_email"
              placeholder="Guardian Email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              value={formData.guardian_email}
              onChange={handleChange}
            />
            {error?.guardian_email && <p className="text-red-500">* {error.guardian_email.errors[0]}</p>}
          </div>
        </div>
        <h1 className="text-lg font-bold mt-2">Current Address</h1>
        <Address
          input={formData.current_address}
          setInput={(value) =>
            setFormData((prev) => ({
              ...prev,
              current_address: typeof value === "function" ? value(prev.current_address) : value,
            }))
          }
        />
        {error?.current_address && <p className="text-red-500">* {error.current_address.errors[0]}</p>}

        <h1 className="text-lg font-bold mt-2">Permanent Address</h1>
        <Address
          input={formData.permanent_address}
          setInput={(value) =>
            setFormData((prev) => ({
              ...prev,
              permanent_address: typeof value === "function" ? value(prev.permanent_address) : value,
            }))
          }
        />
        {error?.permanent_address && <p className="text-red-500">* {error.permanent_address.errors[0]}</p>}

        {/* Submit / Reset Buttons */}
        <div className="button_group flex gap-3 my-5">
          <button type="submit" className="rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700">
            Submit
          </button>
          <button type="button" onClick={handleReset} className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700">
            Reset
          </button>
        </div>
      </form>

      {/* Success / Error Alerts */}
      {isSuccess && (
        <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50" role="alert">
          <span>Student added successfully.</span>
        </div>
      )}
      {!isSuccess && isSuccess !== null && (
        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
          <span>Failed to add student.</span>
        </div>
      )}
    </div>
  );
}

export default AddStudentPage;
