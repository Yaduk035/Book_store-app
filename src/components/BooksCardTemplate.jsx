import { Button, Card, Col } from "react-bootstrap";

function CardTemplate(props) {
  return (
    <Col xs={12} md={6} lg={6} xl={4} xxl={3}>
      <div style={{ padding: "10px" }}>
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title className="mb-2">{props.title}</Card.Title>
            <Card.Text className="mb-2">id :{props.id} </Card.Text>
            <Card.Text className="mb-2">Author :{props.author} </Card.Text>
            <Card.Text className="mb-2">Genre :{props.genre} </Card.Text>
            <Card.Text className="mb-2">Language :{props.language} </Card.Text>
            <Card.Text className="mb-2">
              Rental period :{props.rentPeriod}
            </Card.Text>
            <Card.Text className="mb-2">
              Availability :{props.availabilityStatus}
            </Card.Text>
            <Card.Text className="mb-2">ISBN no :{props.ISBNnumber} </Card.Text>
            <Card.Text className="mb-2">PUblished year :{props.year}</Card.Text>
            <Card.Text className="mb-2">
              Description :<br />
              {props.description}
            </Card.Text>
            <Card.Text className="mb-2">Posted at :{props.createdAt}</Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
      </div>
    </Col>
  );
}

export default CardTemplate;
