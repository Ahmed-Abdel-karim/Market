import photo from "../img/profile.png";
import moment from "moment";
import UserAvatar from "react-user-avatar";
import { Link } from "react-router-dom";
import React, { PureComponent } from "react";

class Comment extends PureComponent {
  render() {
    const { comment } = this.props;
    const { content, user, createdAt } = comment;
    const src = user.avatar ? `/api/img/${user.avatar}` : photo;
    return (
      <div className="col s12 comment">
        <Link to={`/user/${user._id}`} className="col s6 m2 l1 xl1 profile">
          <UserAvatar size="48" name={user.name} src={src} />
          <span>{user.name}</span>
        </Link>
        <div className="col s12 m10 l11 xl11">
          <p className="comment-content">{content}</p>
          <span className="right date">{moment(createdAt).format("LLL")}</span>
        </div>
      </div>
    );
  }
}

export default Comment;
