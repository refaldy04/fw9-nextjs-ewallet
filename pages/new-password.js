import React, { useState } from 'react';
import Auth from '../components/Auth';
import axios from '../helpers/axios';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

export default function Register() {
  const [form, setForm] = useState({ first: '', sec: '', third: '', fourth: '', fifth: '', sixth: '' });

  const handleChangeText = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const router = useRouter();

  const handleSubmit = async () => {
    try {
      router.push('/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Auth>
        <div className="col-md-9">
          <h3 className="fw-motto fw-margin">Did You Forgot Your Password? Don’t Worry, You Can Reset Your Password In a Minutes.</h3>
          <p className="fw-accessibility mt-4">To reset your password, you must type your e-mail and we will send a link to your email and you will be directed to the reset password screens.</p>
          <input type="password" className="form-control my-2 mt-5" name="email" placeholder="Create new password" onChange={handleChangeText} />
          <input type="password" className="form-control my-2 mt-4" name="email" placeholder="Create new password" onChange={handleChangeText} />

          <div className="d-grid gap-2">
            <button className="btn btn-dark mt-3 fw-login-btn text-light" onClick={handleSubmit}>
              Reset Password
            </button>
          </div>
        </div>
      </Auth>
    </>
  );
}
