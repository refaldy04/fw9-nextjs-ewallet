import React, { useState, useEffect } from 'react';
import { SSRProvider } from 'react-bootstrap';
import MainLayout from '../components/Main';

export default function Confirmation() {
  return (
    <SSRProvider>
      <MainLayout>
        <div>confirmation</div>
      </MainLayout>
    </SSRProvider>
  );
}
