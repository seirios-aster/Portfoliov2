import { lazy, Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { Footer, Navbar } from "./components";

// Route-level code splitting: Three.js only loads on pages that need it.
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Projects = lazy(() => import("./pages/Projects"));
const Contact = lazy(() => import("./pages/Contact"));

const PageFallback = () => (
  <div className='min-h-screen flex items-center justify-center text-slate-400' role='status'>
    Loading…
  </div>
);

const Page = ({ children }) => (
  <>
    {children}
    <Footer />
  </>
);

const App = () => (
  <main className='bg-slate-300/20'>
    <Router>
      <Navbar />
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<Page><About /></Page>} />
          <Route path='/projects' element={<Page><Projects /></Page>} />
          <Route path='/contact' element={<Page><Contact /></Page>} />
          <Route path='*' element={<Page><About /></Page>} />
        </Routes>
      </Suspense>
    </Router>
  </main>
);

export default App;
