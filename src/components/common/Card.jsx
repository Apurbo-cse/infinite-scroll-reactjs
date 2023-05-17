import React from "react";

const Card = ({data}) => {
  const { title, body, id } = data;
  return (
    <div className="col-6 col-md-3 mb-2">
      <div className="card p-2">
        <small>{id}</small>
        <p>
        {body.substr(0, 150)}
        </p>
        <h5>{title.substr(0, 15)}</h5>
      </div>
    </div>
  );
};

export default Card;
