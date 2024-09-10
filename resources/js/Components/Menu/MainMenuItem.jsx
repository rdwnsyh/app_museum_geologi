import { Link } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import classNames from "classnames";

export default function MainMenuItem({ icon, link, text, submenu }) {
    const { url } = usePage();
    const isActive = route().current(link + "*");
    // console.log(route(link));

    const iconClasses = classNames({
        "text-black": isActive,
        "text-black-500 group-hover:text-blue-900": !isActive,
    });

    const textClasses = classNames({
        "text-black": isActive,
        "text-black-500 group-hover:text-blue-900": !isActive,
    });

    return (
        <div className="mb-4">
            <Link
                href={route(link)}
                className="flex items-center group py-3 space-x-3"
            >
                <div className={iconClasses}>{icon}</div>
                <div className={textClasses}>{text}</div>
            </Link>
            {submenu && (
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
