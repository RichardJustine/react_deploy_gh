import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";
import Home from "./Home";
import NewPost from "./NewPost";
import EditPost from "./EditPost";
import PostPage from "./PostPage";
import About from "./About";
import Missing from "./Missing";
import { useEffect } from "react";
import useAxiosFetch from "./hooks/useAxiosFetch";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { DataProvider } from "./context/DataContext";
import { useStoreActions } from "easy-peasy";

const App = () => {
  const setPosts = useStoreActions((actions) => actions.setPosts);
  const { data, fetchError, isLoading } = useAxiosFetch(
    "http://localhost:3500/posts"
  );

  useEffect(() => {
    setPosts(data);
  }, [data, setPosts]);

  return (
    <div className="App">
      <Router>
        {/* <DataProvider> */}
        <Header title="React JS Blog" />
        <Nav />
        <Routes>
          <Route
            exact
            path="/"
            element={<Home />}
            isLoading={isLoading}
            fetchError={fetchError}
          />
          <Route exact path="/post" element={<NewPost />} />
          <Route path="/edit/:id" element={<EditPost />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Missing />} />
        </Routes>
        {/* </DataProvider> */}
        <Footer />
      </Router>
    </div>
  );
};

export default App;
