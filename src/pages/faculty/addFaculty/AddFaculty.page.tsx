import "./AddFaculty.styles.css";
import "../../../globals/global.styles.css";

function AddFacultyPage() {
  const handleSubmit = () => {
    console.log("Form submitted");
  };
  return (
    <div className="container">
      <h1 className="main-heading">Add Faculty</h1>
      <form onSubmit={handleSubmit} className="faculty_form">
        <div className="form_group">
          <div className="form_field">
            <label htmlFor="first_name">First Name</label>
            <input
              id="first_name"
              name="first_name"
              placeholder="First Name"
              className="inputfield"
              required
            />
          </div>
          <div className="form_field">
            <label htmlFor="middle_name">Middle Name</label>
            <input
              id="middle_name"
              name="middle_name"
              placeholder="Middle Name"
              className="inputfield"
            />
          </div>
          <div className="form_field">
            <label htmlFor="last_name">Last Name</label>
            <input
              id="last_name"
              name="last_name"
              placeholder="Last Name"
              className="inputfield"
              required
            />
          </div>
        </div>
        <div className="form_group">
          <div className="form_field">
            <label htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              className="inputfield"
              name="dob"
              id="dob"
              required
            />
          </div>
          <div className="form_field">
            <label htmlFor="phone_number">Phone Number</label>
            <input
              id="phone_number"
              name="phone_number"
              placeholder="Phone Number"
              className="inputfield"
              type="tel"
              required
            />
          </div>
          <div className="form_field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              placeholder="Email"
              className="inputfield"
              type="email"
              required
            />
          </div>
        </div>
        <div className="form_group">
          <div className="form_field">
            <label htmlFor="qualification">Qualification</label>
            <input
              id="qualification"
              name="qualification"
              placeholder="Qualification"
              className="inputfield"
              required
            />
          </div>
          <div className="form_field">
            <label htmlFor="designation">Designation</label>
            <input
              id="designation"
              name="designation"
              placeholder="Designation"
              className="inputfield"
              required
            />
          </div>
          <div className="form_field">
            <label htmlFor="department">Department</label>
            <input
              id="department"
              name="department"
              placeholder="Department"
              className="inputfield"
              required
            />
          </div>
        </div>
        <div className="form_group">
          <div className="form_field">
            <label htmlFor="experience">Experience</label>
            <input
              id="experience"
              name="experience"
              placeholder="Experience"
              className="inputfield"
              required
            />
          </div>
          <div className="form_field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              placeholder="Password"
              className="inputfield"
              type="password"
              required
            />
          </div>
          <div className="form_field">
            <label htmlFor="joining_date">Joining Date</label>
            <input
              type="date"
              className="inputfield"
              name="joining_date"
              id="joining_date"
              required
            />
          </div>
        </div>
        <div className="button_group">
          <button type="submit" className="submit_button">
            Submit
          </button>
          <button type="reset" className="reset_button">
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddFacultyPage;
