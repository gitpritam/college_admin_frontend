import React, { useRef, useState } from "react";
import Address from "../../../components/form/address/Address.component";
import type { IFaculty } from "../../../@types/interface/faculty.interface";
import z from "zod";
import { facultyValidationSchema, profilePhotoValidationSchema } from "../../../validations/faculty.validation";
import { addressValidationSchema } from "../../../validations/address.validation";
import api from "../../../config/axios.config";
import { IoMdClose } from "react-icons/io";

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
    role:'staff',
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
  const profilePhotoInputRef = useRef<HTMLInputElement>(null);
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
        role?: { errors: string[] };
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
  const [profilePhotoError, setProfilePhotoError] = useState<
    | {
        profile_photo?: { errors: string[] };
      }
    | undefined
  >(undefined);

      const [profilePhoto, setProfilePhoto] = useState<File | undefined>(undefined);

      const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) setProfilePhoto(file);
        console.log(e);
      };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
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
      role:'staff',
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
    handleFileInputReset();
    setError(undefined);
    setCurrentAddressError(undefined);
    setPermanentAddressError(undefined);
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
      if (profilePhoto) {
      const profilePhotoValidateData = profilePhotoValidationSchema.safeParse(
        { profile_photo: profilePhoto }
      );

      if (!profilePhotoValidateData.success) {
        const errors = z.treeifyError(
          profilePhotoValidateData.error
        ).properties;
        setProfilePhotoError(errors);
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
      sendFormData.append("qualification", validateData.data.qualification);
      sendFormData.append("designation", validateData.data.designation);
      sendFormData.append("department", validateData.data.department);
      sendFormData.append("experience", validateData.data.experience);
      if (validateData.data.password)sendFormData.append("password", validateData.data.password);
      sendFormData.append("joining_date", validateData.data.joining_date);
      Object.entries(currentAddressValidateData.data).forEach(([key,value]) => {
  sendFormData.append(`current_address[${key}]`, value);
});

Object.entries(permanentAddressValidateData.data).forEach(([key, value]) => {
  sendFormData.append(`permanent_address[${key}]`, value);
});
     if( validateData.data.role) sendFormData.append("role", validateData.data.role);

      if (profilePhoto) sendFormData.append("profile_picture", profilePhoto);

      const response = await api.post('/faculty', sendFormData, {headers: {'Content-Type': 'multipart/form-data'}});
      if(response.status === 201){
        console.log(response.data.result);
        alert("Faculty added successfully");
        handleReset();
      }
      console.log(validateData.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  const handleFileInputReset = () => {
    setProfilePhoto(undefined);
    if (profilePhotoInputRef.current) {
      profilePhotoInputRef.current.value = ""; // clear input field
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
          <div className="form_field flex flex-col w-full gap-2">
            <label htmlFor="profile_photo">
              Profile Photo
            </label>
            <div className="relative">
            <input
              type="file"
              accept=".jpg, .jpeg"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              name="profile_photo"
              id="profile_photo"
              onChange={handleFileChange}
              ref={profilePhotoInputRef}
              />
              {profilePhoto && (
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
            {profilePhotoError?.profile_photo && (
              <p className="text-red-500">* {profilePhotoError.profile_photo.errors[0]}</p>
            )}
            
          </div>
          <div className="form_field flex flex-col w-full gap-2">
            <label htmlFor="role">
              Role
            </label>
            <select
              id="role"
              name="role"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              onChange={handleChange}
              value={formData.role}
            >
              <option value="admin">Admin</option>
              <option value="faculty">Faculty</option>
              <option value="staff">Staff</option>
            </select>
            {profilePhotoError?.profile_photo && (
              <p className="text-red-500">* {profilePhotoError.profile_photo.errors[0]}</p>
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
      
     
    </div>
  );
}
export default AddFacultyPage;
