import { Link } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import classNames from "classnames";
import { useState } from "react";

export default function MainMenuItem({ icon, link, text, submenu }) {
    const { url } = usePage();
    const isActive = route().current(link + "*");
    const [isOpen, setIsOpen] = useState(false);

    const iconClasses = classNames({
        "text-black": isActive,
        "text-black-500 group-hover:text-blue-900": !isActive,
    });

    const textClasses = classNames({
        "text-black": isActive,
        "text-black-500 group-hover:text-blue-900": !isActive,
    });

    const handleClick = (e) => {
        e.preventDefault(); // Prevent default link behavior
        if (submenu) {
            setIsOpen(!isOpen); // Toggle dropdown if submenu exists
        }
    };

    return (
        <div className="mb-4">
            <div
                className="flex items-center justify-between group py-3 cursor-pointer"
                onClick={handleClick}
            >
                <Link href={route(link)} className="flex items-center">
                    <div className={iconClasses}>{icon}</div>
                    <div className={`${textClasses} ml-2`}>{text}</div> {/* Added margin-left */}
                </Link>
                {submenu && (
                    <svg
                        className="-mr-1 ml-2 h-5 w-5 text-black"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                )}
            </div>
            {isOpen && submenu && (
                <ul className="sub-menu pl-6">
                    {submenu.map((item, index) => (
                        <li key={index}>
                            <Link
                                href={item.link}
                                className="text-gray-600 hover:bg-indigo-50"
                            >
                                {item.text}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
