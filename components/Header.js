import React from 'react';
// import './styles/Header.css'
import ParticleAnimation from './particleanimation';

const Header = () => {
  return (
    <header>
      <ParticleAnimation/>
      <h1>EasyMola ( HBTU Kanpur ) </h1>
      <p className='tagline'>Earn While riding</p>
    </header>
  );
};

export default Header;
