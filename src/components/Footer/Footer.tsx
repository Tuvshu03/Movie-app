"use client";

import React from "react";
import { Film, Mail, Phone } from "lucide-react";
import { useRouter } from "next/navigation";

const Footer = () => {
  const { push } = useRouter();

  return (
    <footer className="bg-indigo-700 py-10 text-sm mt-12 w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between gap-y-10 max-w-7xl">
          <div className="flex flex-col space-y-3">
            <div
              onClick={() => push(`../`)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Film />
              <p className="font-bold text-lg">Movie Z</p>
            </div>
            <p>© 2024 Movie Z. All Rights Reserved</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full lg:max-w-2xl">
            <div>
              <h3 className="font-semibold mb-4">Contact Information</h3>
              <div className="flex items-start gap-3 mb-4">
                <Mail className="mt-1" />
                <div>
                  <div className="font-medium">Email:</div>
                  <a href="mailto:support@movieZ.com" className="hover:underline">
                    support@movieZ.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-1" />
                <div>
                  <div className="font-medium">Phone Number:</div>
                  <a href="tel:+976111234567" className="hover:underline">
                    +976 (11) 123-4567
                  </a>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Follow Us</h3>
              <div className="flex flex-wrap gap-4">
                <a href="#" className="hover:underline">Facebook</a>
                <a href="#" className="hover:underline">Instagram</a>
                <a href="#" className="hover:underline">Twitter</a>
                <a href="#" className="hover:underline">YouTube</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
