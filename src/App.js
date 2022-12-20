import './App.css';
import * as React from "react";
import {Routes, Route, Outlet, Link} from 'react-router-dom'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path='art' element={<Art/>}/>
          <Route path='merch' element={<Merch/>}/>

          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

function Layout() {
  return (
    <div>
      <header>
        <h1 className='higu-title'>日ぐ</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/art">Art Gallery</Link>
          <Link to="/merch">Merch</Link>
        </nav>
      </header>

      <Outlet />
    </div>
  )
}

function Home() {
  return (
    <div>Home</div>
  )
}

function Merch() {
  return (
    <div>Merch</div>
  )
}

function Art() {
  return (
    <div>Art Gallery</div>
  )
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

export default App;
