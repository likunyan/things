import { DotLoading, Image, InfiniteScroll, Space, Tag } from "antd-mobile";
import { Collapse } from "antd-mobile";
import React, { useCallback, useState } from "react";

import axios from "./instance/axios";
import Search from "./Search";

const InfiniteScrollContent = ({ hasMore }) => {
  return (
    <>
      {hasMore ? (
        <>
          <span>Loading</span>
          <DotLoading />
        </>
      ) : (
        <span>--- 我是有底线的 ---</span>
      )}
    </>
  );
};

function Thing() {
  const [things, setThings] = React.useState([]);
  const [paginate, setPaginate] = useState({
    current_page: 0,
  });
  const [hasMore, setHasMore] = useState(true);

  async function loadMore() {
    const nextPage = paginate.current_page + 1;
    await fetchData(nextPage)
      .then(({ data }) => {
        setThings((val) => [...val, ...data.data]);
        delete data.data;
        setPaginate(data);
        setHasMore(data.total > data.to);
      })
      .catch((error) => {
        setHasMore(false);
      });
  }

  const fetchData = useCallback(async (page = 1) => {
    const url = `/api/things?page[number]=${page}&page[size]=15`;
    return await axios.get(url);
  }, []);

  return (
    <>
      <Search
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1,
          backgroundColor: "white",
          padding: "10px 10px",
        }}
      />
      <Collapse accordion style={{ flexGrow: 1 }}>
        {things.map((thing) => (
          <Collapse.Panel
            key={thing.id}
            title={
              <div style={{ display: "flex" }}>
                <Image
                  lazy
                  src={thing.photos[0].path}
                  width={50}
                  height={50}
                  fit="cover"
                  key={thing.photos[0].id}
                  style={{ borderRadius: 4 }}
                />
                <div style={{ marginLeft: 4 }}>
                  <h2>{thing.name}</h2>
                  <div>
                    {thing.tags.map((tag) => (
                      <Tag round color="#2db7f5" className="tag" key={tag.id}>
                        {tag.name}
                      </Tag>
                    ))}
                  </div>
                </div>
              </div>
            }
          >
            <p style={{ marginBottom: 6 }}>{thing.description}</p>
            <Space wrap>
              {thing.photos.map((photo) => (
                <Image
                  lazy
                  src={photo.path}
                  width={100}
                  height={100}
                  fit="cover"
                  key={photo.id}
                  style={{ borderRadius: 4 }}
                />
              ))}
            </Space>
          </Collapse.Panel>
        ))}
      </Collapse>
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore}>
        <InfiniteScrollContent hasMore={hasMore} />
      </InfiniteScroll>
    </>
  );
}

export default Thing;
