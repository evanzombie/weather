import React from "react";

import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";

const ToolBar = () => (
  <div>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <a href="/beijing">Beijing</a>
      </li>
      <li>
        <a href="/berlin">Berlin</a>
      </li>
      <li>
        <a href="/london">London</a>
      </li>
      <li>
        <a href="/mexicocity">Mexico City</a>
      </li>
      <li>
        <a href="/newyork">New York</a>
      </li>
    </ul>
  </div>
);

export default ToolBar;
