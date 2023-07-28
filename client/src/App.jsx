import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import { HomePage } from "./pages/Homepage";
import { TaskPage } from "./pages/TaskPage";
import { TaskFormPage } from "./pages/TaskFormPage";
import { ProfilePage } from "./pages/ProfilePage";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Cookies from 'js-cookie'

export const App = () => {
    const { status } = useSelector((state) => state.auth);
    console.log(status);
    useEffect(() => {
        const cookies = Cookies.get();
      if (cookies.token) {
        console.log(cookies.token)
      }
    }, [])
    

    return (
        <BrowserRouter>
            <Routes>
                {status === "cheking" ? (
                    <>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/*" element={<Navigate to="/" />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                    </>
                ) : (
                    <>
                        <Route path="/tasks" element={<TaskPage />} />
                        <Route path="/*" element={<Navigate to="/tasks" />} />
                        <Route path="/add-task" element={<TaskFormPage />} />
                        <Route path="/task/:id" element={<TaskFormPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                    </>
                )}
            </Routes>
        </BrowserRouter>
    );
};
