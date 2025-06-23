// components/Breadcrumbs.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <nav style={{ padding: '10px', backgroundColor: '#f8f8f8', borderBottom: '1px solid #ccc' }}>
      <Link to="/">Home</Link>
      {pathnames.map((name, index) => {
        const routeTo = '/' + pathnames.slice(0, index + 1).join('/');
        const isLast = index === pathnames.length - 1;

        return (
          <span key={routeTo}>
            {' / '}
            {isLast ? (
              <span>{name.charAt(0).toUpperCase() + name.slice(1)}</span>
            ) : (
              <Link to={routeTo}>{name.charAt(0).toUpperCase() + name.slice(1)}</Link>
            )}
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
