import { db } from "config/db";
import React, { useState, useEffect } from "react";
import { Container, Row, Form, Col } from "react-bootstrap";
import { connect } from "react-redux";
import ReviewCard from "./reviewCard";

const ReviewsPage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState("");
  const [reviewsAndRatings, setReviewsAndRatings] = useState(null);

  const handleChange = (e) => {
    setReviewsAndRatings([]);
    setSelectedRestaurant(e.target.value);
  };

  useEffect(() => {
    const getRestaurantReviewsAndRatings = async () => {
      let res = await fetch(`${db}/get_restaurant_reviews_and_ratings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rid: selectedRestaurant }),
      });
      if (res.status === 200) {
        let data = await res.json();
        console.log(data);
        if (data) setReviewsAndRatings(data);
      } else {
        let data = await res.json();
        console.log(data.error);
      }
    };
    if (selectedRestaurant === "") return;
    getRestaurantReviewsAndRatings();
  }, [selectedRestaurant]);

  useEffect(() => {
    const getRestaurants = async () => {
      try {
        let res = await fetch(`${db}/get_restaurants`);
        let data = await res.json();
        data.sort((a, b) => a.rname.localeCompare(b.rname));
        console.log(data);
        setRestaurants(data);
      } catch (error) {
        console.log(error);
      }
    };
    getRestaurants();
  }, []);
  return (
    <Container>
      <Col>
        <Row style={{ justifyContent: "center", padding: "1rem 0" }}>
          <h1>Restaurant Reviews</h1>
        </Row>
        <Row style={{ justifyContent: "center" }}>
          <Form.Group style={{ minWidth: "50%" }} controlId="restaurantName">
            <Form.Control
              value={selectedRestaurant}
              name="restaurantName"
              onChange={handleChange}
              as="select"
            >
              <option disabled hidden></option>
              {restaurants
                ? restaurants.map((res) => (
                    <option key={res.rid} value={res.rid}>
                      {res.rname}
                    </option>
                  ))
                : null}
            </Form.Control>
          </Form.Group>
        </Row>
        <Row style={{ justifyContent: "center" }}>
          {reviewsAndRatings ? (
            reviewsAndRatings.length === 0 ? (
              <div>No Reviews</div>
            ) : (
              <div>
                {reviewsAndRatings.map((x) => {
                  console.log(x);
                  return <ReviewCard rating={x.rating} review={x.reviewtxt} />;
                })}
              </div>
            )
          ) : null}
        </Row>
      </Col>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  currentOrder: state.order.currentOrder,
  uid: state.auth.uid,
});

export default connect(mapStateToProps)(ReviewsPage);
