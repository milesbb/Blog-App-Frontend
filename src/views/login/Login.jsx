import React, { useState } from "react";
import { Alert, Button, Form, Spinner } from "react-bootstrap";
import ReactDOM from "react-dom";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ setLoggedIn, loggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorOccurred, setErrorOccurred] = useState(false);
  const [postSuccess, setPostSuccess] = useState(false);
  const navigate = useNavigate();

  const registerAuthor = async () => {
    try {
      setPostSuccess(false);
      setErrorOccurred(false);
      setLoading(true);

      const loggingInAuthor = {
        email: email,
        password: password,
      };

      const config = {
        method: "POST",
        body: JSON.stringify(loggingInAuthor),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      };

      const response = await fetch(
        process.env.REACT_APP_BE_URL + "/authors/login",
        config
      );

      if (response.ok) {
        const tokens = await response.json();

        localStorage.setItem("accessToken", tokens.accessToken);
        localStorage.setItem("refreshToken", tokens.refreshToken);

    
        setLoggedIn(true);
        console.log("I'm logged in!")

        navigate("/home");

        setPostSuccess(true);
      } else {
        setErrorOccurred(true);
      }
    } catch (error) {
      setErrorOccurred(true);
    } finally {
      setLoading(false);
      setEmail("");
      setPassword("");
      infoTimeoutFunc(3000);
    }
  };

  const resetAllState = () => {
    setErrorOccurred(false);
    setPostSuccess(false);
    setLoading(false);
  };

  const infoTimeoutFunc = (time) => {
    const infoTimeout = setTimeout(resetAllState, time);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password && !loading && !errorOccurred && !postSuccess) {
      registerAuthor();
    } else {
      setErrorOccurred(true);
      infoTimeoutFunc(2000);
    }
  };

  return (
    <div
      style={{
        width: "100vw",
        background: "white",
        position: "absolute",
        zIndex: 99,
        paddingTop: "10rem",
        paddingBottom: "10rem",
      }}
      className="d-flex"
    >
      <div
        style={{
          boxShadow: "-4px 5px 15px 5px rgba(0,0,0,0.39)",
          borderRadius: "40px",
        }}
        className="w-50 p-4 mx-auto text-center"
      >
        <h2>Login</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="my-4" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="my-4" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </Form.Group>

          {loading && <Spinner animation="border" role="status"></Spinner>}
          {!loading && errorOccurred && (
            <Alert variant="danger">Error logging in, try again!</Alert>
          )}
          {!loading && !errorOccurred && postSuccess && (
            <Alert variant="success">Login successful!</Alert>
          )}

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <div className="mt-4">
          <Link to="/signup">...or create an account!</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
