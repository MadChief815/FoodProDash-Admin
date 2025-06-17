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

// CSS
import "../../Styles/Authentication.css"

const emailSchema = z.object({
    email: z
        .string()
        .email({ message: "Invalid email address" }),
});

const ForgotPasswordPage = () => {

    // Navigation
    const navigate = useNavigate();

    // States
    const [emailFocused, setEmailFocused] = useState(false);

    // React Hook Form setup
    const { control, handleSubmit, setValue, watch, getValues, formState: { errors } } = useForm({
        resolver: zodResolver(emailSchema),
        defaultValues: {
            email: '',
        }
    });

    // Watch Values
    const emailValue = watch('email');

    // Handle login submit
    const onSubmit = (data) => {
        // login();
        // navigate('/');
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
                    <div className="B30N100" style={{ paddingBottom: '1.25rem' }}>
                        Recover Account
                    </div>
                    <div className="R16N100">
                        Enter your registered email to receive recover instructions.
                    </div>
                    <div className="registerHere-or-SignIn" style={{ paddingTop: '0.3rem', paddingBottom: '2rem' }}>
                        <div className="R16N100">Remembered your password?</div>
                        <div
                            className="B16Orange text-hover"
                            onClick={() => navigate('/login')}
                            style={{ cursor: 'pointer' }}
                        >
                            Sign In
                        </div>
                    </div>

                    {/* Email Input */}
                    <div style={{ marginBottom: '3rem' }}>
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

                    <button
                        className="submit-button SB16N10"
                        onClick={handleSubmit(onSubmit)}
                    >
                        Send Link
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;