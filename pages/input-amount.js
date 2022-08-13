import React from 'react';
import { SSRProvider } from 'react-bootstrap';
import MainLayout from '../components/Main';

export default function InputAmount() {
  return (
    <SSRProvider>
      <MainLayout>
        <div>InputAmount</div>
      </MainLayout>
    </SSRProvider>
  );
}
