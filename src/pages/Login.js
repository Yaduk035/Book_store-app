import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
// import axios from "axios";
import axios from "../api/axios";
import {
  Container,
  Form,
  Button,
  InputGroup,
  Alert,
  Row,
  Col,
} from "react-bootstrap";
import { HashLoader } from "react-spinners";
import "./css/signup.css";
import { useNavigate, Link, useLocation } from "react-router-dom";

const login_url = "/auth";
// const login_url = "http://127.0.0.1:4000/auth";

const Login = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  console.log("from: ", from);

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [deviceSlider, setDeviceSlider] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleUserchange = (e) => {
    setUser(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    setErrorMsg("");
  }, [user, password]);

  const handleSlider = (e) => {
    setDeviceSlider(!deviceSlider);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSpinner(true);
    setErrorMsg("");

    try {
      const userData = {
        user: user,
        pwd: password,
      };

      const jsonData = JSON.stringify(userData);
      const response = await axios.post(login_url, jsonData, {
        headers: {
          "Content-Type": "application/json",
          withCredentials: false,
        },
      });
      setSpinner(false);

      const accessToken = response?.data?.accessToken;
      console.log(accessToken);
      const roles = response?.data?.roles;
      setAuth({ user, password, roles, accessToken });
      console.log("auth :", auth.accessToken);
      console.log("user :", auth.user);
      // setErrorMsg("Login succesfull.");
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrorMsg("Network Error.");
      } else if (err.response?.status === 404) {
        setErrorMsg("User not found.");
      } else if (err.response?.status === 401) {
        setErrorMsg("Wrong password");
      } else {
        setErrorMsg("Login error");
      }
      setSpinner(false);
    }
  };

  return (
    <div id="backgnd">
      <Container>
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="border-css">
            <h1 style={{ textAlign: "center" }}>Log In</h1>
            <br />
            {!errorMsg ? (
              <div></div>
            ) : (
              <Alert variant="danger">{errorMsg}</Alert>
            )}
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="name">
                <Form.Label>Username:</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={user}
                    onChange={handleUserchange}
                  />
                  <br />
                </InputGroup>{" "}
              </Form.Group>

              <Form.Group>
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <Form.Check // prettier-ignore
                  type="switch"
                  checked={deviceSlider}
                  onChange={handleSlider}
                  id="custom-switch"
                  label="Remember me"
                  style={{ paddingTop: "10px", paddingBottom: "10px" }}
                />
              </Form.Group>

              <Form.Group>
                {!spinner ? (
                  <Container fluid>
                    <Row>
                      <Button
                        variant="dark"
                        type="submit"
                        disabled={!user || !password}
                      >
                        Log in
                      </Button>
                    </Row>
                  </Container>
                ) : (
                  <Container fluid>
                    <Row>
                      <Button variant="dark" disabled>
                        <Container fluid>
                          <Row>
                            <Col>
                              <span style={{ paddingRight: "20px" }}>
                                {/* <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          className="mr-2"
                        /> */}
                                <HashLoader
                                  color="#90e1d1"
                                  size={20}
                                  speedMultiplier={2}
                                />
                              </span>
                              <span>Logging in...</span>
                            </Col>
                          </Row>
                        </Container>
                      </Button>
                    </Row>
                  </Container>
                )}
                <div style={{ fontSize: "14px" }}>
                  <br />
                  <p>
                    No account? Click <Link to={"/signup"}>here</Link> to create
                    one.
                  </p>
                </div>
              </Form.Group>
            </Form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Login;
