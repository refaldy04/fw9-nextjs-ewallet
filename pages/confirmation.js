import React, { useState, useEffect } from 'react';
import { SSRProvider } from 'react-bootstrap';
import MainLayout from '../components/Main';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import axios from '../helpers/axios';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import { useRouter } from 'next/router';

function MydModalWithGrid(props) {
  const [form, setForm] = useState({ first: '', sec: '', third: '', fourth: '', fifth: '', sixth: '' });

  const handleChangeText = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const user = useSelector((state) => state.user);

  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const data = { pin: Object.values(form).join('') };

      const result = await axios.get(`user/pin?pin=${data.pin}`);
      console.log(result);

      const reqTransfer = { receiverId: Cookies.get('recipientID'), amount: parseInt(user.transferData.amount), notes: user.transferData.notes };

      console.log(reqTransfer);
      if (result.status == 200) {
        const transfer = await axios.post(`/transaction/transfer`, reqTransfer);
        console.log(transfer);
        if (transfer.status == 200) {
          router.push('/success');
        } else {
          router.push('/failed');
        }
      } else {
        router.push('/failed');
      }
    } catch (error) {
      router.push('/failed');
    }
  };
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className="d-block">
          Enter PIN to Transfer
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>
          <p className="my-4 d-block">Enter your 6 digits PIN for confirmation to continue transferring money. </p>
          <Row className="d-flex justify-content-center my-5">
            <Col xs={12} md={8}>
              <div className="d-flex gap-2 input-pin justify-content-center">
                <input type="text" className="form-control my-2" name="first" maxLength="1" onChange={handleChangeText} />
                <input type="text" className="form-control my-2" name="sec" maxLength="1" onChange={handleChangeText} />
                <input type="text" className="form-control my-2" name="third" maxLength="1" onChange={handleChangeText} />
                <input type="text" className="form-control my-2" name="fourth" maxLength="1" onChange={handleChangeText} />
                <input type="text" className="form-control my-2" name="fifth" maxLength="1" onChange={handleChangeText} />
                <input type="text" className="form-control my-2" name="sixth" maxLength="1" onChange={handleChangeText} />
              </div>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={handleSubmit}>
          Continue
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default function Confirmation() {
  const user = useSelector((state) => state.user);
  const [dataRecipient, setDataRecipient] = useState([]);
  const [dataUser, setDataUser] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const user = Cookies.get('id');
      const recipient = Cookies.get('recipientID');
      const resultRecipient = await axios.get(`user/profile/${recipient}`);
      const resultUser = await axios.get(`user/profile/${user}`);
      setDataRecipient(resultRecipient.data.data);
      setDataUser(resultUser.data.data);
      // console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const today = new Date();
  const time = today.getHours() + ':' + today;

  const [modalShow, setModalShow] = useState(false);
  return (
    <SSRProvider>
      <MainLayout>
        <div className="col-12 mt-5 mt-lg-0 d-flex flex-column gap-4 rounded-4 fw9-input-amount">
          <p className="transfer-header">Transfer To</p>
          <div className="d-flex align-items-start justify-content-between flex-column flex-xl-row fw9-receiver">
            <div className="d-flex align-items-start gap-2">
              <img src={dataRecipient.image ? `https://res.cloudinary.com/dd1uwz8eu/image/upload/v1659549135/${dataRecipient.image}` : '/user-default.jpg'} alt="user" className="img-fluid fw9-profile-pict" />
              <div className="d-flex flex-column justify-content-between">
                <h5 className="name-history">
                  {dataRecipient.firstName} {dataRecipient.lastName}
                </h5>
                <p className="type-history">{dataRecipient.noTelp}</p>
              </div>
            </div>
          </div>
          <p className="transfer-header">Details</p>

          <div className="d-flex align-items-start gap-2 fw9-detail">
            <div className="d-flex flex-column justify-content-between">
              <h5 className="name-history">Amount</h5>
              <p className="type-history">Rp{user.transferData.amount}</p>
            </div>
          </div>
          <div className="d-flex align-items-start gap-2 fw9-detail">
            <div className="d-flex flex-column justify-content-between">
              <h5 className="name-history">Balance Left</h5>
              <p className="type-history">Rp{dataUser.balance - user.transferData.amount}</p>
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

          <div className="d-flex justify-content-end">
            <Button variant="dark" onClick={() => setModalShow(true)}>
              Continue
            </Button>

            <MydModalWithGrid show={modalShow} onHide={() => setModalShow(false)} />
          </div>
        </div>
      </MainLayout>
    </SSRProvider>
  );
}
