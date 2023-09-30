import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";

function TextControlsExample(props) {
  const [name, Setname] = useState(props.name);
  const [phno, setPhno] = useState();
  const [pin, setPin] = useState();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    const data = {
      name,
      phno,
      pin,
      address,
      city,
    };
    props.setJsonData(data);
    if (name && phno && pin && address && city) {
      props.setSubmitButton(true);
    } else {
      props.setSubmitButton(false);
    }
  }, [name, phno, pin, address, city]);

  return (
    <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Name :</Form.Label>
        <Form.Control
          value={name}
          onChange={(e) => Setname(e.target.value)}
          type="text"
          placeholder="Enter your firstname"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          value={JSON.parse(props.user)}
          type="email"
          placeholder="Enter your email"
          disabled
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Phone no.</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter Phone no."
          value={phno}
          onChange={(e) => setPhno(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Address</Form.Label>
        <Form.Control
          as="textarea"
          rows={2}
          placeholder="Enter your address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>PIN code :</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter Phone no."
          value={pin}
          onChange={(e) => setPin(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>City</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your city name."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </Form.Group>
      <Form.Group></Form.Group>
    </Form>
  );
}

export default TextControlsExample;
