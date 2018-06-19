import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import photo from "../img/noimagefound.jpg";
import { addToFav, removeFromFav } from "../actions/index";
import { connect } from "react-redux";
const Card = ({
  cover,
  fav,
  _id,
  addToFav,
  deleteAd,
  removeFromFav,
  user,
  title,
  createdAt,
  price,
  category
}) => {
  return (
    <div className="col s12 m6 l4 xl4">
      <div className="card  grey darken-3">
        <div className="card-image">
          <img
            src={cover ? `/api/img/${cover}` : photo}
            alt="cover"
            height="250px"
            width="auto"
          />
          {fav === true && (
            <button
              className="grey darken-1 btn-floating card-btn-fav hoverable"
              onClick={() => addToFav(_id)}
            >
              <i className="material-icons">star</i>
            </button>
          )}
          {fav === false && (
            <button
              className=" grey darken-4 btn-floating card-btn-fav hoverable"
              onClick={() => removeFromFav(_id)}
            >
              <i className="material-icons">remove</i>
            </button>
          )}
          {user && (
            <button
              className="red accent-3 btn-floating card-btn-fav hoverable card-delete right"
              onClick={() => deleteAd(_id)}
            >
              <i className="material-icons">delete_forever</i>
            </button>
          )}
          {user && (
            <Link
              className="deep-purple accent-3 btn-floating card-btn-fav hoverable"
              to={`/update_ad/${_id}`}
            >
              <i className="material-icons">edit</i>
            </Link>
          )}
        </div>
        <div className="card-content" id="card-content">
          <div className=" white-text text-darken-3">
            <p className="card-title center-align" id="card-title">
              {title.slice(0, 20)}
              {title.length > 20 && <span> ...</span>}
            </p>
            <p>
              category:{category.slice(0, 20)}
              {category.length > 20 && <span> ...</span>}
            </p>
            {moment(createdAt).format("LLL")}
          </div>
          <p className="price center-align">{price}$</p>
        </div>
        <div className="card-action">
          <Link to={`/ad/${_id}`} className="btn hoverable">
            More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default connect(
  null,
  { addToFav, removeFromFav }
)(Card);
