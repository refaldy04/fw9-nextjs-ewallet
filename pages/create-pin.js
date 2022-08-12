import React, { useState } from 'react';
import Auth from '../components/Auth';
import axios from '../helpers/axios';
import { useRouter } from 'next/router';

export default function Register() {
  const [form, setForm] = useState({ first: '', sec: '', third: '', fourth: '', fifth: '', sixth: '' });

  const handleChangeText = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const router = useRouter();

  const handleSubmit = async () => {
    try {
      console.log(Object.values(form).join(''));
      //   const result = await axios.post('auth/register', form);
      //   console.log(result);
      //   if (result.status === 200) {
      //     console.log('ahoy');
      //     router.push('/login');
      //   } else {
      //     console.log(result);
      //   }
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
          <div className="d-flex gap-2 input-pin">
            <input type="text" className="form-control my-2" name="first" maxLength="1" onChange={handleChangeText} />
            <input type="text" className="form-control my-2" name="sec" maxLength="1" onChange={handleChangeText} />
            <input type="text" className="form-control my-2" name="third" maxLength="1" onChange={handleChangeText} />
            <input type="text" className="form-control my-2" name="fourth" maxLength="1" onChange={handleChangeText} />
            <input type="text" className="form-control my-2" name="fifth" maxLength="1" onChange={handleChangeText} />
            <input type="text" className="form-control my-2" name="sixth" maxLength="1" onChange={handleChangeText} />
          </div>

          <button className="btn btn-primary mt-3 fw-login-btn text-light" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </Auth>
    </>
  );
}
