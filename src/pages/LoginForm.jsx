import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useInput from "../hooks/useInput";
import useToggle from "../hooks/useToggle";
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
import Header from "../components/HeaderLogin";

import axios from "../api/axios";
const LOGIN_URL = "/auth";

const Login = () => {
  const { setAuth } = useAuth();

  const [from, setFrom] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const loggedInStatus = localStorage.getItem("loggedOut");
  const fromLocation = location.state?.from?.pathname || "/";
  localStorage.setItem("loggedOut", false);

  useEffect(() => {
    if (loggedInStatus) {
      setFrom("/");
    } else {
      setFrom(fromLocation);
    }
  }, []);

  const [user, resetUser, userAttribs] = useInput("user", "");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [check, toggleCheck] = useToggle("persist", true);
  const [spinner, setSpinner] = useState(false);

  //   useEffect(() => {
  //     userRef.current.focus();
  //   }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSpinner(true);

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email: user, pwd: pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setSpinner(false);
      console.log(response.data);
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      const firstname = response?.data?.firstname;
      const lastname = response?.data?.lastname;
      const userId = response?.data?.userId;
      localStorage.setItem("role", roles);
      localStorage.setItem("name", `${firstname} ${lastname}`);
      localStorage.setItem("userId", userId);

      setAuth({ user, pwd, roles, accessToken });
      resetUser();
      setPwd("");
      navigate(from, { replace: true });
    } catch (err) {
      setSpinner(false);
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 404) {
        setErrMsg("Email not found.");
      } else if (err.response?.status === 401) {
        setErrMsg("Wrong Password.");
      } else {
        setErrMsg("Login Error.");
      }
    }
  };

  return (
    <>
      <Header />
      <div id="backgn">
        <Container>
          <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="border-css">
              <h1 style={{ textAlign: "center" }}>Log In</h1>
              <br />
              {!errMsg ? <div></div> : <Alert variant="danger">{errMsg}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label htmlFor="username">Email:</Form.Label>
                  <InputGroup className="mb-3">
                    {/* <InputGroup.Text id="basic-addon1">@</InputGroup.Text> */}
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      id="username"
                      {...userAttribs}
                    />
                    <br />
                  </InputGroup>{" "}
                </Form.Group>

                <Form.Group>
                  <Form.Label htmlFor="password">Password:</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                  />
                  <Form.Check // prettier-ignore
                    type="switch"
                    id="persist"
                    onChange={toggleCheck}
                    checked={check}
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
                          disabled={!user || !pwd}
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
                      No account? Click <Link to={"/signup"}>here</Link> to
                      create one.
                    </p>
                  </div>
                </Form.Group>
              </Form>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Login;
