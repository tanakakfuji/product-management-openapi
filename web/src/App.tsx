import "./App.css";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import AddProductPage from "./pages/AddProductPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 必要に応じてオプションを設定
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/addProduct" element={<AddProductPage />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </>
  );
}

export default App;
