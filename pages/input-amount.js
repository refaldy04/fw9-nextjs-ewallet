import React, { useState, useEffect } from 'react';
import { SSRProvider } from 'react-bootstrap';
import MainLayout from '../components/Main';
import Cookies from 'js-cookie';
import axios from '../helpers/axios';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

export default function InputAmount() {
  const [dataRecipient, setDataRecipient] = useState([]);
  const [dataUser, setDataUser] = useState([]);
  const recipient = Cookies.get('recipientID');
  const [form, setForm] = useState({ receiverId: recipient, amount: '', notes: '' });

  useEffect(() => {
    getData();
  }, []);

  const handleChangeText = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const getData = async () => {
    try {
      const user = Cookies.get('id');
      const resultRecipient = await axios.get(`user/profile/${recipient}`);
      const resultUser = await axios.get(`user/profile/${user}`);
      setDataRecipient(resultRecipient.data.data);
      setDataUser(resultUser.data.data);
      // console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const router = useRouter();

  const dataTransfer = useSelector((state) => state.user.dataTransfer);

  const handleSubmit = async () => {
    try {
      console.log(form);
      dataTransfer = form;
      console.log(dataTransfer);
      router.push('/confirmation');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SSRProvider>
      <MainLayout>
        <div className="col-12 mt-5 mt-lg-0 d-flex flex-column gap-4 rounded-4 fw9-input-amount">
          <p>Transfer Money</p>
          <div className="d-flex align-items-start justify-content-between flex-column flex-xl-row fw9-receiver">
            <div className="d-flex align-items-start gap-2">
              <img src={dataRecipient.image ? `https://res.cloudinary.com/dd1uwz8eu/image/upload/v1659549135/${dataRecipient.image}` : '/user-default.jpg'} alt="recipient" className="img-fluid fw9-profile-pict" />
              <div className="d-flex flex-column justify-content-between">
                <h5>
                  {dataRecipient.firstName} {dataRecipient.lastName}
                </h5>
                <p className="type-history">{dataRecipient.noTelp}</p>
              </div>
            </div>
          </div>
          <p className="mt-5">Type the amount you want to transfer and then press continue to the next steps.</p>
          <div className="d-flex flex-column align-items-center">
            {/* <FormInputMoney /> */}
            <input type="text" name="amount" className="text-secondary my-5 text-center fs-1 fw9-input-money" placeholder="0.0" onChange={handleChangeText} />

            <p>Rp {dataUser.balance} Available</p>

            <input type="text" name="notes" className="text-secondary my-5 text-center" placeholder="Add some notes" onChange={handleChangeText} />
          </div>
          <div className="d-flex justify-content-end">
            <button variant="dark" type="submit" className="btn btn-dark mt-4 button-input-money" onClick={handleSubmit}>
              Continue
            </button>
          </div>
        </div>
      </MainLayout>
    </SSRProvider>
  );
}
