import React from "react";

function MenuItem(props) {
  return (
    <li>
      <a href={props.link}>{props.children}</a>
    </li>
  );
}

export default MenuItem;
