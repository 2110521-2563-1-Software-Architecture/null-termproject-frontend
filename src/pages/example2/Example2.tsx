import React from "react";
import { Typography } from "antd";
import { Link } from "react-router-dom";

const { Title } = Typography;

export default function Example2() {
  // you should use Link from react-router-dom to route without page refreshing
  return (
    <>
      <Title level={1}> Another page</Title>
      <Link to="/" type="secondary">
        Go back
      </Link>
    </>
  );
}
