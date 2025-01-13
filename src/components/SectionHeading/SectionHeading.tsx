import "./section.heading.css";

export default function SectionHeading() {
  return (
    <div className="section-heading">
      <div className={"section-heading__stripes-heading-container"}>
        <h2 className={"section-heading__heading-wrapper"}>
          <span className={"section-heading__heading"}>Selected</span>
          <div className="section-heading__tertiary-heading-wrapper">
            <span className={"section-heading__tertiary-heading"}>Works</span>

            <img
              className="section-heading__tertiary-heading-texture"
              src="/imgs/textures/texture-white-1-a.png"
              alt=""
            />
          </div>
        </h2>

        <div className="section-heading__heading-texture-a">
          <img
            className="section-heading__heading-texture-a-image"
            src="/imgs/textures/texture-black-1.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
