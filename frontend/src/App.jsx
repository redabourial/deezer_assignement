import React, { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const Home = React.lazy(() => import('./pages/home'))
const Profile = React.lazy(() => import('./pages/profile'))

function App () {
  return (
    <BrowserRouter>
      <Suspense fallback={<>Loading...</>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users/:userId" element={<Profile />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
