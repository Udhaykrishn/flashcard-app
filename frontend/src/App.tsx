import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Loading from "./components/Loading";
import { UserContextProvider } from "./context/UserContext";
import ProtectedRoute from "./pages/PrivateRoute";
import DeleteQuestion from "./pages/questions/DeleteQuestion";
import EditQuestion from "./pages/questions/EditQuestion";

const Home = lazy(() => import("./pages/Home"));
const Signup = lazy(() => import("./pages/SIgnup"));
const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const CreateDecks = lazy(() => import("./pages/Decks/CreateDecks"));
const DeleteDecks = lazy(() => import("./pages/Decks/DeleteDecks"));
const EditDecks = lazy(() => import("./pages/Decks/EditDecks"));
const GetAllQuestions = lazy(() => import("./pages/questions/GetAllQuestion"));
const CreateQuestion = lazy(() => import("./pages/questions/CreateQuestion"));

function App() {
  return (
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

          <Route
            path="/decks/:deckId"
            element={
              <ProtectedRoute>
                <DeleteDecks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/decks"
            element={
              <ProtectedRoute>
                <CreateDecks />
              </ProtectedRoute>
            }
          />

          <Route
            path="/decks/update/:deckId"
            element={
              <ProtectedRoute>
                <EditDecks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/questions/:deckId"
            element={
              <ProtectedRoute>
                <GetAllQuestions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/questions/create/:deckId"
            element={
              <ProtectedRoute>
                <CreateQuestion />
              </ProtectedRoute>
            }
          />
          <Route
            path="/questions/:questionId/delete/:deckId"
            element={
              <ProtectedRoute>
                <DeleteQuestion />
              </ProtectedRoute>
            }
          />
          <Route
            path="/questions/:questionId/edit/:deckId"
            element={
              <ProtectedRoute>
                <EditQuestion />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </UserContextProvider>
  );
}

export default App;
