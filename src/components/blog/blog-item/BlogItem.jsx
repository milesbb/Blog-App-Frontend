import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import BlogAuthor from "../blog-author/BlogAuthor";
import "./styles.css";

const BlogItem = ({ post, authors }) => {
  return (
    <Link to={`/blog/${post._id}`} className="blog-link">
      <Card className="blog-card">
        <Card.Img
          variant="top"
          src={
            post.cover.includes("public")
              ? "http://localhost:3001" + post.cover
              : post.cover
          }
          className="blog-cover"
        />
        <Card.Body>
          <Card.Title>{post.title}</Card.Title>
          <Card.Text>{"Category: " + post.category}</Card.Text>
        </Card.Body>
        <Card.Footer>
          {authors && (
            <BlogAuthor author={post.author} authorsArray={authors} />
          )}
        </Card.Footer>
      </Card>
    </Link>
  );
};

export default BlogItem;
