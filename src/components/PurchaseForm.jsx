import Form from "react-bootstrap/Form";

function TextControlsExample(props) {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Name :</Form.Label>
        <Form.Control
          value={props.name}
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
        <Form.Control type="number" placeholder="Enter Phone no." />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Address</Form.Label>
        <Form.Control as="textarea" rows={2} placeholder="Enter your address" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>PIN code :</Form.Label>
        <Form.Control type="number" placeholder="Enter Phone no." />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>City</Form.Label>
        <Form.Control type="text" placeholder="Enter your city name." />
      </Form.Group>
      <Form.Group></Form.Group>
    </Form>
  );
}

export default TextControlsExample;
