import React, { useEffect, useState } from "react";
import { Alert, Container, Image, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import BlogAuthor from "../../components/blog/blog-author/BlogAuthor";
import BlogLike from "../../components/likes/BlogLike";
import posts from "../../data/posts.json";
import "./styles.css";
const Blog = (props) => {
  const params = useParams();
  const blogId = params.id;

  const [loading, setLoading] = useState(false);
  const [errorOccurred, setErrorOccured] = useState(false);
  const [blog, setBlog] = useState(null);

  const getBlog = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3001/blogPosts/" + blogId);
      if (response.ok) {
        const blog = await response.json();
        console.log(blog);
        setBlog(blog);
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
    getBlog();
  }, []);

  return (
    <div className="blog-details-root">
      <Container>
        {loading && <Spinner animation="border" role="status"></Spinner>}
        {!loading && errorOccurred && (
          <Alert variant="danger">Error occurred when loading blog content</Alert>
        )}
        {!loading && !errorOccurred && blog === null && (
          <Alert variant="danger">Failed to load blog</Alert>
        )}
        {!loading && !errorOccurred && blog !== null && (
          <>
            <Image className="blog-details-cover" src={blog.cover.includes("public") ? "http://localhost:3001" + blog.cover : blog.cover} fluid />
            <h1 className="blog-details-title">{blog.title}</h1>

            <div className="blog-details-container">
              <div className="blog-details-author">
                <BlogAuthor author={blog.author}/>
              </div>
              <div className="blog-details-info">
                <div>{blog.createdAt}</div>
                <div>{`${blog.readTime.value} ${blog.readTime.unit} read`}</div>
                <div
                  style={{
                    marginTop: 20,
                  }}
                >
                  <BlogLike defaultLikes={["123"]} onChange={console.log} />
                </div>
              </div>
            </div>

            <div
              dangerouslySetInnerHTML={{
                __html: blog.content,
              }}
            ></div>
          </>
        )}
      </Container>
    </div>
  );
};

export default Blog;
