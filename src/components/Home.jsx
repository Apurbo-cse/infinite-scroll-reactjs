import React, { useState, useEffect } from "react";
import Loading from "./common/Loading";
import Card from "./common/Card";

const Home = () => {
  const [card, setCard] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const getCardData = async () => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=20&_page=${page}`
    );
    const data = await res.json();
    setCard((prev) => [...prev, ...data]);
    setLoading(false);
  };

  useEffect(() => {
    getCardData();
  }, [page]);

  const handleInfiniteScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setLoading(true);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, []);

  // Remove duplicate cards based on their unique IDs
  const uniqueCards = Array.from(new Set(card.map((item) => item.id)))
    .map((id) => {
      return card.find((item) => item.id === id);
    })
    .filter(Boolean);

  return (
    <>
      <div className="container my-3">
        <div className="row ">
          {uniqueCards.map((item) => (
            <Card key={item.id} data={item} />
          ))}
          {loading && <Loading/>}
        </div>
      </div>
    </>
  );
};

export default Home;
