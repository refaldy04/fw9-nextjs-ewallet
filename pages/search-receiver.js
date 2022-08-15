import React, { useState, useEffect } from 'react';
import { SSRProvider } from 'react-bootstrap';
import MainLayout from '../components/Main';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from '../helpers/axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { IconContext } from 'react-icons';
import { FiDownload, FiShare2 } from 'react-icons/fi';

export default function Transfer() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ keyword: '' });

  const handleChangeText = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      console.log(form);
      const result = await axios.get(`user?page=1&limit=5&search=${form.keyword}&sort=firstName ASC`);
      setData(result.data.data);
      // console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataUser();
  }, []);

  const router = useRouter();

  const getDataUser = async () => {
    try {
      const result = await axios.get(`user?page=1&limit=4&search=&sort=firstName ASC`);
      setData(result.data.data);
      // console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SSRProvider>
      <MainLayout>
        <div className="col-lg-9 col-12 mt-5 mt-lg-0 d-flex flex-column gap-4 rounded-4 fw9-search-receiver">
          <p>Search Receiver</p>
          <InputGroup className="mb-3">
            <Button variant="outline-dark" id="button-addon1" onClick={handleSubmit}>
              Button
            </Button>
            <Form.Control name="keyword" aria-label="Example text with button addon" aria-describedby="basic-addon1" onChange={handleChangeText} />
          </InputGroup>

          <div className="d-flex flex-column gap-5 mt-4 mt-xl-0">
            {data.map((user) => (
              <button
                key={user.id}
                className="button-fw9 d-flex align-items-start justify-content-between flex-column flex-xl-row"
                onClick={() => {
                  Cookies.set('recipientID', user.id);
                  router.push('/input-amount');
                }}
              >
                <div className="d-flex align-items-start gap-2 user text-dark">
                  <img src={user.image ? `https://res.cloudinary.com/dd1uwz8eu/image/upload/v1659549135/${user.image}` : '/user-default.jpg'} alt="Samuel" className="img-fluid fw9-profile-pict" />
                  <div className="d-flex flex-column justify-content-between text-start">
                    <h5 className="name-history">{`${user.firstName} ${user.lastName}`}</h5>
                    <p className="type-history">{user.noTelp}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </MainLayout>
    </SSRProvider>
  );
}
