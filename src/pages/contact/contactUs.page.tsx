import React, { useState } from "react";
import type { IContact } from "../../@types/interface/contact.interface";
import { contactValidationSchema } from "../../validations/contact.validation"; 

function ContactUsPage() {
  const [formData, setFormData] = React.useState<IContact>({
    address: "",
    phone_number: "",
    email: "",
    facebook_link: "",
    twitter_link: "",
    linkedin_link: "",
    instagram_link: "",
  }); 

}
 
      


export default ContactUsPage;
