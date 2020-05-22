import React from "react";
import "./smallCard.css";
import "./summary.css";
import { connect } from "react-redux";

const SmallCard = (props) => {
  return (
    <div className="smallCard-container">
      <div className="smallCard-story">
        <h4 className="Summary-subTitle">{props.subtitle}</h4>
        <p className="smallCard-storyContent">{props.content}</p>
      </div>
    </div>
  );
};

export default connect()(SmallCard);
