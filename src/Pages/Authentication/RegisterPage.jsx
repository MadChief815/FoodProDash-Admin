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
import UserIcon from "../../assets/SVGs/Authentication/user.svg";

// CSS
import "../../Styles/Authentication.css"

const registerSchema = z.object({
  username: z
    .string()
    .min(5, "Username must be at least 5 characters"),

  email: z
    .string()
    .email({ message: "Invalid email address" }),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),

  confirmPassword: z
    .string()
}).refine((data) => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: "Passwords do not match",
});

const RegisterPage = () => {

  // Authentication
  const { login, setEmail, setUsername } = useAuth();

  // Navigation
  const navigate = useNavigate();

  // States
  const [emailFocused, setEmailFocused] = useState(false);
  const [userNameFocused, setUserNameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmPassFocused, setConfirmPassFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [confrimPassvisible, setConfirmPassVisible] = useState(false);

  // React Hook Form setup
  const { control, handleSubmit, setValue, watch, getValues, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      username: '',
      password: '',
      confirmPassword: ''
    }
  });

  // Watch Values
  const emailValue = watch('email');
  const userNameValue = watch('username');
  const passwordValue = watch('password');
  const confirmPasswordValue = watch('confirmPassword');

  // Handle login submit
  const onSubmit = () => {
    setEmail(emailValue);
    setUsername(userNameValue);
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
          <div className="B30N100" style={{ paddingBottom: '1.25rem' }}>Get Started by Registering</div>
          <div className="R16N100">Join now to manage your restaurant’s menu and order flow.</div>
          <div className="registerHere-or-SignIn" style={{ paddingTop: '0.3rem', paddingBottom: "2rem" }}>
            <div className="R16N100">Already registered?</div>
            <div
              className="B16Orange text-hover"
              onClick={() => navigate('/login')}
              style={{ cursor: 'pointer' }}
            >
              Sign In
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
          {/* User Name Input */}
          <div style={{ marginBottom: '2rem' }}>
            <div className='B13N100' style={{ paddingBottom: '0.9rem' }}>Username</div>
            <div style={{ display: 'flex', alignItems: "center", gap: '0.625rem', paddingBottom: '0.4rem' }}>
              <img
                src={UserIcon}
                alt="User Icon"
                style={{ width: '1.2rem', height: '1.2rem', userSelect: 'none', pointerEvents: 'none' }}
                draggable={false}
              />
              <Controller
                control={control}
                name="username"
                render={({ field }) => (
                  <input
                    id="username"
                    type="username"
                    placeholder="Enter Your User Name"
                    className="user-input"
                    maxLength={20}
                    {...field}
                    onFocus={() => setUserNameFocused(true)}
                    onBlur={(e) => {
                      setUserNameFocused(false);
                      field.onBlur(e);
                    }}
                  />
                )}
              />
            </div>
            <div className={userNameFocused ? 'orange-stroke' : 'black-stroke'} />
            {errors.username && (
              <div style={{ color: 'red', fontSize: 12, marginTop: 4 }}>{errors.username.message}</div>
            )}
          </div>
          {/* Password Input */}
          <div style={{ marginBottom: '2rem' }}>
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
          {/* Confrim Password Input */}
          <div style={{ marginBottom: '3rem' }}>
            <div className='B13N100' style={{ paddingBottom: '0.9rem' }}>Confirm Password</div>
            <div style={{ display: 'flex', alignItems: "center", gap: '0.625rem', paddingBottom: '0.4rem' }}>
              <img
                src={LockIcon}
                alt="Lock Icon"
                style={{ width: '1.2rem', height: '1.2rem', userSelect: 'none', pointerEvents: 'none' }}
                draggable={false}
              />
              <Controller
                control={control}
                name="confirmPassword"
                render={({ field }) => (
                  <input
                    id="confirm_password"
                    type={confrimPassvisible ? 'text' : 'password'}
                    placeholder="Confirm Your Password"
                    className="user-input"
                    maxLength={20}
                    {...field}
                    onFocus={() => setConfirmPassFocused(true)}
                    onBlur={(e) => {
                      setConfirmPassFocused(false);
                      field.onBlur(e);
                    }}
                  />
                )}
              />
              {/* Show visibility icon only if password has value */}
              {confirmPasswordValue ? (
                <img
                  src={confrimPassvisible ? InisibleIcon : VisibleIcon}
                  alt={confrimPassvisible ? "Hide password" : "Show password"}
                  onClick={() => setConfirmPassVisible(prev => !prev)}
                  style={{ width: '0.9rem', height: '0.9rem', cursor: 'pointer', userSelect: 'none' }}
                  draggable={false}
                />
              ) : null}
            </div>
            <div className={confirmPassFocused ? 'orange-stroke' : 'black-stroke'} />
            {errors.confirmPassword && (
              <div style={{ color: 'red', fontSize: 12, marginTop: 4 }}>{errors.confirmPassword.message}</div>
            )}
          </div>

          <button
            className="submit-button SB16N10"
            onClick={handleSubmit(onSubmit)}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;