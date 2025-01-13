import ParallaxImage from "../../components/ParallaxImage";

import "./about.css";
import Overview from "../Overview";

export default function About({ init = false }: { init: boolean }) {
  return (
    <div className={"about"}>
      {init && (
        <>
          <Overview
            color={"#b46e12"}
            hasBoxShadow={true}
            headingA={"a"}
            headingB={"brief"}
            headingC={"History"}
            paragraphs={[
              "Life has a funny way of working out in unexpected ways. When I first started dabbling in Macromedia Flash all those years ago while trying to figure out how to build a website for my then musical project, little did I know that it would lead me down a 15+ year career path, working with some of the biggest brands in Canada and internationally. Originally from Brisbane, Australia, I moved to Vancouver, Canada in 2006. It was here that I started gaining an interest in Web Development. I started cutting my teeth on Macromedia Flash and Dreamweaver, which wild west of freelance. I designed and built websites for numerous local businesses around Vancouver, all the while, honing and expanding my skills. In 2009, I was lucky enough to be offered a job at Disney Online Studios in Kelowna working as a flash/actionscript 3 developer, working exclusively on the Club Penguin Website, Disney's most popular online game at the time. Growing weary of small town life, I made the move to Toronto in 2012, where I've remained until current day. Over the years I've with/at agencies/organzitions such as McCann, Havas, Tribal DDB, The Canadian Press, Metrolinx, Union Creative, Yamamoto and Underground Digital, and have worked on project for brands such as Shoppers Drug Mart, EQ Bank, Disney, Consumers Energy, Sprouts Farmers Market, Detroit Zoo and McDonalds. Now, after 18 years in Canada, I've finally decided to return to my hometown of Brisbane to see what other kinds of surprises life will bring.",
            ]}
          />

          <div className="about-image-wrapper">
            <ParallaxImage
              imageSrc={
                "https://res.cloudinary.com/ddf71dtj4/image/upload/v1736740483/about_limack.jpg"
              }
            />
          </div>
        </>
      )}
    </div>
  );
}
