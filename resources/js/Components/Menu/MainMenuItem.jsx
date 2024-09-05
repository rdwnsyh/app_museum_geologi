import { Link } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import classNames from "classnames";

export default function MainMenuItem({ icon, link, text }) {
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
           
        </div>
    );
}
