import React from "react";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import {
  Container,
  Form,
  Button,
  Alert,
  Spinner,
  InputGroup,
  Modal,
} from "react-bootstrap";
import { CheckCircleFill, XCircleFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

function EditUser_admin(props) {
  const [show, setShow] = useState(false);

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
  const [showAlert, setShowAlert] = useState(false);
  const [delShow, setDelShow] = useState(false);

  const handleDelClose = () => setDelShow(false);
  const handleDelShow = () => setDelShow(true);

  const axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();

  useEffect(() => {
    setShow(props.showModal);
  }, [props.showModal]);

  const handleClose = () => {
    setShow(false);
    props.closeModal();
  };

  const userId = props.userId;

  useEffect(() => {
    setFirstname(props.firstname);
    setLastname(props.lastname);
  }, [props.firstname, props.lastname]);

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

  const deleteUser = async () => {
    try {
      await axiosPrivate.delete(`users/${userId}`);
      setErrormsg("User Deleted");
    } catch (error) {
      setErrormsg("Something went wrong");
      console.error(error);
    }
  };

  return (
    <>
      <Modal
        show={show}
        size="lg"
        onHide={handleClose}
        backdrop="static"
        keyboard={true}
        data-bs-theme="dark"
        bg="dark"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit/Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <Form>
            {!errorMsg ? (
              <div></div>
            ) : (
              <Alert variant="danger">{errorMsg}</Alert>
            )}

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
                  placeholder={`Current Email: ${props.email}`}
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
          </Form>
        </Modal.Body>
        {formSubmit ? (
          <Alert variant="success">Account updated.</Alert>
        ) : (
          <br />
        )}

        <Modal.Footer>
          <Container>
            <span style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="danger"
                style={{ marginRight: "20px" }}
                onClick={handleDelShow}
              >
                {" "}
                Delete Account
              </Button>
              {!spinner ? (
                <Button
                  variant="outline-dark"
                  onClick={handleSubmit}
                  disabled={!emailUnique || !firstname || !lastname}
                >
                  Update info
                </Button>
              ) : (
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
              )}
            </span>
          </Container>
        </Modal.Footer>
      </Modal>

      <Modal
        show={delShow}
        onHide={handleDelClose}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure want to delete {props.email}?</Modal.Body>
        <Modal.Footer>
          <Button variant="-outline-secondary" onClick={handleDelClose}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              deleteUser();
              handleDelClose();
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditUser_admin;
