import React from "react";
import { useEffect, useState } from "react";
// import axios from "axios";
import axios from "../api/axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Spinner,
  InputGroup,
} from "react-bootstrap";
import "./css/accSettings.css";
import { CheckCircleFill, XCircleFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import Header from "../components/MuiHeader";

function AccSettings() {
  const [userData, setUserdata] = useState("");
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

  useEffect(() => {
    document.title = "Account settings";
  }, []);

  const userId = localStorage.getItem("userId");

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    setFirstname(userData.firstname);
    setLastname(userData.lastname);
  }, [userData]);

  // useEffect(() => {
  //   if (email !== userData.email) {
  //     const checkEmailExists = async () => {
  //       try {
  //         const checkEmail_url = `http://localhost:4000/check/email/${email}`;
  //         const response = await axios.get(checkEmail_url);
  //         const { exists } = response.data;
  //         setEmailUnique(!exists);
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     };

  //     if (email) {
  //       checkEmailExists();
  //     }
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

  useEffect(() => {
    const fetchUserdata = async () => {
      try {
        const response = await axiosPrivate.get(`/edituser/${userId}`);
        setUserdata(response.data);
      } catch (error) {
        setErrormsg("Error fetching data");
        setTimeout(() => {
          setErrormsg("");
        }, [2000]);
      }
    };
    fetchUserdata();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSpinner(true);

    try {
      const userData = email
        ? {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
          }
        : { firstname: firstname, lastname: lastname, password: password };
      const jsonData = JSON.stringify(userData);
      const response = await axiosPrivate.put(`edituser/${userId}`, jsonData, {
        headers: {
          "Content-Type": "application/json",
          withCredentials: true,
        },
      });
      setFormSubmit(true);
      setSpinner(false);
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
      setFormSubmit(false);
    }
  };

  return (
    <>
      <Header />
      <br />
      <br />
      <main id="">
        <Container>
          <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="border-cs">
              <h1 style={{ textAlign: "center" }}>Update Account</h1>
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
                      placeholder={`Current Email: ${userData.email}`}
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
                    {!samePass && "Passwords does not match."}
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
                  <Alert variant="success">Account updated.</Alert>
                ) : (
                  <br />
                )}
                {!spinner ? (
                  <Container>
                    <span
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <Button
                        variant="outline-dark"
                        type="submit"
                        disabled={!emailUnique || !firstname || !lastname}
                      >
                        Update info
                      </Button>
                    </span>
                  </Container>
                ) : (
                  <Container>
                    <span
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <Button variant="dark" disabled>
                        <Spinner
                          as="span"
                          animation="grow"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                        <span style={{ paddingLeft: "15px" }}>
                          Updating user info...
                        </span>
                      </Button>
                    </span>
                  </Container>
                )}
              </Form>
              {/* Success modal */}
            </div>
          </div>
        </Container>
      </main>
    </>
  );
}

export default AccSettings;
