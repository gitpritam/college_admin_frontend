import React from "react";
import type { IStudent } from "../../../@types/interface/student.interface";
import Address from "../../../components/form/address/Address.component";

function AddStudentPage() {
  const [formData, setFormData] = React.useState<IStudent>({
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
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(name, value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  //useEffect
  //fetch
  //axios config

  return (
    <div className="flex w-full p-6 flex-col">
      <h1 className="main-heading font-bold text-xl mb-5">Add Student</h1>
      <form
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
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Input your first name"
              required
              value={formData.first_name}
              onChange={handleChange}
            />
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
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
              onChange={handleChange}
              value={formData.guardian_name}
            />
          </div>
          <div className="form_field flex flex-col w-full gap-2">
            <label htmlFor="guardian_phone_number">
              Guardian Phone<span className="text-red-500 font-bold">*</span>
            </label>
            <input
              id="guardian_phone_number"
              name="guardian_phone_number"
              placeholder="Guardian Phone Number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              type="tel"
              required
              onChange={handleChange}
              value={formData.guardian_phone_number}
            />
          </div>
          <div className="form_field flex flex-col w-full gap-2">
            <label htmlFor="guardian_email">Guardian Email</label>
            <input
              id="guardian_email"
              name="guardian_email"
              placeholder="Guardian Email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              type="email"
              onChange={handleChange}
              value={formData.guardian_email}
            />
          </div>
        </div>
        <div className="form_group flex gap-3 my-1 flex-col lg:flex-row">
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
          </div>
          <div className="form_field flex flex-col w-full gap-2">
            <label htmlFor="year_of_admission">
              Year of Admission<span className="text-red-500 font-bold">*</span>
            </label>
            <input
              id="year_of_admission"
              name="year_of_admission"
              placeholder="Year of Admission"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              type="number"
              required
              onChange={handleChange}
              value={
                formData.year_of_admission === 0
                  ? ""
                  : formData.year_of_admission
              }
            />
          </div>
          <div className="form_field flex flex-col w-full gap-2">
            <label htmlFor="year_of_passing">Year of Passing</label>
            <input
              id="year_of_passing"
              name="year_of_passing"
              placeholder="Year of Passing"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              type="number"
              onChange={handleChange}
              value={
                formData.year_of_passing === 0 ? "" : formData.year_of_passing
              }
            />
          </div>
        </div>
        {/* <div className="form_group flex gap-3 my-1 flex-col lg:flex-row">
          <div className="form_field flex flex-col w-full gap-2">
            <label htmlFor="remark">Remark</label>
            <textarea
              id="remark"
              name="remark"
              placeholder="Remark"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              value={formData.remark}
              onChange={handleChange}
            />
          </div>
        </div> */}
        <div>
          <h1 className="text-lg font-bold mt-2">Current Address</h1>
          <Address
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

export default AddStudentPage;
