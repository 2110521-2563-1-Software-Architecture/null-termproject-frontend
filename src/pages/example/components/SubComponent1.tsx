import React from "react";
import { Typography } from "antd";
import { Link } from "react-router-dom";

const { Title } = Typography;

export default function SubComponent1() {
  // you should use Link from react-router-dom to route without page refreshing
  return (
    <div>
      <Title>Example for dividing code into subcomponents </Title>
      <Link to="/example2"> Go to another page </Link>
    </div>
  );
}
