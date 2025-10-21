
const ContactUsPage =() => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
          <p className="text-blue-100">
            We'd love to hear from you. Reach out for any queries or assistance.
          </p>
        </div>

        {/* Content Section */}
        <div className="grid md:grid-cols-2 gap-6 p-8">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Get in Touch
            </h2>
            <p className="text-gray-600 mb-6">
              You can contact us via phone, email, or visit our campus. Our
              support team is always ready to assist you.
            </p>

            <div className="space-y-4">
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
                  placeholder="Your Name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
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

        {/* Map Section */}
        <div className="p-4">
          <iframe
            title="University Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.092402213927!2d-122.41941558468182!3d37.7749297797591!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808e2cafff7d%3A0x4d3a9a3b2a9b1b1c!2sUniversity!5e0!3m2!1sen!2sus!4v1633111709086!5m2!1sen!2sus"
            width="100%"
            height="250"
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
