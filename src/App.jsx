import { Routes, Route } from 'react-router-dom';

// Layout
import Layout from './Layout';

// Routes
import PrivateRoute from './Routes/privateRoute';
import PublicRoute from './Routes/publicRoute';

// Context
import { AuthProvider } from './Context/authContext';

// Dashboard Pages
import Dashboard from "./Pages/Admin/DashBoard";
import Orders from "./Pages/Admin/Orders";
import Settings from "./Pages/Admin/Settings";
import Products from "./Pages/Admin/Products";
import Invoice from "./Pages/Admin/Invoice";
import Profile from "./Pages/Admin/Profile";

// Authentication Pages
import Login from "./Pages/Authentication/LoginPage";
import Register from "./Pages/Authentication/RegisterPage";
import ForgotPass from "./Pages/Authentication/ForgotPassPage";

// Styles
import "./index.css";
import "./Styles/Fonts.css";
import "./Styles/TextStyles.css";

function App() {
  return (
    <AuthProvider>
      <Routes>

        {/* Public Routes */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/forgotpass"
          element={
            <PublicRoute>
              <ForgotPass />
            </PublicRoute>
          }
        />

        {/* Protected Dashboard Routes under Layout */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="settings" element={<Settings />} />
          <Route path="products" element={<Products />} />
          <Route path="invoice" element={<Invoice />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
