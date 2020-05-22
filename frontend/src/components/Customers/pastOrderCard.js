import React, { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { db } from "config/db";
import Rating from "react-rating";

const PastOrderCard = (props) => {
  const {
    uid,
    setShowToast,
    setError,
    setShowSuccessToast,
    setSuccessMsg,
    setRefresh,
    order,
  } = props;
  const { oid, torderplaced, rname, rating, review } = order;
  const orderDateTime = new Date(torderplaced);
  // Formatting
  let dateStringArr = orderDateTime.toDateString().split(" ");
  dateStringArr.pop();
  let formattedDate =
    dateStringArr.join(" ") +
    " " +
    orderDateTime.toLocaleString("en-US", { hour: "numeric", minute: "numeric", hour12: true });
  const [inputReview, setInputReview] = useState("");
  const [inputRating, setInputRating] = useState(0);

  const addReviewAndRating = async () => {
    let res = await fetch(`${db}/add_review_and_rating`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uid: uid, oid: oid, rating: inputRating, review: inputReview }),
    });
    if (res.status === 200) {
      setRefresh(true);
      setSuccessMsg("Successfully added review!");
      setShowSuccessToast(true);
    } else {
      let data = await res.json();
      setError(data.error);
      setShowToast(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addReviewAndRating();
  };

  return (
    <>
      <Card style={{ border: "1.5px solid rgba(0, 0, 0, 0.125)" }}>
        <Card.Body style={{ textAlign: "center", fontSize: "18px", padding: "1rem 3rem" }}>
          <Card.Text>
            Order from {rname} on {formattedDate}
          </Card.Text>
          <hr />
          {rating === null && review === null ? (
            <>
              <Rating onClick={setInputRating} initialRating={inputRating} />
              <Form style={{ marginTop: "1rem" }} onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Control
                    required
                    value={inputReview}
                    as="textarea"
                    maxLength="100"
                    rows="3"
                    onChange={(e) => setInputReview(e.target.value)}
                    placeholder="Enter Review"
                  />
                </Form.Group>
                <Button variant="dark" type="submit" block>
                  Submit
                </Button>
              </Form>
            </>
          ) : (
            <>
              <Rating initialRating={rating} readonly />
              <div style={{ height: "140px", marginTop: "1rem" }}>{review}</div>
            </>
          )}
        </Card.Body>
      </Card>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    uid: state.auth.uid,
  };
};

export default connect(mapStateToProps)(PastOrderCard);
