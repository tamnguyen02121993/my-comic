import React, { ReactNode } from 'react';
import MyAppBar from '../MyAppBar';

export interface AuthorizedLayoutProps {
  children: ReactNode;
}

export default function AuthorizedLayout({ children }: AuthorizedLayoutProps) {
  return (
    <>
      <MyAppBar />
      {children}
    </>
  );
}
