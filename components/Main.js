import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Navbar from './microComponents/Navbar';
import Cookies from 'js-cookie';

export default function MainLayout(props) {
  const router = useRouter();
  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = () => {
    const token = Cookies.get('token');
    if (!token) {
      router.push('/auth/login');
    }
  };

  return (
    <>
      <Head>
        <title>{props.title ? props.title : 'FazzPay'}</title>
      </Head>
      <Navbar />
      <div>Aside Component</div>
      <main>{props.children}</main>
      <div>Footer Component</div>
    </>
  );
}
