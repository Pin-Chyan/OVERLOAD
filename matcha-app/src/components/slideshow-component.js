import React from 'react'
import { Slide } from 'react-slideshow-image'
import img1 from '../images/meave.jpg'
import img2 from '../images/nll.png'
import img3 from '../images/profile.jpg'
import './Slide.css'


const proprietes = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    arrows: true
}

const Slideshow = () => {
    return (
        <div className="containerSlide">
            <Slide {...proprietes}>
                <div className="each-slide">
                    <div>
                        <img src={img1} alt="img1" />
                    </div>
                </div>
                <div className="each-slide">
                    <div>
                        <img src={img2} alt="img2" />
                    </div>
                </div>
                <div className="each-slide">
                    <div>
                        <img src={img3} alt="img3" />
                    </div>
                </div>
            </Slide>
        </div>
    )
}

export default Slideshow;