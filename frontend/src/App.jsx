import { Outlet } from 'react-router-dom';  // Import Outlet for child routes
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Navbar />
      <div className="main-content">
        <Outlet /> {/* This will render child route components here */}
      </div>
      <Footer />
    </>
  );
}

export default App;
