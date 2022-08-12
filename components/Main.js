import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Navbar from './microComponents/Navbar';
import Cookies from 'js-cookie';
import DropdownMenu from './microComponents/Dropdown';
import Link from 'next/link';
import Footer from './microComponents/Footer';

export default function MainLayout(props) {
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
    // router.push('/login');
  };

  return (
    <>
      <Head>
        <title>{props.title ? props.title : 'FazzPay'}</title>
      </Head>
      <Navbar />
      <DropdownMenu />
      <div className="row pages">
        <div className="col-lg-2 flex-column justify-content-between align-items-center fw9-menu-list d-none d-lg-flex">
          <div className="d-flex flex-column gap-5">
            <Link href="/dashboard" className="d-flex gap-4 fw9-semibold">
              <p className="fw9-menu">Dashboard</p>
            </Link>
            <Link href="/search-receiver" className="d-flex gap-4">
              <p className="fw9-menu">Transfer</p>
            </Link>
            <Link href="/top-up" className="d-flex gap-4">
              <p className="fw9-menu">Top Up</p>
            </Link>
            <Link href="/profile" className="d-flex gap-4">
              <p className="fw9-menu">Profile</p>
            </Link>
          </div>
          <div>
            <Link onClick={onLogout} href="/login" className="d-flex gap-4">
              <p className="fw9-menu">Log Out</p>
            </Link>
          </div>
        </div>
        <main className="col-lg-10">{props.children}</main>
      </div>
      <Footer />
    </>
  );
}
