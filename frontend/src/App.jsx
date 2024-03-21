import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home} from "./pages/home"
import { Profile } from "./pages/profile";

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
