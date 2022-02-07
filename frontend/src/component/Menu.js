import React from 'react';
import {Link} from 'react-router-dom';

export default function Menu() {
  return (
    <>
        <Link to='/dashboard'>Dashboard</Link>
        <Link to='/users'>Users</Link>
    </>
  );
}
