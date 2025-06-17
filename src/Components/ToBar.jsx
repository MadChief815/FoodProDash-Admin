import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Contexts
import { useAuth } from "../Context/authContext";

// Images
import NoUserImg from "../assets/Images/Topbar/user.png";

// SVGs
import DownIcon from "../assets/SVGs/Dashboard/down.svg";
import ProfileIcon from "../assets/SVGs/Dashboard/profile.svg";
import LogoutIcon2 from "../assets/SVGs/Dashboard/logout2.svg";

const TopBar = () => {
    // User Data
    const { username, logout } = useAuth();

    const [dropdownOpen, setDropdownOpen] = useState(false);

    // Navigation
    const navigate = useNavigate();

    // Styles
    const [hoverProfile, setHoverProfile] = useState(false);
    const [hoverLogout, setHoverLogout] = useState(false);

    const itemStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem 1rem',
        cursor: 'pointer',
        fontSize: '14px',
        transition: 'background-color 0.2s ease',
    };

    return (
        <div
            style={{
                height: "4rem",
                backgroundColor: "var(--Neutral10)",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                padding: "0 1.875rem",
            }}
        >
            {/* User Image */}
            <img src={NoUserImg} alt="Logo" style={{ width: '2.75rem', height: '2.75rem', borderRadius: "1.375rem" }} />
            {/* User Name */}
            <div
                className="B14N80"
                style={{ marginLeft: '1rem', marginRight: '1.5rem' }}
            >
                {username || 'Not Available'}
            </div>
            {/* Drop Arrow */}
            <div
                onClick={() => setDropdownOpen(!dropdownOpen)}
                style={{
                    height: '1.125rem',
                    width: '1.125rem',
                    borderRadius: '0.5625rem',
                    border: '1px solid var(--Neutral50)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                }}
            >
                <img
                    src={DownIcon}
                    alt="Dropdown"
                    style={{ width: '0.6rem', height: '0.6rem' }}
                />
            </div>
            {/* Dropdown Menu */}
            {dropdownOpen && (
                <div
                    style={{
                        position: 'absolute',
                        top: '3.8rem',
                        backgroundColor: '#fff',
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                        borderRadius: '6px',
                        marginTop: '0.5rem',
                        zIndex: 999,
                        padding: '0.5rem 0',
                        minWidth: '10rem',
                    }}
                >
                    <div>
                        {/* Drop Down */}
                        <div>
                            {/* View Profile */}
                            <div
                                style={{
                                    ...itemStyle,
                                    backgroundColor: hoverProfile ? '#f5f5f5' : 'transparent',
                                }}
                                className="SB14N90"
                                onMouseEnter={() => setHoverProfile(true)}
                                onMouseLeave={() => setHoverProfile(false)}
                                onClick={() => {
                                    navigate("./profile");
                                    setDropdownOpen(false);
                                }}
                            >
                                <img
                                    src={ProfileIcon}
                                    alt="Profile"
                                    style={{ width: '1.125rem', height: '1rem', marginRight: '0.4rem' }}
                                />
                                View Profile
                            </div>

                            {/* Log out */}
                            <div
                                style={{
                                    ...itemStyle,
                                    backgroundColor: hoverLogout ? '#f5f5f5' : 'transparent',
                                }}
                                className="SB14N90"
                                onMouseEnter={() => setHoverLogout(true)}
                                onMouseLeave={() => setHoverLogout(false)}
                                onClick={logout}
                            >
                                <img
                                    src={LogoutIcon2}
                                    alt="Logout"
                                    style={{ width: '1.125rem', height: '1rem', marginRight: '0.4rem' }}
                                />
                                Log out
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default TopBar;