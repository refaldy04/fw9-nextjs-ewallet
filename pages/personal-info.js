import React, { useState, useEffect } from 'react';
import { SSRProvider } from 'react-bootstrap';
import MainLayout from '../components/Main';
import Link from 'next/link';
import axios from '../helpers/axios';
import Cookies from 'js-cookie';

export default function PersonalInfo() {
  const [data, setData] = useState([]);

  const getDataUser = async () => {
    try {
      const user = Cookies.get('id');
      const result = await axios.get(`user/profile/${user}`);
      setData(result.data.data);
      // console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataUser();
  }, []);
  return (
    <SSRProvider>
      <MainLayout>
        <div className="col-12 mt-5 mt-lg-0 d-flex flex-column gap-4 rounded-4 personal-info">
          <h4>Personal Information</h4>
          <p className="col-lg-6">We got your personal information from the sign up proccess. If you want to make changes on your information, contact our support.</p>
          <div className="d-flex flex-column gap-5">
            <div className="flex flex-column container card-pesonal-info">
              <p className="key">First Name</p>
              <h5 className="value">{data.firstName}</h5>
            </div>
            <div className="flex flex-column container card-pesonal-info">
              <p className="key">Last Name</p>
              <h5 className="value">{data.lastName}</h5>
            </div>
            <div className="flex flex-column container card-pesonal-info">
              <p className="key">Verified E-mail</p>
              <h5 className="value">{data.email}</h5>
            </div>
            <div className="d-flex flex-column flex-lg-row justify-content-between container card-pesonal-info">
              <div>
                <p className="key">Phone Number</p>
                <h5 className="value">{data.noTelp}</h5>
              </div>
              <Link href="/edit-phone">Manage</Link>
            </div>
          </div>
        </div>
      </MainLayout>
    </SSRProvider>
  );
}
