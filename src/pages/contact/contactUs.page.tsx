import React, { useState } from "react";
import type { IContact } from "../../@types/interface/contact.interface";

function ContactUsPage() {
  const [formData, setFormData] = useState <IContact>({
    address: "",
    phone_number: "",
    email: "",
    facebook_link: "",
    twitter_link: "",
    linkedin_link: "",
    instagram_link: "",
  }); 
  return(
    <div className="flex w-full p-6 flex-col">
       <h1 className="main-heading font-bold text-xl mb-5">Contact Us</h1>
      <div className="form_field flex-row w-full gap-2 grid md:grid-cols-1 lg:grid-cols-3">
            <div className="form_field flex flex-col gap-2 grow">
              <label htmlFor="address">
                Address<span className="text-red-500 font-bold">*</span>
              </label>
              <input
                type="text"
                id="address"
                name="address"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 "
                placeholder="Input event address"
                required
              />
            </div>
</div>
    </div>
  );

}
 
      


export default ContactUsPage;
