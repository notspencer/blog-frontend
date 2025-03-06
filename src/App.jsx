import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import PostDetails from './pages/PostDetails';
import Blog from './pages/Blog';
import HeroSection from './components/HeroSection';

import UpdatePost from './components/UpdatePost';

function App() {
    return (
        <Router>
            <Navbar />
            <HeroSection />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/posts" element={<Blog />} />
                <Route path="/create" element={<CreatePost />} />
                <Route path="/posts/:id" element={<PostDetails />} />
                <Route path="/posts/update/:id" element={<UpdatePost />} />
            </Routes>

            <Footer />
        </Router>
    );
}

export default App;
