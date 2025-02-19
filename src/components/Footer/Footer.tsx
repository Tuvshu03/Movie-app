"use client"

import React from "react";
import { Film, Mail, Phone } from "lucide-react";
import { useRouter } from "next/navigation";

const Footer = () => {
  const {push} = useRouter()
  return (
    <div className="bg-indigo-700 py-10 text-sm text-[#fafafa] mt-12 min-w-fit">
      <div className="mx-auto flex flex-col justify-between gap-y-7 lg:flex-row max-w-7xl">
        <div className="flex flex-col">
          <div 
                onClick={() => {
                  push(`../`);
                }}
          className="flex gap-2 cursor-pointer">
            <Film />
            <p className="font-bold">Movie Z</p>
          </div>
          <p>© 2024 Movie Z. All Rights Reserved</p>
        </div>
        <div className="flex justify-between gap">
          <div className="">
            Contact Information
            <div className="flex items-center gap-3">
              <Mail />
              <div>
                <div>Email:</div>
                <a>support@movieZ.com</a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone />
              <div>
                <div>Phone Number:</div>
                <a>+976(11)123-4567</a>
              </div>
            </div>
          </div>
          <div className="">
            <div>Follow us</div>
            <div className="flex flex-col lg:flex-row gap-4">
              <div>Facebook</div>
              <div>Instagram</div>
              <div>Twitter</div>
              <div>Youtube</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
