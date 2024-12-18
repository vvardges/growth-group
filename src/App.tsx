import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Gallery = React.lazy(() => import('@/modules/Gallery'));
const Photo = React.lazy(() => import('@/modules/Photo'));
const NotFound = React.lazy(() => import('@/modules/NotFound'));

const App: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading0...</div>}>
        <Routes>
          <Route path="/" element={<Gallery />} />
          <Route path="/photo/:id" element={<Photo />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
