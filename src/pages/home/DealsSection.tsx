import React from "react";

import dealsImg from "../../assets/deals.png";
const DealsSection: React.FC = () => {
  return (
    <section className="section__container deals__container">
      <div className="deals__image">
        <img src={dealsImg} alt="deals image" />
      </div>
      <div className="deals__content">
        <h5>Get Up To 50% Discount</h5>
        <h4>Deals Of This Mouth</h4>
        <p>Explore Clothing Shop in Vietnam</p>
        <div className="deals__countdown flex-wrap">
          <div className="deals__countdown__card">
            <h4>15</h4>
            <p>Days</p>
          </div>
          <div className="deals__countdown__card">
            <h4>12</h4>
            <p>Hours</p>
          </div>
          <div className="deals__countdown__card">
            <h4>34</h4>
            <p>Mins</p>
          </div>
          <div className="deals__countdown__card">
            <h4>15</h4>
            <p>Secs</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DealsSection;
