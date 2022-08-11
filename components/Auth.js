import React from 'react';

export default function AuthMenu(props) {
  return (
    <div>
      <div className="row vh-100">
        <div className="col-md-7 intro d-flex flex-column justify-content-center">
          <h1 className="text-light">REWALLET</h1>
          <figure className="figure text-center">
            <img src="/mobile-display.png" className="figure-img img-fluid rounded" alt="phone-1" />
          </figure>

          <h3 className="text-light fw-motto">App that Covering Banking Needs.</h3>
          <p className="text-light mt-5">
            Zwallet is an application that focussing in banking needs for all users in the world. Always updated and always following world trends. 5000+ users registered in Zwallet everyday with worldwide users coverage.
          </p>
        </div>
        <main className="col-12 col-md-5 fw-form d-flex flex-column ">{props.children}</main>
      </div>
    </div>
  );
}
