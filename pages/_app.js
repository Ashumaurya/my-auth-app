import "tailwindcss/tailwind.css";
import { AuthProvider } from "../context/authProvider";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
