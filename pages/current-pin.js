import React, { useState, useEffect } from 'react';
import MainLayout from '../components/Main';
import Link from 'next/link';
import { SSRProvider } from 'react-bootstrap';
import { useRouter } from 'next/router';

export default function CurrentPin() {
  const [form, setForm] = useState({ first: '', sec: '', third: '', fourth: '', fifth: '', sixth: '' });

  const handleChangeText = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const router = useRouter();

  const handleSubmit = async () => {
    try {
      console.log(form);
      router.push('/new-pin');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SSRProvider>
      <MainLayout>
        <div className="col-12 mt-5 mt-lg-0 d-flex flex-column gap-4 rounded-4 personal-info">
          <h4>Change PIN</h4>
          <p className="col-lg-6">Enter your current 6 digits Zwallet PIN below to continue to the next steps.</p>
          <div className="d-flex flex-column gap-5 col-md-6 justify-content-center mx-auto mt-5">
            <div className="d-flex gap-2 input-pin justify-content-center">
              <input type="text" className="form-control my-2" name="first" maxLength="1" onChange={handleChangeText} />
              <input type="text" className="form-control my-2" name="sec" maxLength="1" onChange={handleChangeText} />
              <input type="text" className="form-control my-2" name="third" maxLength="1" onChange={handleChangeText} />
              <input type="text" className="form-control my-2" name="fourth" maxLength="1" onChange={handleChangeText} />
              <input type="text" className="form-control my-2" name="fifth" maxLength="1" onChange={handleChangeText} />
              <input type="text" className="form-control my-2" name="sixth" maxLength="1" onChange={handleChangeText} />
            </div>
            <div className="d-grid gap-2">
              <button onClick={handleSubmit} className="btn btn-dark text-light " type="submit">
                Change PIN
              </button>
            </div>
          </div>
        </div>
      </MainLayout>
    </SSRProvider>
  );
}
