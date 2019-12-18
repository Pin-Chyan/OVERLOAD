import React from "react";
import { Carousel } from "react-responsive-carousel";

export default () => (
  <Carousel autoPlay className="image img_carousel">
    <div>
        <img alt="Asuna" className="m_image" src={require('./images/profile.jpg')} />
        <p className="legend">Legend 1</p>
    </div>
    <div>
        <img alt="Asuna" className="m_image" src={require('./images/zero_two.jpg')} />
        <p className="legend">Legend 2</p>
    </div>
    <div>
        <img alt="Asuna" className="m_image" src={require('./images/wallpaper.png')} />
        <p className="legend">Legend 3</p>
    </div>
  </Carousel>
);
