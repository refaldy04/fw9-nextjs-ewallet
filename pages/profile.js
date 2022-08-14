import React, { useState, useEffect } from 'react';
import { SSRProvider } from 'react-bootstrap';
import MainLayout from '../components/Main';
import Cookies from 'js-cookie';
import axios from '../helpers/axios';
import Card from 'react-bootstrap/Card';
import { useRouter } from 'next/router';

export default function Profile() {
  const [data, setData] = useState([]);

  const router = useRouter();

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
        <div className="col-12 mt-5 mt-lg-0 d-flex flex-column gap-2 rounded-4 status-success profile-page">
          <img src={data.image ? `https://res.cloudinary.com/dd1uwz8eu/image/upload/v1659549135/${data.image}` : '/user-default.jpg'} alt="" className="main-profile-pict mx-auto" />
          <button type="button" id="leftbutton" className="button-fw9">
            Edit
          </button>
          <div class="mx-auto">
            <h3 class="text-center fw9-fullname">
              {data.firstName} {data.lastName}
            </h3>
            <p class="text-center fw9-phone">{data.noTelp}</p>
          </div>
          <div class="d-flex flex-column align-items-center gap-3 mt-5">
            <Card className="col-12 rounded-3 card-profile" onClick={() => router.push('/dashboard')}>
              <Card.Body>Personal Information</Card.Body>
            </Card>
            <Card className="col-12 rounded-3 card-profile" onClick={() => router.push('/dashboard')}>
              <Card.Body>Change Password</Card.Body>
            </Card>
            <Card className="col-12 rounded-3 card-profile" onClick={() => router.push('/dashboard')}>
              <Card.Body>Change PIN</Card.Body>
            </Card>
            <Card className="col-12 rounded-3 card-profile" onClick={() => router.push('/dashboard')}>
              <Card.Body>Logout</Card.Body>
            </Card>
          </div>
        </div>
      </MainLayout>
    </SSRProvider>
  );
}
