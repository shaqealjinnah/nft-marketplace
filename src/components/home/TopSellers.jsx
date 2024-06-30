import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const TopSellers = () => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState(null);

  async function getData() {
    try {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
      );
      setItems(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12 animate__animated animate__fadeIn">
            <ol className="author_list">
              {!loading && items
                ? items.map((data, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        <Link to={`/author/${data.authorId}`}>
                          <img
                            className="lazy pp-author"
                            src={data.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={`/author/${data.authorId}`}>
                          {data.authorName}
                        </Link>
                        <span>{data.price} ETH</span>
                      </div>
                    </li>
                  ))
                : Array(12)
                    .fill(0)
                    .map((_, index) => (
                      <li key={index}>
                        <div className="author_list_pp">
                          <div
                            className="lazy pp-author skeleton--icon-sm skeleton-box"
                            alt=""
                          ></div>
                        </div>
                        <div className="author_list_info">
                          <div className="skeleton--title skeleton-box"></div>
                          <div className="skeleton--id skeleton-box"></div>
                        </div>
                      </li>
                    ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
