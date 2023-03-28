import React, { useState, useEffect } from "react";
import "../../../../static/css/component/comments/style.css";
function Comments({ idProduct }) {
  const [comments, setComments] = useState([]);
  const iconColors = ["#00FF00", "#FFFFFF", "#FFFF00"];
  useEffect(() => {
    // http://localhost:3001/comments-product/${idProduct}
    fetch(`https://localhost:8000/home/comments/${idProduct}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setComments(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const colors = ["red", "white", "yellow"];
  let colorIndex = 0;
  if (comments.length === 0) {
    return null; // Hiển thị placeholder
  }
  return (
    <section className="Comments">
      {/* <h1>{comments}</h1>
      <h1>{comments.length}</h1>; */}
      <div className="container">
        <div className="row">
          <div className="col-sm-5 col-md-6 col-12 pb-4">
            <h1>Comments</h1>

            {comments.map((comment, index) => {
              const iconColor = colors[colorIndex % colors.length];
              colorIndex++;

              return (
                <div
                  key={index}
                  className="text-justify darker mt-4 float-right comment_box"
                >
                  <i
                    class="fa-solid fa-user-astronaut icon_user_comment"
                    style={{ color: iconColor }}
                  ></i>
                  <h4>{comment.userName}</h4>
                  <br />
                  <p>{comment.contentComment}</p>
                </div>
              );
            })}
          </div>
          <div className="col-lg-4 col-md-5 col-sm-4 offset-md-1 offset-sm-1 col-12 mt-4">
            <form id="algin-form">
              <div className="form-group">
                <h4>Leave a comment</h4>
                <label htmlFor="message">Message</label>
                <textarea
                  name="msg"
                  id="msg"
                  cols="30"
                  rows="5"
                  className="form-control"
                  style={{ backgroundColor: "black" }}
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  id="fullname"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <p className="text-secondary">
                  If you have a{" "}
                  <a href="#" className="alert-link">
                    gravatar account
                  </a>{" "}
                  your address will be used to display your profile picture.
                </p>
              </div>
              <div className="form-inline">
                <input
                  type="checkbox"
                  name="check"
                  id="checkbx"
                  className="mr-1"
                />
                <label htmlFor="subscribe">
                  Subscribe me to the newlettter
                </label>
              </div>
              <div className="form-group">
                <button type="button" id="post" className="btn">
                  Post Comment
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Comments;
