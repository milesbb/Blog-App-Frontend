import React, { useEffect, useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import "./styles.css";

const BlogAuthor = ({ author, authorsArray }) => {
  const [currentAuthor, setCurrentAuthor] = useState(null);

  const getCurrentAuthor = () => {
    const authorIndex = authorsArray.findIndex(
      (authorItem) => authorItem.name === author.name
    );
    if (authorIndex !== -1) {
      setCurrentAuthor(authorsArray[authorIndex]);
    }
  };
  console.log(currentAuthor);

  useEffect(() => {
    getCurrentAuthor();
  }, []);

  useEffect(() => {
    if (currentAuthor === null) {
      getCurrentAuthor();
    }
  });

  return (
    <Row>
      <Col xs={2}>
        {currentAuthor !== null && (
          <Image
            className="blog-author"
            src={
              currentAuthor.avatar.includes("public")
                ? "http://localhost:3001" + currentAuthor.avatar
                : currentAuthor.avatar
            }
            roundedCircle
          />
        )}
      </Col>
      <Col>
        <div>by</div>
        <h6>{author.name}</h6>
      </Col>
    </Row>
  );
};

export default BlogAuthor;
