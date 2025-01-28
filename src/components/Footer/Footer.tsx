import React from "react";
import { Film, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <div className="bg-indigo-700 text-white">
      
        <div className="flex gap-2">
          <Film />
          <p className="font-bold">Movie Z</p>
        </div>
        <p>© 2024 Movie Z. All Rights Reserved</p>
      
      <div className="flex justify-between">
        <div className="">
          Contact Information
          <div className="flex items-center gap-3">
            <Mail />
            <div>
              <div>Email:</div>
              <a>support</a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Phone />
            <div>
              <div>Phone Number:</div>
              <a>support</a>
            </div>
          </div>
        </div>
        <div>
          <div>Follow us</div>
          <div>Facebook</div>
          <div>Instagram</div>
          <div>Twitter</div>
          <div>Youtube</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
