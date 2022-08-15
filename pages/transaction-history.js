import React, { useState, useEffect } from 'react';
import MainLayout from '../components/Main';
import { SSRProvider } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import axiosServer from '../helpers/axiosServer';
import cookies from 'next-cookies';
import { useRouter } from 'next/router';

export async function getServerSideProps(context) {
  // ini dari dokumentasi
  try {
    console.log('Log Server Side');
    const dataCookie = cookies(context); // next-cookies akan mencari cookies dengan sendirinya pada context
    // console.log(dataCookie);
    // PROSES GET DATA
    const page = !context.query?.page ? 1 : context.query.page;
    const filter = !context.query?.filter ? 'MONTH' : context.query.page;
    const result = await axiosServer.get(`transaction/history?page=${page}&limit=5&filter=MONTH`, {
      headers: {
        Authorization: `Bearer ${dataCookie.token}`,
      },
    });
    // console.log(result);
    return {
      props: {
        data: result.data.data,
        pagination: result.data.pagination,
      }, // will be passed to the page component as props
    };
  } catch (error) {
    if (error.response.status === 403) {
      return {
        redirect: {
          destination: '/auth/login',
          permanent: false,
        },
      };
    } else {
      return {
        props: {
          isError: true,
          msg: error.response,
        },
      };
    }
  }
}

export default function TransactionHistory(props) {
  const router = useRouter();
  const [data, setData] = useState(props.data);
  const [pagination, setPagination] = useState(props.pagination);

  const getDataUser = async () => {};

  useEffect(() => {
    console.log(data);
  });

  const handlenNextPage = () => {
    router.push(`/transaction-history?page=${+router.query.page + 1}`);
  };
  const handlenPrevPage = async () => {
    router.push(`/transaction-history?page=${+router.query.page - 1}`);
  };

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
                <Dropdown.Item>MONTH</Dropdown.Item>
                <Dropdown.Item>WEEK</Dropdown.Item>
                <Dropdown.Item>YEAR</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          {data?.map((user) => (
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
          {/* <div className="d-flex justify-content-between">
            <button className="btn btn-dark" onClick={handlenPrevPage}>
              Prev
            </button>
            <button className="btn btn-dark" onClick={handlenNextPage}>
              Next
            </button>
          </div> */}
        </div>
      </MainLayout>
    </SSRProvider>
  );
}
