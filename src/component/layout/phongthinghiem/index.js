import React, { useState, useEffect, Fragment } from "react";

import axios from "axios";
function Test({ listPhones }) {
  return (
    <Fragment>
      <h1>do day la {listPhones.length}</h1>
      <div>
        {listPhones.map((phone) => (
          <p>
            {phone.name} - {phone.model}
          </p>
        ))}
      </div>
    </Fragment>
  );
}
export default Test;
