import React, { useState } from 'react';
import Auth from '../components/Auth';
import axios from '../helpers/axios';
import { useRouter } from 'next/router';

export default function Register() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' });

  const handleChangeText = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const router = useRouter();

  const handleSubmit = async () => {
    try {
      console.log(form);
      const result = await axios.post('auth/register', form);
      console.log(result);
      if (result.status === 200) {
        console.log('ahoy');
        router.push('/login');
      } else {
        console.log(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Auth>
        <div>
          <h3 className="fw-motto fw-margin">Start Accessing Banking Needs With All Devices and All Platforms With 30.000+ Users</h3>
          <p className="fw-accessibility mt-4">Transfering money is eassier than ever, you can access Zwallet wherever you are. Desktop, laptop, mobile phone? we cover all of that for you!</p>
          <input type="text" className="form-control my-2" name="firstName" placeholder="Enter your firstname ..." onChange={handleChangeText} />
          <input type="text" className="form-control my-2" name="lastName" placeholder="Enter your lastname ..." onChange={handleChangeText} />
          <input type="email" className="form-control my-2" name="email" placeholder="Input email ..." onChange={handleChangeText} />
          <input type="password" className="form-control my-2" name="password" placeholder="Input password ..." onChange={handleChangeText} />
          <button className="btn btn-primary mt-3 fw-login-btn text-light" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </Auth>
    </>
  );
}
