import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import { TaskPage } from "./pages/TaskPage";
import { TaskFormPage } from "./pages/TaskFormPage";
import { ProfilePage } from "./pages/ProfilePage";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useAuth } from "./hooks/useAuth";


export const App = () => {
    const { status } = useSelector((state) => state.auth);
    const {startVerify} = useAuth();
    
    useEffect(() => {
        startVerify();
    }, [])
    

    return (
        <BrowserRouter>
            <Routes>
                {status === "cheking" ? (
                    <>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/*" element={<Navigate to="/login" />} />
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
