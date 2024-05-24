// src/Login.tsx
import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "universal-cookie";
import { ErrorHandle } from "../components/ErrorHandling";

interface FormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = formData;

    try {
      const response = await axios.post("/auth/login", { email, password });

      cookies.set("access_token", response.data.access_token, { path: "/" });

      toast.success("Login Success");

      navigate("/dashboard");
    } catch (error) {
      ErrorHandle(error);
    }
  };

  const { email, password } = formData;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-6 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md border border-gray-600 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-md border border-gray-600 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex justify-between items-center mb-4">
            <button
              type="submit"
              className="py-2 px-4 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition-colors duration-300"
            >
              Login
            </button>
            <Link
              to="/auth/signup"
              className="text-blue-400 hover:text-blue-500 transition-colors duration-300"
            >
              I don't have an Account? Signup
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
