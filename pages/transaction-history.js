import React, { useState, useEffect } from 'react';
import MainLayout from '../components/Main';
import { SSRProvider } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from '../helpers/axios';

export default function TransactionHistory() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ keyword: 'MONTH' });

  const getDataUser = async () => {
    try {
      const result = await axios.get(`transaction/history?page=1&limit=6&filter=${form.keyword}`);
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
        <div className="col-12 mt-5 mt-lg-0 d-flex flex-column gap-4 rounded-4 status-success">
          <div className="d-flex flex-column flex-lg-row justify-content-between mb-3">
            <h5>Transaction History</h5>
            <Dropdown>
              <Dropdown.Toggle variant="dark" id="dropdown-basic">
                -- Select Filter --
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setForm('MONTH')}>MONTH</Dropdown.Item>
                <Dropdown.Item onClick={() => setForm('WEEK')}>WEEK</Dropdown.Item>
                <Dropdown.Item onClick={() => setForm('YEAR')}>YEAR</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          {data.map((user) => (
            <div className="d-flex flex-column flex-lg-row justify-content-between" key={user.id}>
              <div className="d-flex gap-2">
                <img src={user.image ? `https://res.cloudinary.com/dd1uwz8eu/image/upload/v1659549135/${user.image}` : '/user-default.jpg'} alt="user" className="fw9-profile-pict" />
                <div>
                  <h5>
                    {user.firstName} {user.lastName}
                  </h5>
                  <p>{user.type}</p>
                </div>
              </div>
              <h5>Rp{user.amount}</h5>
            </div>
          ))}
        </div>
      </MainLayout>
    </SSRProvider>
  );
}
