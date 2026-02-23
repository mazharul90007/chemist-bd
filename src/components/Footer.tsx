"use client";

import { Stethoscope, Phone, Mail, MapPin } from "lucide-react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-900 pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="bg-emerald-600 p-2 rounded-xl text-white shadow-lg shadow-emerald-500/20">
                <Stethoscope size={24} />
              </div>
              <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                Chemist<span className="text-emerald-600">BD</span>
              </span>
            </Link>
            <p className="text-zinc-500 dark:text-zinc-400 mb-8 leading-relaxed max-w-xs">
              Your trusted partner for all healthcare needs. Providing genuine
              medicines and healthcare products at your doorstep.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="#"
                className="w-10 h-10 rounded-full bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-emerald-600 hover:text-white transition-all"
              >
                <FaFacebookF size={20} />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 rounded-full bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-emerald-600 hover:text-white transition-all"
              >
                <FaXTwitter size={20} />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 rounded-full bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-emerald-600 hover:text-white transition-all"
              >
                <FaInstagram size={20} />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 rounded-full bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-emerald-600 hover:text-white transition-all"
              >
                <FaYoutube size={20} />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-6">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-4">
              {["Home", "Medicines", "Categories", "Offers", "Health Hub"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-zinc-500 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium"
                    >
                      {item}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-6">
              Customer Care
            </h4>
            <ul className="flex flex-col gap-4">
              {[
                "Contact Us",
                "Shipping Policy",
                "Return Policy",
                "Privacy Policy",
                "Terms \u0026 Conditions",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-zinc-500 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-6">
              Contact Info
            </h4>
            <ul className="flex flex-col gap-6">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-emerald-600 shrink-0" />
                <span className="text-zinc-500 dark:text-zinc-400">
                  123 Health Ave, Medical District, Dhaka, Bangladesh
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-emerald-600 shrink-0" />
                <span className="text-zinc-500 dark:text-zinc-400">
                  +880 123 456 789
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-emerald-600 shrink-0" />
                <span className="text-zinc-500 dark:text-zinc-400">
                  support@chemistbd.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-zinc-100 dark:border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">
            © 2026{" "}
            <span className="font-bold text-zinc-900 dark:text-zinc-50">
              ChemistBD
            </span>
            . All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Image
              src="https://img.icons8.com/color/48/visa.png"
              alt="Visa"
              width={32}
              height={32}
            />
            <Image
              src="https://img.icons8.com/color/48/mastercard.png"
              alt="Mastercard"
              width={32}
              height={32}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
