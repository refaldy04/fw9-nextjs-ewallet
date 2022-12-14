import React, { useState, useEffect } from 'react';
import { SSRProvider } from 'react-bootstrap';
import MainLayout from '../components/Main';
import Cookies from 'js-cookie';
import axios from '../helpers/axios';
import Card from 'react-bootstrap/Card';
import { useRouter } from 'next/router';

export default function Profile() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState('');

  const handleChangeText = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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

  const handleSubmit = async () => {
    try {
      console.log(form);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SSRProvider>
      <MainLayout>
        <div className="col-12 mt-5 mt-lg-0 d-flex flex-column gap-2 rounded-4 status-success profile-page">
          <img src={data.image ? `https://res.cloudinary.com/dd1uwz8eu/image/upload/v1659549135/${data.image}` : '/user-default.jpg'} alt="" className="main-profile-pict mx-auto" />
          <button className="button-fw9">
            <input type="file" className="image-input" name="image" onChange={handleChangeText} />
          </button>

          <button type="submit" onClick={handleSubmit}></button>

          <div className="mx-auto">
            <h3 className="text-center fw9-fullname">
              {data.firstName} {data.lastName}
            </h3>
            <p className="text-center fw9-phone">{data.noTelp}</p>
          </div>
          <div className="d-flex flex-column align-items-center gap-3 mt-5">
            <Card className="col-10 rounded-3 card-profile" onClick={() => router.push('/personal-info')}>
              <Card.Body>Personal Information</Card.Body>
            </Card>
            <Card className="col-10 rounded-3 card-profile" onClick={() => router.push('/change-password')}>
              <Card.Body>Change Password</Card.Body>
            </Card>
            <Card className="col-10 rounded-3 card-profile" onClick={() => router.push('/current-pin')}>
              <Card.Body>Change PIN</Card.Body>
            </Card>
            <Card className="col-10 rounded-3 card-profile" onClick={() => router.push('/dashboard')}>
              <Card.Body>Logout</Card.Body>
            </Card>
          </div>
        </div>
      </MainLayout>
    </SSRProvider>
  );
}
