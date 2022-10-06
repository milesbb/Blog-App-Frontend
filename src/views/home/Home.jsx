import React, { useEffect, useState } from "react";
import { Alert, Container, Spinner } from "react-bootstrap";
import BlogList from "../../components/blog/blog-list/BlogList";
import "./styles.css";

const Home = (props) => {
  const [loading, setLoading] = useState(false);
  const [errorOccurred, setErrorOccured] = useState(false);
  const [authors, setAuthors] = useState([]);

  const getAuthors = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3001/authors");
      if (response.ok) {
        const authors = await response.json();
        console.log(authors)
        setAuthors(authors);
      } else {
        setErrorOccured(true);
      }
    } catch (error) {
      setErrorOccured(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAuthors();
  }, []);

  return (
    <Container fluid="sm">
      <h1 className="blog-main-title">Welcome to the Strive Blog!</h1>

      {loading && <Spinner animation="border" role="status"></Spinner>}
      {!loading && errorOccurred && (
        <Alert variant="danger">Error occurred when fetching authors</Alert>
      )}
      {!loading && ! errorOccurred && authors.length === 0 &&
        <Alert variant="info">No authors found</Alert>
      }
      {!loading && !errorOccurred && authors.length > 0 && (
        <ul>
          {authors.map((author, i) => <li key={i}>{author.name + " " + author.surname}</li>)}
        </ul>
      )}

      <BlogList />
    </Container>
  );
};

export default Home;
