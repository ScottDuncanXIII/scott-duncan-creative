import SkewedStripes from "../../components/SkewedStripes";
import "./footer.css";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer__heading-wrapper">
        <h2 className="footer__heading">Scott Duncan</h2>
        <div className="footer__horizontal-line"></div>
        <h3 className="footer__subheading">Creative&nbsp;Developer</h3>
        <SkewedStripes customClass="footer__skewed-stripes" />
      </div>

      <div className="footer__contact-wrapper">
        <h4 className="footer__contact-heading">Contact//</h4>

        <ul className="footer__contact-list">
          <li className="footer__contact-item">
            <a className="footer__contact-link" href="">
              email
            </a>
          </li>

          <li className="footer__contact-item">
            <a className="footer__contact-link" href="">
              linkedin
            </a>
          </li>

          <li className="footer__contact-item">
            <a className="footer__contact-link" href="">
              seek
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
