import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";
import { Link } from "react-router";

const ContactUsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r text-gray-800 py-5 mb-5 text-center border-b border-gray-300">
          <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
          <div className="flex justify-center items-center gap-2 mt-2">
            <div className="flex justify-center space-x-4 ">
              <Link
                to="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-white transition  hover:bg-gray-200 "
              >
                <FaFacebook className="text-blue-600" size={20} />
              </Link>
            </div>

            <div className="flex justify-center space-x-4 ">
              <Link
                to="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#f8008c] hover:text-white transition  hover:bg-gray-200"
              >
                <FaInstagram className="text-[#f8008c]" size={20} />
              </Link>
            </div>

            <div className="flex justify-center space-x-4 ">
              <Link
                to="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0965c1] hover:text-white transition hover:bg-gray-200"
              >
                <FaLinkedin className="text-[#0965c1]" size={20} />
              </Link>
            </div>

            <div className="flex justify-center space-x-4 ">
              <Link
                to="https://whatsapp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#25d366] hover:text-white transition hover:bg-gray-400"
              >
                <FaWhatsapp className="text-[#25d366]" size={20} />
              </Link>
            </div>
          </div>
        </div>
 
        {/* Content Section */}
        <p className="text-gray-600 mb-7 font-bold text-lg text-center">
          You can contact us via phone, email, or visit our campus. Our support
          team is always ready to assist you.
        </p>
       
        <div className="grid md:grid-cols-2 gap-15 p-8">
          {/* Contact Info */}
          <div>
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Send a Message
              </h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Write your message..."
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>

          <div className="space-y-4 flex flex-col py-3">
            <div>
              <h3 className="text-lg font-semibold text-blue-600">Address</h3>
              <p className="text-gray-700">
                University of Engineering,
                <br />
                ABC Street, City District,
                <br />
                State, Country - 123456
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-blue-600">Phone</h3>
              <p className="text-gray-700">+91 98765 43210</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-blue-600">Email</h3>
              <p className="text-gray-700">University@abc.ac.in</p>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="p-7">
          <iframe
            title="University Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117925.35231277325!2d88.26495090163961!3d22.53540637448262!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f882db4908f667%3A0x43e330e68f6c2cbc!2sKolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1761028849759!5m2!1sen!2sin"
            width="100%"
            height="280"
            allowFullScreen
            loading="lazy"
            className="rounded-lg shadow-md"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
