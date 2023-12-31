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
import HeaderLogin from "../components/HeaderLogin";

const signup_url = "/register";

function Signup() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [emailUnique, setEmailUnique] = useState(true);
  const [formSubmit, setFormSubmit] = useState(false);
  const [samePass, setSamePass] = useState(false);
  const [pwd8, setPwd8] = useState(false);
  const [spinner, setSpinner] = useState(false);
  // const [showVerifyAlert, setShowVerifyAlert] = useState(false);
  const [emailNull, setEmailNull] = useState(true);
  const [errorMsg, setErrormsg] = useState("");
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Bookstore - Sign up";
  }, []);

  // useEffect(() => {
  //   const checkEmailExists = async () => {
  //     try {
  //       const checkEmail_url = `http://localhost:4000/check/email/${email}`;
  //       const response = await axios.get(checkEmail_url);
  //       const { exists } = response.data;
  //       setEmailUnique(!exists);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   if (email) {
  //     checkEmailExists();
  //   }
  // }, [email]);

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
  const PwdRegCheck = () => {
    const passwordRegex = /^(?=.*[A-Za-z]).{8,}$/;
    if (!password) {
      setPwd8(true);
    } else if (!password.match(passwordRegex)) {
      setPwd8(false);
    } else {
      setPwd8(true);
    }
  };

  useEffect(() => {
    checkPasswrd();
    PwdRegCheck();
  }, [password, confirmPwd]);

  //Username and email error Icon trigger controller

  const checkEmailstate = () => {
    if (!!email) {
      setEmailNull(true);
    } else {
      setEmailNull(false);
      setEmailUnique(true);
    }
  };
  useEffect(() => {
    checkEmailstate();
  }, [email]);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleSuccessModal = () => {
    handleShow();
    setTimeout(() => {
      handleClose();
      navigate("/login");
    }, [2000]);
  };

  // const handleShowverifyAlert = () => {
  //   setShowVerifyAlert(true);
  //   setTimeout(() => {
  //     setShowVerifyAlert(false);
  //   }, [6000]);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSpinner(true);

    try {
      const userData = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        pwd: password,
      };
      const jsonData = JSON.stringify(userData);
      const response = await axios.post(signup_url, jsonData, {
        headers: {
          "Content-Type": "application/json",
          withCredentials: true,
        },
      });
      setFormSubmit(true);
      setSpinner(false);
      // handleSuccessModal();
      navigate("/login");
    } catch (err) {
      if (!err?.response) {
        setErrormsg("Network error.");
      } else if (err.response?.status === 409) {
        setEmailUnique(false);
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
      <HeaderLogin />
      <main id="backgn">
        <Container>
          <br />
          <div className="d-flex justify-content-end align-items-center vh-100">
            <div className="border-css">
              <h1 style={{ textAlign: "center" }}>Sign up</h1>
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
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                  <br />
                </Form.Group>
                <Form.Group controlId="lastname">
                  <Form.Label>Lastname:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Lastname"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                  <br />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Email:</Form.Label>
                  {!emailUnique && (
                    <Alert variant="danger">Email already exists.</Alert>
                  )}
                  {/* {showVerifyAlert && (
                    <Alert>Verify this email id in settings.</Alert>
                  )} */}
                  <InputGroup className="mb-3">
                    {/* <InputGroup.Text id="basic-addon1">@</InputGroup.Text> */}
                    <Form.Control
                      type="email"
                      placeholder="Enter E-mail"
                      name="unique-email-field"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      // onPointerDown={emailUnique ? handleShowverifyAlert : null}
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
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <br />
                </Form.Group>
                {(!samePass || !pwd8) && (
                  <Alert variant="warning">
                    {!samePass && "Passwords do not match."}
                    {!samePass && !pwd8 && <br></br>}
                    {!pwd8 && "Password should atleast contain 8 letters."}
                  </Alert>
                )}

                <Form.Group>
                  <Form.Label>Confirm Password:</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Re-enter password"
                    value={confirmPwd}
                    onChange={(e) => setConfirmPwd(e.target.value)}
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
                        disabled={!samePass || !firstname || !lastname || !pwd8}
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
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </main>
    </>
  );
}

export default Signup;
