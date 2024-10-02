import React from 'react';
import { X } from 'lucide-react'; // Import X icon from lucide-react
import { Link } from '@inertiajs/react'; // Ensure you import Link if using Inertia
import Logo from "@/Components/Logo/Logo";

const Modal = ({ isOpen, onClose, title, logoSrc, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        >
          {/* Header Section */}
          <div className="flex items-center justify-between p-4 border-b">
            <Link className="flex items-center" href="/">
              {logoSrc ? (
                <img src={logoSrc} alt="Logo" className="h-8 w-auto" />
              ) : (
                <Logo className="text-white fill-current" width="120" height="28" />
              )}
              <h2 className="ml-2 text-lg font-bold" id="modal-title">{title}</h2> {/* Adjusted title position */}
            </Link>
            <button
              type="button"
              className="rounded-md text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={onClose}
            >
              <X className="w-6 h-6" /> {/* X icon */}
            </button>
          </div>

          {/* Body Section */}
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
