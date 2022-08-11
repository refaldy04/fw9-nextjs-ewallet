import React, { useState } from 'react';
import axios from '../helpers/axios';
import Cookies from 'js-cookie';
import Auth from '../components/Auth';
import { useRouter } from 'next/router';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChangeText = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const router = useRouter();

  const handleSubmit = async () => {
    try {
      console.log(form);
      const result = await axios.post('auth/login', form);
      Cookies.set('token', result.data.data.token);
      if (result.data.data.pin) {
        console.log('ahoy');
        router.push('/dashboard');
      } else {
        router.push('/create-pin');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Auth>
      <div>
        <h3 className="fw-motto fw-margin">Start Accessing Banking Needs With All Devices and All Platforms With 30.000+ Users</h3>
        <p className="fw-accessibility mt-4">Transfering money is eassier than ever, you can access Zwallet wherever you are. Desktop, laptop, mobile phone? we cover all of that for you!</p>
        <input type="email" className="form-control my-2" name="email" placeholder="Input email ..." onChange={handleChangeText} />
        <input type="password" className="form-control my-2" name="password" placeholder="Input password ..." onChange={handleChangeText} />
        <button className="btn btn-primary mt-3 fw-login-btn text-light" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </Auth>
  );
}
