import "./App.css";
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// Import your components here
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));

function App() {
  return (
    <Routes>
      <Suspense fallback={<>Loading...</>}>
        <Route path="/" element={<Home />} />
        <Route path="/auth/sign-up" element={<About />} />
        <Route path="/auth/login" element={<Contact />} />
        <Route path="user/decks/:id" element={<Contact />} />
        <Route path="user/questions/:id" element={<Contact />} />
      </Suspense>
    </Routes>
  );
}

export default App;
