import { Outlet } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import useScrollRestoration from "./utils/useScrollRestoration";
import { useAuth } from "@/hooks/use-auth";

function App() {
  const { isInitialized } = useAuth();
  useScrollRestoration();

  if (!isInitialized) {
    return <></>;
  }

  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
