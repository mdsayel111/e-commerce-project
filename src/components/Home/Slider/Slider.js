"use client";

import Image from "next/image";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import "./Slider.css";

const Slider = ({ children }) => {
  return (
    <div>
      <AwesomeSlider className="h-[70vh]">
        <div>
          <div id="slider">
            <Image
              src="/image/Black and White Modern Black Friday Sale Banner.png"
              layout="fill"
              alt="banner"
              priority={true}
              className="object-cover"
            />
          </div>
        </div>
        <div>
          <div>
            <Image
              src="/image/Green and Yellow Simple Clean Shoes Sale Banner.png"
              priority={true}
              layout="fill"
              alt="banner"
              className="object-cover"
            />
          </div>
        </div>
      </AwesomeSlider>
    </div>
  );
};

export default Slider;
