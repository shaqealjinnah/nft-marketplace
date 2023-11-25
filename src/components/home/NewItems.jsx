import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const NewItems = () => {
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(null);

  let millisElapsed;
  let secondsLeft;
  let minsLeft;
  let hoursLeft;
  let startTime;
  let countdown;
  let timeLeft;

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
    countdownTimer();
  }

  function countdownTimer() {
    startTime = Date.now();
    setInterval(updateTimer, 1000);
  }


  function updateTimer() {
    if (items === null) {
      return;
    } else {
      countdown = items[0].expiryDate;

      millisElapsed = Date.now() - startTime;
      timeLeft = countdown - millisElapsed;

      secondsLeft = Math.floor(timeLeft / 1000) % 60;
      minsLeft = Math.floor(timeLeft / 1000 / 60) % 60;
      hoursLeft = Math.floor(timeLeft / 1000 / 60 / 24);

      console.log(minsLeft) 
    }
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
                        to="/author"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Creator: Monica Lucas"
                      >
                        <img className="lazy" src={data.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="de_countdown">{hoursLeft}h {minsLeft}m {secondsLeft}s</div>

                    <div className="nft__item_wrap">
                      <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                          <button>Buy Now</button>
                          <div className="nft__item_share">
                            <h4>Share</h4>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-facebook fa-lg"></i>
                            </a>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-twitter fa-lg"></i>
                            </a>
                            <a href="">
                              <i className="fa fa-envelope fa-lg"></i>
                            </a>
                          </div>
                        </div>
                      </div>

                      <Link to="/item-details">
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
                      <div className="skeleton--icon-sm skeleton-box"></div>
                      <i className="fa fa-check"></i>
                    </div>
                    <div></div>

                    <div className="nft__item_wrap nft--skeleton skeleton-box">
                      <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                          <button>Buy Now</button>
                          <div className="nft__item_share">
                            <h4>Share</h4>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-facebook fa-lg"></i>
                            </a>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-twitter fa-lg"></i>
                            </a>
                            <a href="">
                              <i className="fa fa-envelope fa-lg"></i>
                            </a>
                          </div>
                        </div>
                      </div>
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
