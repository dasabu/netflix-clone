import React from 'react';
import { Link } from 'react-router-dom';

const SignUpPage = () => {
  return (
    <div className='h-screen w-screen hero-bg'>
      <header className=''>
        <Link to={'/'}>
          <img
            src='/netflix-logo.png'
            alt='netflix-logo'
            className='w-52'
          ></img>
        </Link>
      </header>
    </div>
  );
};

export default SignUpPage;
