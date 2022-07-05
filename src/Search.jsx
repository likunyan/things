import { SearchBar } from "antd-mobile";
import React from "react";

export default (props) => {
  return (
    <SearchBar style={props.style} placeholder="请输入内容" showCancelButton />
  );
};
