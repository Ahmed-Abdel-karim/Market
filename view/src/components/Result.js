import React from "react";
import photo from "../img/noimagefound.jpg";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addToFav, removeFromFav } from "../actions";

const Result = ({ ad, addToFav, fav, removeFromFav }) => {
  return (
    <article className=" row resault">
      <div className="col s12 m3">
        <img
          className="responsive-img result-img "
          src={ad.gallery[0] ? `/api/img/${ad.gallery[0]}` : photo}
          alt="cover"
        />
      </div>
      <section className="col s12 m7">
        <h6 className="underline">{ad.title}</h6>
        <p>
          {ad.description.slice(0, 200)}
          {ad.description.length > 200 && <span> ...</span>}
        </p>
        <p className="price center-align">Price : {ad.price} $</p>
      </section>
      <section className="col s12 m2 row">
        {fav === true && (
          <div className="col s6 m12">
            <button
              className="grey darken-1 btn-floating result-btn"
              onClick={_id => addToFav(ad._id)}
            >
              <i className="material-icons">star</i>
            </button>
          </div>
        )}
        {fav === false && (
          <div className="col s6 m12">
            <button
              className="grey darken-4 btn-floating result-btn"
              onClick={_id => removeFromFav(ad._id)}
            >
              <i className="material-icons">remove</i>
            </button>
          </div>
        )}
        <div className="col s6 m12">
          <Link
            to={`/advertise/${ad._id}`}
            className="btn btn-floating result-btn"
          >
            <i className="material-icons">more_vert</i>
          </Link>
        </div>
      </section>
    </article>
  );
};

export default connect(
  null,
  { addToFav, removeFromFav }
)(Result);
