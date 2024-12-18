import React from 'react';
import { Link } from 'react-router-dom';

const Gallery: React.FC = () => {
  return (
    <div>
      <h1>Gallery</h1>
      <div>
        <ul>
          <li>
            <Link to="/photo/1">Photo 1</Link>
          </li>
          <li>
            <Link to="/photo/2">Photo 2</Link>
          </li>
          <li>
            <Link to="/photo/3">Photo 3</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Gallery;
