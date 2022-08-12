import React from 'react';
import MainLayout from '../components/Main';
import Link from 'next/link';

export default function Dashboard() {
  return (
    <MainLayout>
      <div className="col-lg-12 mt-5 mt-lg-0 d-flex flex-column gap-2 fw9-dashboard">
        <div className="d-flex justify-content-between fw9-balance flex-column flex-lg-row">
          <div>
            <h5 className="text-dark">Balance</h5>
            <h1 className="text-dark">Rp </h1>
            <p className="text-dark">082</p>
          </div>
          <div className="d-flex flex-column gap-3">
            <button type="button" className="btn  fw9-transaction">
              <i data-feather="arrow-up" className="fw9-menu"></i> Transfer
            </button>
            <button type="button" className="btn fw9-transaction">
              <i data-feather="plus" className="fw9-menu"></i> Top Up
            </button>
          </div>
        </div>

        <div className="d-flex gap-2 flex-column flex-lg-row mb-0 align-items-stretch fw9-container-digram">
          <div className="fw9-diagram d-flex flex-column col-lg-7 rounded justify-content-between">
            <div className="d-flex flex-column flex-lg-row gap-sm-4 gap-lg-0 justify-content-between">
              <div className="d-flex flex-column">
                <i data-feather="arrow-up" className="text-success"></i>
                <p>Income</p>
                <h2 className="fs-5">Rp2.120.000</h2>
              </div>
              <div className="d-flex flex-column">
                <i data-feather="arrow-down" className="text-danger"></i>
                <p>Expense</p>
                <h2 className="fs-5">Rp1.560.000</h2>
              </div>
            </div>
            <div className="text-center mt-sm-4 mt-lg-0">{/* <img src={graphic} className="img-fluid" alt="graphic" /> */}</div>
          </div>

          <div className="d-flex flex-column col-lg-5 rounded fw9-transaction-history">
            <div className="d-flex flex-row justify-content-between">
              <p>Transaction History</p>
              <Link href="/history">See all</Link>
            </div>

            {/* <Card /> */}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
