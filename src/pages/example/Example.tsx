import React from "react";
import { Typography } from "antd";

import SubComponent1 from "./components/SubComponent1";

const { Title } = Typography;

export default function Example() {
  return (
    <div>
      <Title level={1}> Header </Title>
      <Title level={2} type="warning">
        A big warning message
      </Title>
      <SubComponent1 />
    </div>
  );
}
