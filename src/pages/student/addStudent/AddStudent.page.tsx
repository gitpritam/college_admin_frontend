import React, { useRef, useState } from "react";
import type { IStudent } from "../../../@types/interface/student.interface";
import Address from "../../../components/form/address/Address.component";
import { z } from "zod";
import {
  studentValidationSchema,
  passportPhotoValidationSchema,
} from "../../../validations/student.validation";
import { addressValidationSchema } from "../../../validations/address.validation";
import { FaSpinner } from "react-icons/fa";
import api from "../../../config/axios.config";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { IoMdClose } from "react-icons/io";

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
  const passportPhotoInputRef = useRef<HTMLInputElement>(null);
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
  const [loading, setLoading] = useState<boolean>(false);
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
  const [passportPhotoError, setPassportPhotoError] = useState<
    | {
        passport_photo?: { errors: string[] };
      }
    | undefined
  >(undefined);

  const [passport_photo, setPassportPhoto] = useState<File | undefined>(
    undefined
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) setPassportPhoto(file);
    console.log(e);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
    setCurrentAddressError(undefined);
    setPermanentAddressError(undefined);
    console.log(formData);
    try {
      const validateData = studentValidationSchema
        .omit({ student_id: true, posted_by: true })
        .safeParse(formData);
      const currentAddressValidateData = addressValidationSchema.safeParse(
        formData.current_address
      );
      const permanentAddressValidateData = addressValidationSchema.safeParse(
        formData.permanent_address
      );
      if (passport_photo) {
        const passportPhotoValidateData =
          passportPhotoValidationSchema.safeParse({
            passport_photo: passport_photo,
          });

        if (!passportPhotoValidateData.success) {
          const errors = z.treeifyError(
            passportPhotoValidateData.error
          ).properties;
          setPassportPhotoError(errors);
          return;
        }
      }

      if (!currentAddressValidateData.success) {
        const errors = z.treeifyError(
          currentAddressValidateData.error
        ).properties;
        setCurrentAddressError(errors);
        return;
      }
      if (!permanentAddressValidateData.success) {
        const errors = z.treeifyError(
          permanentAddressValidateData.error
        ).properties;
        setPermanentAddressError(errors);
        return;
      }
      console.log("Validated data:", validateData);
      if (!validateData.success) {
        const errors = z.treeifyError(validateData.error).properties;
        console.log(errors);
        setError(errors);
        return;
      }

      const sendFormData = new FormData();
      sendFormData.append("first_name", validateData.data.first_name);
      if (validateData.data.middle_name)
        sendFormData.append("middle_name", validateData.data.middle_name);
      sendFormData.append("last_name", validateData.data.last_name);
      sendFormData.append("dob", validateData.data.dob);
      sendFormData.append("phone_number", validateData.data.phone_number);
      sendFormData.append("email", validateData.data.email);
      sendFormData.append("guardian_name", validateData.data.guardian_name);
      sendFormData.append(
        "guardian_email",
        validateData.data.guardian_email ?? ""
      );
      sendFormData.append(
        "guardian_phone_number",
        validateData.data.guardian_phone_number
      );
      sendFormData.append("department", validateData.data.department);

      Object.entries(currentAddressValidateData.data).forEach(
        ([key, value]) => {
          sendFormData.append(`current_address[${key}]`, value);
        }
      );

      Object.entries(permanentAddressValidateData.data).forEach(
        ([key, value]) => {
          sendFormData.append(`permanent_address[${key}]`, value);
        }
      );

      if (passport_photo)
        sendFormData.append("passport", passport_photo);

      console.log(validateData.data);
      const response = await api.post("/students", sendFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
      if (response.status === 201) {
        handleReset();
        toast("Student added successfully", { type: "success" });
      }
      console.log(validateData.data);
    } catch (error) {
      console.error("Error submitting form:", error);
      if (error instanceof AxiosError) {
        toast(error.response?.data?.message || "Failed to add student", {
          type: "error",
        });
      } else {
        toast("Something went wrong", { type: "error" });
      }
    } finally {
      setLoading(false);
    }
  };
  const handleFileInputReset = () => {
    setPassportPhoto(undefined);
    if (passportPhotoInputRef.current) {
      passportPhotoInputRef.current.value = "";
    }
  };
  return (
    <div className="flex w-full p-6 flex-col">
      <h1 className="main-heading font-bold text-xl mb-5">Add Student</h1>
      <form
        noValidate
        onSubmit={handleSubmit}
        className="student_form flex flex-col w-full"
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
              placeholder="Input your first name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
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
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              value={formData.middle_name}
              onChange={handleChange}
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
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              required
              value={formData.last_name}
              onChange={handleChange}
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
              id="dob"
              name="dob"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              required
              value={formData.dob}
              onChange={handleChange}
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
              type="tel"
              id="phone_number"
              name="phone_number"
              placeholder="Phone Number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              required
              value={formData.phone_number}
              onChange={handleChange}
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
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              required
              value={formData.email}
              onChange={handleChange}
            />
            {error?.email && (
              <p className="text-red-500">* {error.email.errors[0]}</p>
            )}
          </div>
        </div>
        <div className="form_group flex gap-3 my-1 flex-col lg:flex-row">
          <div className="form_field flex flex-col w-full gap-2">
            <label htmlFor="guardian_name">
              Guardian Name<span className="text-red-500 font-bold">*</span>
            </label>
            <input
              id="guardian_name"
              name="guardian_name"
              placeholder="Guardian Name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              required
              value={formData.guardian_name}
              onChange={handleChange}
            />
            {error?.guardian_name && (
              <p className="text-red-500">* {error.guardian_name.errors[0]}</p>
            )}
          </div>
          <div className="form_field flex flex-col w-full gap-2">
            <label htmlFor="guardian_phone_number">
              Guardian Phone<span className="text-red-500 font-bold">*</span>
            </label>
            <input
              id="guardian_phone_number"
              name="guardian_phone_number"
              placeholder="Guardian Phone"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              required
              value={formData.guardian_phone_number}
              onChange={handleChange}
            />
            {error?.guardian_phone_number && (
              <p className="text-red-500">
                * {error.guardian_phone_number.errors[0]}
              </p>
            )}
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
            {error?.guardian_email && (
              <p className="text-red-500">* {error.guardian_email.errors[0]}</p>
            )}
          </div>
        </div>
        <div className="form_group flex gap-3 my-1 flex-col lg:flex-row">
          <div className="form_field flex flex-col w-full gap-2">
            <label htmlFor="passport_photo">Passport Photo</label>
            <div className="relative">
              <input
                type="file"
                accept=".jpg, .jpeg"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                name="passport_photo"
                id="passport_photo"
                onChange={handleFileChange}
                ref={passportPhotoInputRef}
              />
              {passport_photo && (
                <button
                  type="button"
                  onClick={handleFileInputReset}
                  className="text-red-500 hover:text-red-700 absolute right-1 top-2 rounded-full p-1 cursor-pointer transition"
                  aria-label="Remove selected photo"
                >
                  <IoMdClose size={18} />
                </button>
              )}
            </div>
            {passportPhotoError?.passport_photo && (
              <p className="text-red-500">
                * {passportPhotoError.passport_photo.errors[0]}
              </p>
            )}
          </div>
          <div className="form_field flex flex-col w-full gap-2">
            <label htmlFor="department">Department</label>
            <input
              type="text"
              id="department"
              name="department"
              placeholder="Department"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              value={formData.department}
              onChange={handleChange}
            />
            {error?.department && (
              <p className="text-red-500">* {error.department.errors[0]}</p>
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

export default AddStudentPage;
