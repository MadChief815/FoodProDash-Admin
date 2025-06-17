import { useState } from "react";
import { NavLink } from "react-router-dom";

// Context
import { useAuth } from "../Context/authContext";

// Styles
import "../Styles/Sidebar.css";

// SVGs
import MeterIcon from "../assets/SVGs/Dashboard/meter.svg";
import FMeterIcon from "../assets/SVGs/Dashboard/fmeter.svg";
import InvoiceIcon from "../assets/SVGs/Dashboard/invoice.svg";
import FInvoiceIcon from "../assets/SVGs/Dashboard/Finvoice.svg";
import OrdersIcon from "../assets/SVGs/Dashboard/orders.svg";
import FOrdersIcon from "../assets/SVGs/Dashboard/Forders.svg";
import ProductIcon from "../assets/SVGs/Dashboard/product.svg";
import FProductIcon from "../assets/SVGs/Dashboard/Fproduct.svg";
import SettingsIcon from "../assets/SVGs/Dashboard/setting.svg";
import FSettingsIcon from "../assets/SVGs/Dashboard/Fsetting.svg";
import LogOutIcon from "../assets/SVGs/Dashboard/logout.svg";
import FLogOutIcon from "../assets/SVGs/Dashboard/Flogout.svg";

const Sidebar = () => {

    // Auth
    const { logout } = useAuth();
    const [logoutHovered, setLogoutHovered] = useState(false);

    const navItems = [
        {
            to: "/",
            label: "Dashboard",
            icon: MeterIcon,
            activeIcon: FMeterIcon,
        },
        {
            to: "/products",
            label: "Products",
            icon: ProductIcon,
            activeIcon: FProductIcon,
        },
        {
            to: "/orders",
            label: "Order List",
            icon: OrdersIcon,
            activeIcon: FOrdersIcon,
        },
        {
            to: "/invoice",
            label: "Invoice",
            icon: InvoiceIcon,
            activeIcon: FInvoiceIcon,
        },
        {
            to: "/settings",
            label: "Settings",
            icon: SettingsIcon,
            activeIcon: FSettingsIcon,
        }
    ];

    return (
        <div style={{ padding: "1.5rem" }}>
            {/* App Title */}
            <div style={{ display: "flex", gap: 4, justifyContent: "center", marginBottom: "1.875rem" }}>
                <div className="EB32N100">Pro</div>
                <div className="EB32Orange">Food</div>
            </div>

            <div className="B12N60" style={{ paddingBottom: "0.5rem", paddingLeft: "0.2rem" }}>Pages</div>

            {/* Navigation Links */}
            {navItems.map((item) => (
                <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link inactive"
                    }
                >
                    {({ isActive }) => (
                        <>
                            <img
                                src={isActive ? item.activeIcon : item.icon}
                                alt={`${item.label} icon`}
                                style={{ width: "20px", height: "20px" }}
                            />
                            <span>{item.label}</span>
                        </>
                    )}
                </NavLink>
            ))}

            {/* Stroke */}
            <div style={{ height: 1, backgroundColor: "var(--Neutral30)", marginTop: 8 }} />

            {/* Log Out */}
            {/* Log Out button */}
            <button
                onClick={logout}
                className="log-out logout-button"
                onMouseEnter={() => setLogoutHovered(true)}
                onMouseLeave={() => setLogoutHovered(false)}
            >
                <img
                    src={logoutHovered ? FLogOutIcon : LogOutIcon}
                    alt="Logout icon"
                    className="icon"
                />
                <span>Log Out</span>
            </button>

        </div>
    );
};

export default Sidebar;

