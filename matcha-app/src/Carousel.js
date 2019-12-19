import React from "react";
import { Carousel } from "react-responsive-carousel";

export default () => (
  <Carousel autoPlay className="image img_carousel">
    <div>
        <img alt="Asuna" className="m_image" src={require('./images/sen.jpg')} />
        <p className="legend">Legend 1</p>
    </div>
    <div>
        <img alt="Asuna" className="m_image" src={require('./images/meave.jpg')} />
        <p className="legend">Legend 2</p>
    </div>
    <div>
        <img alt="Asuna" className="m_image" src={require('./images/sup.jpg')} />
        <p className="legend">Legend 3</p>
    </div>
    <div>
        <img alt="Asuna" className="m_image" src={require('./images/err.jpg')} />
        <p className="legend">Legend 4</p>
    </div>
    <div>
        <img alt="Asuna" className="m_image" src={require('./images/kawaii.jpg')} />
        <p className="legend">Legend 4</p>
    </div>
  </Carousel>
);
