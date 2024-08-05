import Hero from "./pages/Hero"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import AccountDelete from "./pages/AccountDelete";
import InformationAccount from "./pages/InformationAccount";
import AccountVerify from "./pages/AccountVerify";


const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/hapus-akun" element={<AccountDelete />} />
          <Route path="/informasi-akun" element={<InformationAccount />} />
          <Route path="/verifikasi-akun" element={<AccountVerify />} />
        </Routes>
      </Router>
    </QueryClientProvider>

    
  )
}

export default App