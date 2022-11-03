import "./HomePage.css";
import image from "./logo-b-png.png";

function HomePage() {
  return (
    <>
      <div className="homePage">
        <h1 className="homeTitle">LOG STATION</h1>
      </div>
      <div className="body-part">
        <div className="context"></div>

        <div
          className="home"
          text-center
          style={{ border: "none" }}
        >
            <div classNama="col">
              <h1 id="about">ABOUT</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus,
                quidem iusto aliquam culpa distinctio maxime facilis odio soluta
                quis reprehenderit deserunt atque porro exercitationem veniam
                maiores! Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Minus, quidem iusto aliquam culpa distinctio maxime
                facilis odio soluta quis reprehenderit deserunt possimus tempora
                aliquid officia, atque porro exercitationem veniam maiores!
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus,
                quidem iusto aliquam culpa distinctio maxime facilis odio soluta
                quis reprehenderit deserunt possimus tempora aliquid officia,
                atque porro exercitationem veniam maiores!
              </p>
     
          </div>
        </div>

        <div className="area">
          <ul className="circles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>

      <div className="footer">
        <div className="footer-text">

          <div>
            <p>Mog Rouhi</p>
            <p>Portugal</p>
            <p>mog.rouhi@gmail.com</p>
          </div>

          <div className="logo">
            <img src={image} alt="main page"/>
            <h3>LOG STATION</h3>
          </div>

          <div>
            <p>Alessandra Scarpellini</p>
            <p>Amsterdam</p>
            <p>https://github.com/Aleale81</p>
          </div>

        </div>

        <div className="light x1"></div>
        <div className="light x2"></div>
        <div className="light x3"></div>
        <div className="light x4"></div>
        <div className="light x5"></div>
        <div className="light x6"></div>
        <div className="light x7"></div>
        <div className="light x8"></div>
        <div className="light x9"></div>
      </div>
    </>
  );
}

export default HomePage;
