import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Context
import { useAuth } from '../../Context/authContext';

// Zod
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Images
import BGImage from "../../assets/Images/Authentication/bg1.jpg";

// SVGs
import EmailIcon from "../../assets/SVGs/Authentication/email.svg";
import LockIcon from "../../assets/SVGs/Authentication/lock.svg";
import VisibleIcon from "../../assets/SVGs/Authentication/visible.svg";
import InisibleIcon from "../../assets/SVGs/Authentication/invisible.svg";
import TickIcon from "../../assets/SVGs/Authentication/tick.svg";

// CSS
import "../../Styles/Authentication.css"

const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

const LoginPage = () => {

    // Authentication
    const { login, setEmail, setUsername  } = useAuth();

    // Navigation
    const navigate = useNavigate();

    // States
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [visible, setVisible] = useState(false);
    const [ischecked, setIsChecked] = useState(false);

    // React Hook Form setup
    const { control, handleSubmit, setValue, watch, getValues, formState: { errors } } = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    });

    // Watch email and password for value changes
    const emailValue = watch('email');
    const passwordValue = watch('password');

    // On mount, load saved credentials if any
    useEffect(() => {
        const savedEmail = localStorage.getItem('rememberEmail');
        const savedPassword = localStorage.getItem('rememberPassword');
        const savedChecked = localStorage.getItem('rememberChecked');

        if (savedChecked === 'true') {
            setIsChecked(true);
            if (savedEmail) setValue('email', savedEmail);
            if (savedPassword) setValue('password', savedPassword);
        }
    }, [setValue]);

    // Save or clear credentials when ischecked or inputs change
    useEffect(() => {
        if (ischecked) {
            localStorage.setItem('rememberEmail', emailValue || '');
            localStorage.setItem('rememberPassword', passwordValue || '');
            localStorage.setItem('rememberChecked', 'true');
        } else {
            localStorage.removeItem('rememberEmail');
            localStorage.removeItem('rememberPassword');
            localStorage.setItem('rememberChecked', 'false');
        }
    }, [ischecked, emailValue, passwordValue]);

    // Handle login submit
    const onSubmit = () => {
        setEmail(emailValue);
        setUsername("TestUser01");
        login();
        navigate('/');
    };

    return (
        <div className="main-wrapper">
            {/* Background Image */}
            <div className="main-image-section">
                <img src={BGImage} alt="Login Visual" className="bg-image" draggable={false} />
            </div>
            {/* Login Form */}
            <div className="form-section">
                <div className="form-container">
                    {/* Title And Description */}
                    <div className="B30N100" style={{ paddingBottom: '1.25rem' }} >Welcome back!</div>
                    <div className="R16N100">Log in to manage your foods and orders efficiently.</div>
                    <div className="registerHere-or-SignIn" style={{ paddingTop: '0.3rem', paddingBottom: "2rem" }}>
                        <div className="R16N100">Don't have an account?</div>
                        <div
                            className="B16Orange text-hover"
                            onClick={() => navigate('/register')}
                            style={{ cursor: 'pointer' }}
                        >
                            Register here !
                        </div>
                    </div>
                    {/* Email Input */}
                    <div style={{ marginBottom: '2rem' }}>
                        <div className='B13N100' style={{ paddingBottom: '0.9rem' }}>Email</div>
                        <div style={{ display: 'flex', alignItems: "center", gap: '0.625rem', paddingBottom: '0.4rem' }}>
                            <img
                                src={EmailIcon}
                                alt="Email Icon"
                                style={{ width: '1.2rem', height: '1.2rem', userSelect: 'none', pointerEvents: 'none' }}
                                draggable={false}
                            />
                            <Controller
                                control={control}
                                name="email"
                                render={({ field }) => (
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="Enter Your Email"
                                        className="user-input"
                                        maxLength={30}
                                        {...field}
                                        onFocus={() => setEmailFocused(true)}
                                        onBlur={(e) => {
                                            setEmailFocused(false);
                                            field.onBlur(e);
                                        }}
                                    />
                                )}
                            />
                        </div>
                        <div className={emailFocused ? 'orange-stroke' : 'black-stroke'} />
                        {errors.email && (
                            <div style={{ color: 'red', fontSize: 12, marginTop: 4 }}>{errors.email.message}</div>
                        )}
                    </div>
                    {/* Password Input */}
                    <div style={{ marginBottom: '1rem' }}>
                        <div className='B13N100' style={{ paddingBottom: '0.9rem' }}>Password</div>
                        <div style={{ display: 'flex', alignItems: "center", gap: '0.625rem', paddingBottom: '0.4rem' }}>
                            <img
                                src={LockIcon}
                                alt="Lock Icon"
                                style={{ width: '1.2rem', height: '1.2rem', userSelect: 'none', pointerEvents: 'none' }}
                                draggable={false}
                            />
                            <Controller
                                control={control}
                                name="password"
                                render={({ field }) => (
                                    <input
                                        id="password"
                                        type={visible ? 'text' : 'password'}
                                        placeholder="Enter Your Password"
                                        className="user-input"
                                        maxLength={20}
                                        {...field}
                                        onFocus={() => setPasswordFocused(true)}
                                        onBlur={(e) => {
                                            setPasswordFocused(false);
                                            field.onBlur(e);
                                        }}
                                    />
                                )}
                            />
                            {/* Show visibility icon only if password has value */}
                            {passwordValue ? (
                                <img
                                    src={visible ? InisibleIcon : VisibleIcon}
                                    alt={visible ? "Hide password" : "Show password"}
                                    onClick={() => setVisible(prev => !prev)}
                                    style={{ width: '0.9rem', height: '0.9rem', cursor: 'pointer', userSelect: 'none' }}
                                    draggable={false}
                                />
                            ) : null}
                        </div>
                        <div className={passwordFocused ? 'orange-stroke' : 'black-stroke'} />
                        {errors.password && (
                            <div style={{ color: 'red', fontSize: 12, marginTop: 4 }}>{errors.password.message}</div>
                        )}
                    </div>
                    {/* Remember Me & Forgot Password */}
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: '3rem' }}>
                        {/* Remember Me */}
                        <div style={{ display: 'flex', gap: '0.625rem', alignItems: "center" }}>
                            <div
                                onClick={() => setIsChecked(prev => !prev)}
                                className={ischecked ? 'CheckedrememberMeBox' : 'rememberMeBox'}
                                style={{ display: "flex", alignItems: "center" }}
                            >
                                {ischecked ?
                                    <img
                                        src={TickIcon}
                                        alt="TickIcon"
                                        style={{ width: '0.8rem', height: '0.8rem' }}
                                    /> : null}
                            </div>
                            <div
                                className='L12N100 text-hover'
                                style={{ cursor: "pointer" }}
                            >
                                Remember Me
                            </div>
                        </div>
                        {/* Forgot Password */}
                        <div style={{ display: 'flex', gap: '0.625rem', alignItems: "center" }}>
                            <div
                                onClick={() => navigate('/forgotpass')}
                                className='B12Orange text-hover'
                                style={{ cursor: "pointer" }}
                            >
                                Forgot Password ?
                            </div>
                        </div>
                    </div>

                    <button
                        className="submit-button SB16N10"
                        onClick={handleSubmit(onSubmit)}
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;