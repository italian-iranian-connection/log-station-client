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

        <div className="home" text-center style={{ border: "none" }}>
          <div className="col homePageColum">
            <h1 id="about">
              Log Station can help you collaborate, plan and build your
              projects
            </h1>
            <p>
              As web developers adapt to the constantly evolving technologies in
              the digital world, we aim to help you find collaborators for your
              projects, get involved in already planned projects and
              collaborate effectively, get and stay aligned, and make
              complexity clearer.
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
            <h5>Mog Rouhi</h5>
            <p>Portugal</p>
            <a
              className="git"
              href="https://github.com/Mog-Rouhi"
              target="_blank"
            >
              Check My Github
            </a>
          </div>

          <div className="logo">
            <img src={image} alt="main page" />
            <div className="scroll-container"><a href="#top"><h3>LOG STATION</h3></a></div>
          </div>

          <div>
            <h5>Alessandra Scarpellini</h5>
            <p>Amsterdam</p>
            <a
              className="git"
              href="https://github.com/Aleale81"
              target="_blank"
            >
              Check My Github
            </a>
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
