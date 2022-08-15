import React, { Component } from 'react';
import Link from 'next/link';
import { IconContext } from 'react-icons';

import { FiPhone, FiLock, FiDownload, FiArrowLeft, FiArrowRight } from 'react-icons/fi';

import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  return (
    <>
      <nav>
        <h1>Re-wallet</h1>
        <div>
          <button onClick={() => router.push('/login')} className="login">
            Login
          </button>
          {/* <Test /> */}
          <button onClick={() => router.push('/register')} className="signup">
            Sign Up
          </button>
        </div>
      </nav>

      <header>
        <img src="/mobile-display.png" className="mobile-display" alt="mobile-display" />
        <div>
          <h1>
            Awesome App For Saving <span className="tagline">Time.</span>
          </h1>
          <p>We bring you a mobile app for banking problems that oftenly wasting much of your times.</p>
          <Link href="/" className="try-it">
            Try It Free
          </Link>
          <span className="text">Available on</span>
          <div>
            <img src="/g3.png" alt="google-store" className="google" />
            <img src="/g3.png" alt="apple-store" className="apple" />
          </div>
        </div>
      </header>

      <section className="clients">
        <img src="/Group 20.png" alt="microsoft" className="microsoft" />
        <img src="/Group 19.png" alt="dropbox" className="dropbox" />
        <img src="/g45263.png" alt="h and m" />
        <img src="/logo 1 (1).png" alt="airbnb" />
        <img src="/g3.png" alt="canon" />
        <img src="/Group99.png" alt="dell" />
      </section>

      <section className="about">
        <h1>
          About <span>the Application.</span>
        </h1>
        <p>We have some great features from the application and it's totally free to use by all users around the world.</p>
        <div>
          <div className="container">
            <div className="icon">
              <IconContext.Provider value={{ size: '1.5rem' }}>
                <div>
                  <FiPhone />
                </div>
              </IconContext.Provider>
            </div>

            <h3>24/7 Support</h3>
            <p>We have 24/7 contact support so you can contact us whenever you want and we will respond it.</p>
          </div>
          <div className="container main">
            <div className="icon">
              <IconContext.Provider value={{ size: '1.5rem' }}>
                <div>
                  <FiLock />
                </div>
              </IconContext.Provider>
            </div>

            <h3>Data Privacy</h3>
            <p>We make sure your data is safe in our database and we will encrypt any data you submitted to us.</p>
          </div>
          <div className="container">
            <div className="icon">
              <IconContext.Provider value={{ size: '1.5rem' }}>
                <div>
                  <FiDownload />
                </div>
              </IconContext.Provider>
            </div>

            <h3>Easy Download</h3>
            <p>Zwallet is 100% totally free to use it's now available on Google Play Store and App Store.</p>
          </div>
        </div>
      </section>

      <section className="features">
        <img src="/Group 54.png" alt="mobile-display" />
        <div>
          <h1>
            All The <span>Great</span> Zwallet Features.
          </h1>
          <div className="container">
            <div>
              <span>1.</span>
              <h5>Small Fee</h5>
            </div>
            <p>We only charge 5% of every success transaction done in Zwallet app.</p>
          </div>
          <div className="container">
            <div>
              <span>2.</span>
              <h5>Data Secured</h5>
            </div>
            <p>All your data is secured properly in our system and it’s encrypted.</p>
          </div>
          <div className="container">
            <div>
              <span>3.</span>
              <h5>User Friendly</h5>
            </div>
            <p>Zwallet come up with modern and sleek design and not complicated.</p>
          </div>
        </div>
      </section>

      <section className="users">
        <h1>
          What Users are <span>Saying.</span>
        </h1>
        <p>We have some great features from the application and it's totally free to use by all users around the world.</p>
        <div>
          <a href="facebook.com">
            <FiArrowLeft />
          </a>
          <div>
            <img src="/beard.png" alt="user" />
            <h5>Alex Hansinburg</h5>
            <p className="profesion">Designer</p>
            <p className="testimony">
              “This is the most outstanding app that I've ever try in my live, this app is such an amazing masterpiece and it's suitable for you who is bussy with their bussiness and must transfer money to another person aut there. Just try
              this app and see the power!”
            </p>
          </div>
          <a href="facebook.com">
            <FiArrowRight />
          </a>
        </div>
      </section>

      <footer>
        <h4>Re-wallet</h4>
        <p>Simplify financial needs and saving much time in banking needs with one single app.</p>
        <hr />
        <div>
          <p>2020 Re-wallet. All right reserved.</p>
          <div>
            <p>+62 5637 8882 9901</p>
            <p>contact@rewallet.com</p>
          </div>
        </div>
      </footer>
    </>
  );
}
