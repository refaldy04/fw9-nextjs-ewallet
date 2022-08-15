import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Navbar from './microComponents/Navbar';
import Cookies from 'js-cookie';
import DropdownMenu from './microComponents/Dropdown';
import Link from 'next/link';
import Footer from './microComponents/Footer';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import axios from '../helpers/axios';

function MydModalWithGrid(props) {
  const [form, setForm] = useState({ amount: '' });

  const handleChangeText = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async () => {
    try {
      console.log(form);
      const result = await axios.post('transaction/top-up', form);
      window.open(result.data.data.redirectUrl);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Topup</Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>
          <p>Enter the amount of money, and click submit</p>
          <Row className="my-5">
            <Col xs={12} md={8} className="d-flex justify-content-center mx-auto">
              <input type="text" name="amount" className="mx-auto text-center" onChange={handleChangeText} />
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmit} variant="dark" className="text-light">
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default function MainLayout(props) {
  const [modalShow, setModalShow] = useState(false);
  const router = useRouter();
  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = () => {
    const token = Cookies.get('token');
    if (!token) {
      router.push('/login');
    }
  };

  const onLogout = () => {
    Cookies.remove('token');
    Cookies.remove('id');
    router.push('/login');
  };

  return (
    <>
      <Head>
        <title>{props.title ? props.title : 'Reewallet'}</title>
      </Head>
      <Navbar />
      <DropdownMenu />
      <div className="row pages">
        <div className="col-lg-2 flex-column justify-content-between align-items-center fw9-menu-list d-none d-lg-flex">
          <div className="d-flex flex-column gap-5">
            <Link href="/dashboard" className="d-flex gap-4 link-dasboard">
              <p className="fw9-menu">Dashboard</p>
            </Link>
            <Link href="/search-receiver" className="d-flex gap-4 link-dasboard">
              <p className="fw9-menu">Transfer</p>
            </Link>
            <button className="button-fw9 fw-normal text-start p-0 fw9-menu" onClick={() => setModalShow(true)}>
              Top Up
            </button>

            <MydModalWithGrid show={modalShow} onHide={() => setModalShow(false)} />
            <Link href="/profile" className="d-flex gap-4 link-dasboard">
              <p className="fw9-menu">Profile</p>
            </Link>
          </div>
          <div>
            <button onClick={onLogout} className="d-flex gap-4 button-fw9">
              <p className="fw9-menu">Log Out</p>
            </button>
          </div>
        </div>
        <main className="col-lg-10 d-flex align-items-stretch">{props.children}</main>
      </div>
      <Footer />
    </>
  );
}
