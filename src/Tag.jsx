import { Badge, Tag } from "antd-mobile";
import React from "react";

import axios from "./instance/axios";

function TagList() {
  const [tags, setTags] = React.useState([]);

  React.useEffect(() => {
    axios.get("/api/tags").then(({ data }) => {
      setTags(data);
    });
  }, []);

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "flex-start",
        alignContent: "center",
      }}
    >
      {tags.map((tag, index) => (
        <Badge content={tag.count} style={{ margin: 10 }} key={index}>
          <Tag
            round
            color="#2db7f5"
            style={{
              margin: 10,
              fontSize: "medium",
              padding: "6px 12px",
            }}
          >
            {tag.name}
          </Tag>
        </Badge>
      ))}
    </div>
  );
}

export default TagList;
