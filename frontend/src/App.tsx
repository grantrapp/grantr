import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Admin } from './admin/Admin';
import { Grant } from './Grant';
import { Home } from './home/Home';

export const App = () => {
    return (
        <BrowserRouter>
            <div className="max-w-7xl mx-auto px-4 py-12">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/grant/:slug/:id" element={<Grant />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};
