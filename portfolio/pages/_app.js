import '../styles/globals.css';
import { Toaster } from 'react-hot-toast';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function App({ Component, pageProps }) {
  const isAdmin = pageProps.isAdmin;
  return (
    <>
      <Toaster position="top-right" toastOptions={{
        style: { background: '#141414', color: '#f5f3ef', border: '1px solid #222' }
      }} />
      {!isAdmin && <Navbar />}
      <Component {...pageProps} />
      {!isAdmin && <Footer />}
    </>
  );
}
