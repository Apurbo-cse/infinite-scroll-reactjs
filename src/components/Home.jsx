import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./common/Card";

const Home = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const getCardData = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts?_limit=9&_page=1"
      );
      const data = response.data;
      setData(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching card data:", error);
      setLoading(false);
    }
  };

  const handleInfiniteScroll = async () => {
    console.log("scrollHeight", +document.documentElement.scrollHeight);
    console.log("innerHeight", +window.innerHeight);
    console.log("scrollTop", +document.documentElement.scrollTop);

    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setPage((prev) => prev +1 )
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCardData();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
  }, []);

  return (
    <div className="container my-3">
      <div className="row ">
        {data.map((item, id) => {
          return <Card key={id} data={item} />;
        })}
      </div>
    </div>
  );
};

export default Home;
