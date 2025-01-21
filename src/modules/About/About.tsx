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
              "Life has a funny way of working out in unexpected ways. When I first started trying to build a website for my then-musical project all those years ago, I never imagined it would lead me down a 15+ year career path, working with some of the biggest brands in Canada and beyond.",
              "Originally from Brisbane, Australia, I moved to Vancouver, Canada, in 2006. It was there that my passion for web development truly began to take shape. I was always drawn to the more interactive and creative websites of the day, and I still remember the strong impression an early Flash-based Alexander McQueen site left on me. I started cutting my teeth on tools like Flash, Dreamweaver, and Photoshop. Those early experiments soon led me into the wild west of freelance, designing and building websites for local businesses around Vancouver while continually honing and expanding my skills.",
              "By 2009, I had landed a role at Disney Online Studios in Kelowna as a Flash/ActionScript 3 developer, working exclusively on the Club Penguin website—Disney's most popular online game at the time. Over the next three years, I collaborated with developers, designers, editorial staff, and marketing teams to brainstorm, develop, and maintain all aspects of the site. From micro-sites and landing pages to billboards, emails, and Flash banners, I played a key role in bringing a wide range of marketing initiatives to life, enhancing user engagement and brand visibility.",
              "Eventually, the quiet charm of small-town life began to wear off, and in 2012, I made the move to Toronto, Ontario. Over the next 12 years, I worked with agencies and organizations such as McCann, Havas, Tribal DDB, The Canadian Press, Metrolinx, UNION Creative, Doner North, Yamamoto, and Underground Digital. Along the way, I contributed to high-profile projects for brands like Shoppers Drug Mart, EQ Bank, Disney, Consumers Energy, Detroit Zoo, Duke University, Sprouts Farmers Market, and McDonald's.",
              "Now, after 18 years of living and working across Canada, I’ve returned to my hometown of Brisbane, Australia and am excited to see what surprises life has in store next.",
            ]}
          />

          <div className="about-image-wrapper">
            <ParallaxImage imageSrc={"/imgs/about.jpg"} />
          </div>
        </>
      )}
    </div>
  );
}
