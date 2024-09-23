import React from "react";

const Sidebar = () => {
    const menuItems = [
        {
            label: "Menu Item 1",
            submenu: [
                {
                    label: "Submenu Item 1",
                    link: "/submenu-item-1",
                },
                {
                    label: "Submenu Item 2",
                    link: "/submenu-item-2",
                },
            ],
        },
        {
            label: "Menu Item 2",
            link: "/menu-item-2",
        },
    ];

    const renderMenuItems = (menuItems) => {
        return menuItems.map((menuItem) => {
            if (menuItem.submenu) {
                return (
                    <li key={menuItem.label}>
                        <a href={menuItem.link}>{menuItem.label}</a>
                        <ul>{renderMenuItems(menuItem.submenu)}</ul>
                    </li>
                );
            } else {
                return (
                    <li key={menuItem.label}>
                        <a href={menuItem.link}>{menuItem.label}</a>
                    </li>
                );
            }
        });
    };

    return (
        <div className="sidebar">
            <ul>{renderMenuItems(menuItems)}</ul>
        </div>
    );
};

export default Sidebar;
