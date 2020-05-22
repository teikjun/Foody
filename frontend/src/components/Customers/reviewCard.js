import React from "react";
import { Card } from "react-bootstrap";
import Rating from "react-rating";

const ReviewCard = (props) => {
  const { rating, review } = props;
  return (
    <>
      <Card style={{ border: "1.5px solid rgba(0, 0, 0, 0.125)" }}>
        <Card.Body style={{ textAlign: "center", fontSize: "18px", padding: "1rem 3rem" }}>
          <>
            <Rating initialRating={rating} readonly />
            <div style={{ height: "140px", marginTop: "1rem" }}>{review}</div>
          </>
        </Card.Body>
      </Card>
    </>
  );
};

export default ReviewCard;
