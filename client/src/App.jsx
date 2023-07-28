import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';

export const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<h1>Hola</h1>}/>
                <Route path='/login' element={<LoginPage />}/>
                <Route path='/register' element={<RegisterPage />}/>
                <Route path='/tasks' element={<h1>Hola</h1>}/>
                <Route path='/add-task' element={<h1>Hola</h1>}/>
                <Route path='/task/:id' element={<h1>Hola</h1>}/>
                <Route path='/profile' element={<h1>Hola</h1>}/>
            </Routes>
        </BrowserRouter>
    );
};
