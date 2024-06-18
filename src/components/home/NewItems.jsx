import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import CountdownTimer from "../UI/CountdownTimer";

const NewItems = () => {
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(null);

  const options = {
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      900: {
        items: 3,
      },
      1200: {
        items: 4,
      },
    },
  };

  async function getData() {
    setLoading(true);
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
    );
    setItems(data);
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <OwlCarousel
            nav={true}
            loop
            margin={10}
            responsive={options.responsive}
          >
            {loading && items
              ? items.map((data, index) => (
                  <div className="nft__item" key={index}>
                    <div className="author_list_pp">
                      <Link
                        to={`/author/${data.authorId}`}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Creator: Monica Lucas"
                      >
                        <img className="lazy author-icon" src={data.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    {data.expiryDate ? (
                      <CountdownTimer expiryDate={data.expiryDate} />
                    ) : null}

                    <div className="nft__item_wrap">

                      <Link to={`/item-details`}>
                        <img
                          src={data.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to="/item-details">
                        <h4>{data.title}</h4>
                      </Link>
                      <div className="nft__item_price">{data.price} ETH</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{data.likes}</span>
                      </div>
                    </div>
                  </div>
                ))
              : new Array(7).fill(0).map((_, index) => (
                  <div className="nft__item" key={index}>
                    <div className="author_list_pp">
                    </div>
                    <div></div>

                    <div className="nft__item_wrap nft--skeleton skeleton-box">
                    </div>
                    <div className="nft__item_info">
                      <div className="skeleton--title skeleton-box mt-3"></div>
                      <div className="skeleton--id skeleton-box"></div>
                      <div className="nft__item_like">
                        <div className="skeleton--id skeleton-box"></div>
                      </div>
                    </div>
                  </div>
                ))}
          </OwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
