import React, { useState, useEffect } from 'react';
import MainLayout from '../components/Main';
import { SSRProvider } from 'react-bootstrap';
import { IconContext } from 'react-icons';
import { FiX } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import axios from '../helpers/axios';
import Cookies from 'js-cookie';

export default function Success() {
  const [dataUser, setDataUser] = useState([]);
  const [dataRecipient, setDataRecipient] = useState([]);
  const router = useRouter();
  const user = useSelector((state) => state.user);
  const id = Cookies.get('id');
  const recipientID = Cookies.get('recipientID');

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const result = await axios.get(`user/profile/${id}`);
      const resultRecipient = await axios.get(`user/profile/${recipientID}`);
      //   console.log(result);
      setDataUser(result.data.data);
      setDataRecipient(resultRecipient.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const today = new Date();
  const time = today.getHours() + ':' + today;

  return (
    <SSRProvider>
      <MainLayout>
        <div className="col-12 mt-5 mt-lg-0 d-flex flex-column gap-4 rounded-4 status-success">
          <div className="rounded-circle d-flex justify-content-center align-items-center bg-dark p-3 mx-auto">
            <IconContext.Provider value={{ size: '2em', color: 'white' }}>
              <FiX className="fw-bold" />
            </IconContext.Provider>
          </div>

          <p className="fw9-text-status mx-auto">Transfer Failed</p>

          <div className="d-flex align-items-start gap-2 fw9-detail">
            <div className="d-flex flex-column justify-content-between">
              <h5 className="name-history">Amount</h5>
              <p className="type-history">Rp{user.transferData.amount}</p>
            </div>
          </div>
          <div className="d-flex align-items-start gap-2 fw9-detail">
            <div className="d-flex flex-column justify-content-between">
              <h5 className="name-history">Balance Left</h5>
              <p className="type-history">Rp{dataUser.balance}</p>
            </div>
          </div>
          <div className="d-flex align-items-start gap-2 fw9-detail">
            <div className="d-flex flex-column justify-content-between">
              <h5 className="name-history">Date And Time</h5>
              <p className="type-history">{time}</p>
            </div>
          </div>
          <div className="d-flex align-items-start gap-2 fw9-detail">
            <div className="d-flex flex-column justify-content-between">
              <h5 className="name-history">Notes</h5>
              <p className="type-history">{user.transferData.notes}</p>
            </div>
          </div>

          <p className="transfer-header">Transfer To</p>
          <div className="d-flex align-items-start justify-content-between flex-column flex-xl-row fw9-receiver">
            <div className="d-flex align-items-start gap-2">
              <img src={dataRecipient.image ? `https://res.cloudinary.com/dd1uwz8eu/image/upload/v1659549135/${dataRecipient.image}` : '/user-default.jpg'} alt="" className="img-fluid fw9-profile-pict" />
              <div className="d-flex flex-column justify-content-between">
                <h5 className="name-history">
                  {dataRecipient.firstName} {dataRecipient.lastName}
                </h5>
                <p className="type-history">{dataRecipient.noTelp}</p>
              </div>
            </div>
          </div>

          <div className="d-flex flex-column flex-lg-row justify-content-end gap-3 mt-5">
            <button onClick={() => router.push('/confirmation')} type="button" className="btn btn-dark fw-bold text-light d-flex align-items-center">
              Try Again
            </button>
          </div>
        </div>
      </MainLayout>
    </SSRProvider>
  );
}
