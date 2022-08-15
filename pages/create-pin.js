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
      const data = { pin: Object.values(form).join('') };
      const id = Cookies.get('id');
      console.log(data);

      const result = await axios.patch(`user/pin/${id}`, data);
      console.log(result);
      if (result.status === 200) {
        console.log('ahoy');
        router.push('/dashboard');
      } else {
        console.log('ayayay');
        console.log(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Auth>
        <div className="col-md-9">
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

          <div className="d-grid gap-2">
            <button className="btn btn-dark mt-3 fw-login-btn text-light" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </Auth>
    </>
  );
}
