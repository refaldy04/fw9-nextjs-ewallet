import React, { useState, useEffect } from 'react';
import { SSRProvider } from 'react-bootstrap';
import MainLayout from '../components/Main';
import Link from 'next/link';
import axios from '../helpers/axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

export default function ChangePassword() {
  const [form, setForm] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
  const [data, setData] = useState([]);

  const handleChangeText = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const router = useRouter();

  const handleSubmit = async () => {
    try {
      console.log(form);
      const id = Cookies.get('id');
      const result = await axios.patch(`user/password/${id}`, form);
      console.log(result);
      router.push('/profile');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SSRProvider>
      <MainLayout>
        <div className="col-12 mt-5 mt-lg-0 d-flex flex-column gap-4 rounded-4 personal-info">
          <h4>Edit Phone Number</h4>
          <p className="col-lg-6">Add at least one phone number for the transfer ID so you can start transfering your money to another user.</p>
          <div className="d-flex flex-column gap-5 col-md-6 justify-content-center mx-auto">
            <div className=" mt-5 my-2">
              <label className="visually-hidden" htmlFor="autoSizingInputGroup">
                oldPassword
              </label>
              <div className="input-group">
                <div className="input-group-text">
                  <i data-feather="lock"></i>
                </div>
                <input type="password" name="oldPassword" className="form-control" placeholder="Enter your phone number" onChange={handleChangeText} />
              </div>
            </div>

            <div className="d-grid gap-2">
              <button onClick={handleSubmit} className="btn btn-dark text-light " type="submit">
                Edit Phone Number
              </button>
            </div>
          </div>
        </div>
      </MainLayout>
    </SSRProvider>
  );
}
