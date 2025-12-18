require('../bootstrap')
require('./icons')
import React from 'react';
import Logo from '../components/Logo';

export default function Home() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '1rem', padding: '1rem' }}>
      <Logo />
      <button style={{ padding: '0.5rem 1rem', fontSize: '1rem' }}>Click me</button>
    </div>
  );
}

