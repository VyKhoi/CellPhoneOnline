import React, { useState, useEffect, useContext, Fragment } from "react";
import "../../../../static/css/component/comments/style.css";
import { UserContext } from "../../../userLogin/userlogin";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";
function Comments({ idProduct }) {
  const [comments, setComments] = useState([]);
  const iconColors = ["#00FF00", "#FFFFFF", "#FFFF00"];
  const { user, setUser } = useContext(UserContext);
  const [commentInput, setCommentInput] = useState(null);

  useEffect(() => {
    // http://localhost:3001/comments-product/${idProduct}
    fetch(`https://localhost:7242/product/comments/${idProduct}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setComments(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const colors = ["red", "white", "yellow"];
  let colorIndex = 0;
  // if (comments.length === 0) {
  //   return null; // Hiển thị placeholder
  // }

  function handSubmitComment(event) {
    event.preventDefault();
    if (!commentInput) {
      return;
    }
    console.log("oke  :", commentInput);
    if (!user) {
      console.log("khong co user");
      alert("XIn vui lòng đăng nhập");
    } else {
      fetch(`https://localhost:7242/product/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contentComment: commentInput,
          idProductId: idProduct,
          idUserId: user.userId,
          idReply: null,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.id) {
            fetch(`https://localhost:7242/product/comments/${idProduct}`)
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
                setComments(data);
                setCommentInput("");
              })
              .catch((error) => console.error(error))
              .finally(() => scrollBottom());
          }
        })
        .catch((error) => { });
    }
  }

  function handleInputChange(event) {
    setCommentInput(event.target.value);
  }

  function scrollBottom() {
    var elem = document.getElementById("data");
    elem.scrollTop = elem.scrollHeight;
  }

  function handleReplyClick(event) {
    var parent = event.target.parentNode;

    var replyBoxes = document.querySelectorAll(".replyComment");

    for (var i = 0; i < replyBoxes.length; i++) {
      replyBoxes[i].style.display = "none";
    }

    var currentReplyBox = parent.nextElementSibling;

    if (currentReplyBox.style.display === "block") {
      currentReplyBox.style.display = "none";
    } else {
      currentReplyBox.style.display = "block";
    }
  }

  function handleSubmitRelpy(event, idReply) {
    event.preventDefault();
    if (!commentInput) {
      return;
    }
    console.log("oke  :", commentInput, idProduct, user.id, idReply);

    fetch(`https://localhost:7242/product/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ContentComment: commentInput,
        ProductId: idProduct,
        UserId: user.userId,
        Reply: idReply,
      }),

    })
      .then((response) => response.json())
      .then((data) => {
        if (data.data) {
          fetch(`https://localhost:7242/product/comments/${idProduct}`)
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              setComments(data);
              setCommentInput("");
            })
            .catch((error) => console.error(error))
            .finally();
        }
      })
      .catch((error) => { });
  }

  function handleDeleteClick(idComment) {
    console.log("bạn xóa ", idComment);
    Swal.fire({
      title: "Bạn có chắc chắn muốn xóa comment này không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xóa",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://localhost:7242/product/delete/comment/${idComment}`, {
          method: "DELETE",
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            fetch(`https://localhost:7242/product/comments/${idProduct}`)
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
                setComments(data);
                setCommentInput("");
              })
              .catch((error) => console.error(error))
              .finally();
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    });
  }
  console.log("user đang co là ", user);
  return (
    <section className="Comments">
      <div className="container">
        <div className="row">
          <div
            id="data"
            className="col-sm-5 col-md-6 col-12 pb-4 comment_container"
          >
            <h1>Comments</h1>

            {comments.map((comment, index) => {
              const iconColor = colors[colorIndex % colors.length];
              colorIndex++;

              return (
                <div>
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

                    {user && user.userRoles != null &&  user.userRoles[0] === "manager" ? (
                      <Fragment>
                        <i
                          className="fas fa-trash-alt reply_comment_icon"
                          onClick={() => handleDeleteClick(comment.Id)}
                        >
                          delete
                        </i>

                        <i
                          className="fas fa-comments reply_comment_icon"
                          onClick={handleReplyClick}
                        >
                          reply
                        </i>
                      </Fragment>
                    ) : null}
                  </div>

                  {user.userRoles != null &&   user.userRoles[0] == "manager" ? (
                    <div
                      className="text-justify darker mt-4 float-right comment_box comment_reply_box box_input_reply replyComment"
                      style={{ padding: 0, display: "none" }}
                    >
                      <form
                        onSubmit={(event, idReply) =>
                          handleSubmitRelpy(event, comment.Id)
                        }
                      >
                        <textarea
                          value={commentInput}
                          onChange={handleInputChange}
                        ></textarea>
                        <button type="submit">Gửi</button>
                      </form>
                    </div>
                  ) : null}

                  {comment.commentReply.map((cm, ix) => {
                    return (
                      <div
                        key={ix}
                        className="text-justify darker mt-4 float-right comment_box comment_reply_box"
                      >
                        <i
                          class="fa-solid fa-user-astronaut icon_user_comment"
                          style={{ color: iconColor }}
                        ></i>
                        <h4>{cm.userName}</h4>
                        <br />
                        <p>{cm.contentComment}</p>
                      </div>
                    );
                  })}
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
                  onChange={handleInputChange}
                  value={commentInput}
                ></textarea>
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
                <button
                  type="submit"
                  id="post"
                  className="btn"
                  onClick={handSubmitComment}
                >
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
