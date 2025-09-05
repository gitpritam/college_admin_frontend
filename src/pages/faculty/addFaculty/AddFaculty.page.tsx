import { useState } from "react";
import z from "zod";
import Address from "../../../components/form/address/Address.component";
import { facultyValidationSchema } from "../../../validations/faculty.validation";

function AddFacultyPage() {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [qualification, setQualification] = useState("");
  const [designation, setDesignation] = useState("");
  const [department, setDepartment] = useState("");
  const [experience, setExperience] = useState("");
  const [password, setPassword] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [currentAddress, setCurrentAddress] = useState({
    address: "",
    district: "",
    state: "",
    country: "",
    pincode: "",
  });
  const [permanentAddress, setPermanentAddress] = useState({
    address: "",
    district: "",
    state: "",
    country: "",
    pincode: "",
  });

  const [error, setError] = useState<
      | {
          first_name: { errors: string[] };
          middle_name?: { errors: string[] };
          last_name: { errors: string[] };
          dob: { errors: string[] };
          phoneNumber:{ errors: string[] };
          email: { errors: string[] };
          qualification: { errors: string[] };
          designation: { errors: string[] };
          department: { errors: string[] };
          experience: { errors: string[] };
          password: { errors: string[] };
          joiningDate: { errors: string[] };
        }
      | undefined
    >(undefined);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };

    const handleReset = () => {
    setFormData({
      firstName: "",
      middleName: "",
      lastName: "",
      dob: "",
      phoneNumber: "",
      email: "",
      qualification: "",
      designation: "",
      department: "",
      experience: "",
      password: "",
      joiningDate: "",
    });

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError(undefined);
      try {
        const validateData = facultyValidationSchema
          .omit({ faculty_id: true, posted_by: true })
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
  };
  return (
    <div className="flex w-full p-6 flex-col">
      <h1 className="main-heading font-bold text-xl mb-5">Add Faculty</h1>
      <form
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
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
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
              onChange={(e) => setMiddleName(e.target.value)}
              value={middleName}
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
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
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
              onChange={(e) => setDob(e.target.value)}
              value={dob}
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
              onChange={(e) => setPhoneNumber(e.target.value)}
              value={phoneNumber}
            />
            {error?.phoneNumber && (
              <p className="text-red-500">* {error.phoneNumber.errors[0]}</p>
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
              onChange={(e) => setEmail(e.target.value)}
              value={email}
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
              onChange={(e) => setQualification(e.target.value)}
              value={qualification}
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
              onChange={(e) => setDesignation(e.target.value)}
              value={designation}
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
              onChange={(e) => setDepartment(e.target.value)}
              value={department}
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
              onChange={(e) => setExperience(e.target.value)}
              value={experience}
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
              onChange={(e) => setPassword(e.target.value)}
              value={password}
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
              onChange={(e) => setJoiningDate(e.target.value)}
              value={joiningDate}
            />
            {error?.joiningDate && (
              <p className="text-red-500">* {error.joiningDate.errors[0]}</p>
            )}
          </div>
        </div>
        <div>
          <h1 className="text-lg font-bold mt-2">Current Address</h1>
          <Address input={currentAddress} setInput={setCurrentAddress} />
          <h1 className="text-lg font-bold mt-2">Permanent Address</h1>
          <Address input={permanentAddress} setInput={setPermanentAddress} />
        </div>
        <div className="button_group flex gap-3 my-5">
          <button
            type="submit"
            className="rounded-md bg-green-600 px-4 py-2 cursor-pointer text-white hover:bg-green-700"
          >
            Submit
          </button>
          <button
            type="reset"
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
