import * as React from "react";
import Box from "@mui/material/Box";
import { Card, Grid } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Col } from "react-bootstrap";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function CommentCard(props) {
  React.useEffect(() => {
    if (props.currentUser === props.userId) {
      props.setCommentUser(true);
    }
  }, [props.currentUser, props.userId]);
  const card = (
    <React.Fragment>
      <CardContent>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          <Stack spacing={1}>
            <Rating
              name="half-rating-read"
              defaultValue={props.rating}
              precision={0.5}
              readOnly
            />
          </Stack>
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {props.userId}
        </Typography>
        <Typography variant="h5" component="div">
          {props.commentTitle}
        </Typography>
        <Typography variant="body3">{props.comment}</Typography>
        <br />
        <Typography sx={{ mb: 1.5 }} color="text.secondary" variant="body2">
          {props.createdAt}
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </React.Fragment>
  );

  return (
    <Col item xs={12} md={6} lg={6} xl={6} xxl={4}>
      <div style={{ padding: "10px" }}>
        <Card variant="outlined">{card}</Card>
      </div>
    </Col>
  );
}
