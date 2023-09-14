import React from "react";
import { useEffect, useState } from "react";
// import axios from "axios";
import axios from "../api/axios";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Spinner,
  InputGroup,
  Modal,
} from "react-bootstrap";
import "./css/signup.css";
import { CheckCircleFill, XCircleFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const signup_url = "/register";

function Signup() {
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [usernameUnique, setUsernameUnique] = useState(true);
  const [emailUnique, setEmailUnique] = useState(true);
  const [formSubmit, setFormSubmit] = useState(false);
  const [samePass, setSamePass] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [showVerifyAlert, setShowVerifyAlert] = useState(false);
  const [usernameNull, setUsernameNull] = useState(true);
  const [emailNull, setEmailNull] = useState(true);
  const [errorMsg, setErrormsg] = useState("");
  const [successModal, setSuccessModal] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const checkUsernameExists = async () => {
      try {
        const checkUser_url = `http://localhost:4000/check/username/${username}`;
        const response = await axios.get(checkUser_url);
        const { exists } = response.data;
        setUsernameUnique(!exists);
        console.log(!response.data);
      } catch (error) {
        console.error(error.message);
      }
    };

    const checkEmailExists = async () => {
      try {
        const checkEmail_url = `http://localhost:4000/check/email/${email}`;
        const response = await axios.get(checkEmail_url);
        const { exists } = response.data;
        setEmailUnique(!exists);
      } catch (error) {
        console.error(error);
      }
    };

    if (username) {
      checkUsernameExists();
    }

    if (email) {
      checkEmailExists();
    }
  }, [username, email]);

  useEffect(() => {
    setErrormsg("");
  }, [formSubmit]);

  const checkPasswrd = () => {
    if (password === confirmPwd) {
      setSamePass(true);
    } else {
      setSamePass(false);
    }
  };

  useEffect(() => {
    checkPasswrd();
  }, [password, confirmPwd]);

  //Username and email error Icon trigger controller
  const checkUserstate = () => {
    if (!!username) {
      setUsernameNull(true);
    } else {
      setUsernameNull(false);
    }
  };
  useEffect(() => {
    checkUserstate();
  }, [username]);

  const checkEmailstate = () => {
    if (!!email) {
      setEmailNull(true);
    } else {
      setEmailNull(false);
    }
  };
  useEffect(() => {
    checkEmailstate();
  }, [email]);

  const handleFirstnameChange = (e) => {
    setFirstname(e.target.value);
  };

  const handleLastnamechange = (e) => {
    setLastname(e.target.value);
  };

  const handleUsernamechange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailchange = (e) => {
    setEmail(e.target.value);
    // const regexMail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    // setEmailRegex(regexMail.test(email));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPwd(e.target.value);
    checkPasswrd();
  };

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleSuccessModal = () => {
    handleShow();
    setTimeout(() => {
      handleClose();
      navigate("/login");
    }, [2500]);
  };

  const handleShowverifyAlert = () => {
    setShowVerifyAlert(true);
    setTimeout(() => {
      setShowVerifyAlert(false);
    }, [6000]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSpinner(true);

    try {
      const userData = {
        user: username,
        firstname: firstname,
        lastname: lastname,
        email: email,
        pwd: password,
      };
      const jsonData = JSON.stringify(userData);
      console.log(jsonData);
      const response = await axios.post(signup_url, jsonData, {
        headers: {
          "Content-Type": "application/json",
          withCredentials: true,
        },
      });
      setFormSubmit(true);
      setSpinner(false);
      console.log(Response);
      handleSuccessModal();
    } catch (err) {
      if (!err?.response) {
        setErrormsg("Network error.");
      } else if (err.response?.status === 500) {
        setErrormsg("Server error.");
      } else {
        setErrormsg("Something went wrong.");
      }
      setSpinner(false);
    }
  };

  return (
    <>
      <main id="backgnd">
        <Container>
          <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="border-css">
              <h1 style={{ textAlign: "center" }}>Sign up</h1>
              <br />
              {!errorMsg ? (
                <div></div>
              ) : (
                <Alert variant="danger">{errorMsg}</Alert>
              )}
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="firstname">
                  <Form.Label>Firstname:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Firstname"
                    value={firstname}
                    onChange={handleFirstnameChange}
                  />
                  <br />
                </Form.Group>
                <Form.Group controlId="lastname">
                  <Form.Label>Lastname:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Lastname"
                    value={lastname}
                    onChange={handleLastnamechange}
                  />
                  <br />
                </Form.Group>
                <Form.Group controlId="username">
                  <Form.Label>Username:</Form.Label>
                  {!usernameUnique && (
                    <Alert variant="danger">❕ Username already exists. </Alert>
                  )}
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Enter username"
                      value={username}
                      onChange={handleUsernamechange}
                    />
                    {!usernameUnique ? (
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          paddingLeft: "10px",
                        }}
                      >
                        <XCircleFill size={20} />
                      </span>
                    ) : !usernameNull ? (
                      <span></span>
                    ) : (
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          paddingLeft: "10px",
                        }}
                      >
                        <CheckCircleFill size={20} />
                      </span>
                    )}

                    <br />
                  </InputGroup>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Email:</Form.Label>
                  {!emailUnique && (
                    <Alert variant="danger">Email already exists.</Alert>
                  )}
                  {showVerifyAlert && (
                    <Alert>Verify this email id in settings.</Alert>
                  )}
                  <InputGroup className="mb-3">
                    {/* <InputGroup.Text id="basic-addon1">@</InputGroup.Text> */}
                    <Form.Control
                      type="email"
                      placeholder="Enter E-mail"
                      name="unique-email-field"
                      value={email}
                      onChange={handleEmailchange}
                      onPointerDown={emailUnique ? handleShowverifyAlert : null}
                      // onPointerLeave={handleCloseverifyAlert}
                    />
                    {!emailUnique ? (
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          paddingLeft: "10px",
                        }}
                      >
                        <XCircleFill size={20} />
                      </span>
                    ) : !emailNull ? (
                      <span></span>
                    ) : (
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          paddingLeft: "10px",
                        }}
                      >
                        <CheckCircleFill size={20} />
                      </span>
                    )}

                    <br />
                  </InputGroup>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Password:</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  <br />
                </Form.Group>
                {!samePass && (
                  <Alert variant="warning">Password do not match.</Alert>
                )}

                <Form.Group>
                  <Form.Label>Confirm Password:</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Re-enter password"
                    value={confirmPwd}
                    onChange={handleConfirmPasswordChange}
                  />
                  {/* {samePass && <br></br>} */}
                </Form.Group>
                {formSubmit ? (
                  <Alert variant="success">Account created successfully!</Alert>
                ) : (
                  <br />
                )}
                {!spinner ? (
                  <Container fluid>
                    <Row>
                      <Button
                        variant="dark"
                        type="submit"
                        disabled={
                          !usernameUnique ||
                          !emailUnique ||
                          !samePass ||
                          !firstname ||
                          !lastname
                        }
                      >
                        Sign Up!
                      </Button>
                    </Row>
                  </Container>
                ) : (
                  <Container fluid>
                    <Row>
                      <Button variant="dark" disabled>
                        <Spinner
                          as="span"
                          animation="grow"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                        <span style={{ paddingLeft: "15px" }}>
                          Creating User...
                        </span>
                      </Button>
                    </Row>
                  </Container>
                )}
                <div style={{ fontSize: "14px" }}>
                  <br />
                  <p>
                    Already a user? Click <Link to={"/login"}>here</Link> to
                    login
                  </p>
                </div>
              </Form>
              {/* Success modal */}
              <Modal
                show={showModal}
                onHide={handleClose}
                keyboard={false}
                centered
              >
                <Modal.Header closeButton>
                  <Modal.Title>Account created!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Container fluid>
                    <Row>
                      <Col>
                        <Container fluid>
                          <span>Redirecting to Login page...</span>
                        </Container>
                        <Container fluid>
                          <CountdownCircleTimer
                            isPlaying
                            duration={3}
                            size={50}
                            strokeWidth={7}
                            colors={[
                              "#004777",
                              "#F7B801",
                              "#A30000",
                              "#A30000",
                            ]}
                            colorsTime={[7, 5, 2, 0]}
                          >
                            {({ remainingTime }) => remainingTime}
                          </CountdownCircleTimer>
                        </Container>
                      </Col>
                    </Row>
                  </Container>
                </Modal.Body>
              </Modal>
            </div>
          </div>
        </Container>
      </main>
    </>
  );
}

export default Signup;
