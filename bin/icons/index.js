require('../bootstrap')
require('./icons')
import React from 'react';
import Logo from '../components/Logo';

export default function Home() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '1rem', padding: '1rem' }}>
      <Logo />
      <button className="btn btn-primary">Click me</button>
    </div>
  );
}

