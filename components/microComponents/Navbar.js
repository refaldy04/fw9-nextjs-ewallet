import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import axios from '../../helpers/axios';
import Cookies from 'js-cookie';

export default function NavbarMenu() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getDataUser();
  }, []);

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

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home" className="text-light">
          REEWALLET
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            <div className="d-flex gap-3 align-items-start justify-content-lg-end mt-3">
              <img src={data.image ? `https://res.cloudinary.com/dd1uwz8eu/image/upload/v1659549135/${data.image}` : '/user-default.jpg'} className="fw9-profile-pict" alt="profile" />
              <div className="d-flex flex-column justify-content-end">
                <p className="fw9-name-user text-light mb-0 pb-0">{`${data.firstName} ${data.lastName}`}</p>
                <p className="text-light">{data.noTelp}</p>
              </div>
              <div className="d-flex">
                <i data-feather="bell"></i>
              </div>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
