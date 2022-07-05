import {
  AddCircleOutline,
  PicturesOutline,
  SearchOutline,
  TagOutline,
} from "antd-mobile-icons";
import React from "react";

const tabs = [
  {
    key: "/",
    title: "物品",
    icon: <SearchOutline />,
  },
  {
    key: "/things/create",
    title: "添加",
    icon: <AddCircleOutline />,
  },
  {
    key: "/tags",
    title: "标签",
    icon: <TagOutline />,
  },
  {
    key: "/photos",
    title: "照片",
    icon: <PicturesOutline />,
  },
];

export default tabs;
