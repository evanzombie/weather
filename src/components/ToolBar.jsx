import React from "react";

import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";

const ToolBar = () => (
  <div>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <a href="/details/beijing">Beijing</a>
      </li>
      <li>
        <a href="/details/berlin">Berlin</a>
      </li>
      <li>
        <a href="/details/london">London</a>
      </li>
      <li>
        <a href="/details/mexicocity">Mexico City</a>
      </li>
      <li>
        <a href="/details/newyork">New York</a>
      </li>
    </ul>
  </div>
);

export default ToolBar;
