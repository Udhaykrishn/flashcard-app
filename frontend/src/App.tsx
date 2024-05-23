import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Loading from "./components/Loading";
import { UserContextProvider } from "./context/UserContext";
import ProtectedRoute from "./pages/PrivateRoute";

const Home = lazy(() => import("./pages/Home"));
const Signup = lazy(() => import("./pages/SIgnup"));
const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

function App() {
  return (
    <>
      <UserContextProvider>
        <Navbar />
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth/signup" element={<Signup />} />
            <Route path="/auth/login" element={<Login />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </UserContextProvider>
    </>
  );
}

export default App;
