import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Admin } from './admin/Admin';
import { AdminPostEdit } from './admin/AdminPostEdit';
import { Grant } from './grant/Grant';
import { Home } from './home/Home';

export const App = () => {
    return (
        <BrowserRouter>
            <div className="max-w-7xl mx-auto px-4 py-12">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route
                        path="/admin/new"
                        element={<AdminPostEdit isNew />}
                    />
                    <Route path="/admin/:id/edit" element={<AdminPostEdit />} />
                    <Route path="/grant/:slug/:id" element={<Grant />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};
