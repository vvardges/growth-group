import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { Suspense } from 'react';

const Gallery = React.lazy(() => import('./modules/Gallery'));
const Photo = React.lazy(() => import('./modules/Photo'));
const NotFound = React.lazy(() => import('./modules/NotFound'));

const App: React.FC = () => {
    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
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
