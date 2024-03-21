import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home, Profile } from "./pages"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users/:id" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
