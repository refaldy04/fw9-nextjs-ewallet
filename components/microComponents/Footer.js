import React, { Component } from 'react';

export class Footer extends Component {
  render() {
    return (
      <footer className="d-flex flex-column flex-lg-row justify-content-lg-between bg-dark">
        <p className="text-light">2020 Re-wallet. All right reserved.</p>
        <div className="d-flex gap-lg-5 flex-column flex-lg-row text-light">
          <p className="text-light">+62 5637 8882 9901</p>
          <p className="text-light">contact@rewallet.com</p>
        </div>
      </footer>
    );
  }
}

export default Footer;
