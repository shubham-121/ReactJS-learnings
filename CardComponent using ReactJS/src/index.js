import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

function App() {
  return (
    <div className="card">
      <Avatar />
      <div className="data">
        <Intro />
        {/* Should contain one Skill component
        for each web dev skill that you have,
        customized with props */}
        <SkillList
          skill1="HTML & CSS"
          skill2="Javascript"
          skill3="ReactJS"
          skill4="Git and Github"
          skill5="TailWind CSS"
        />
      </div>
    </div>
  );
}

function Avatar() {
  return (
    <div>
      <img className="avatar" src="tanaka.jpg" />
    </div>
  );
}

function Intro() {
  return (
    <div>
      <h2>Shubham Bhatt</h2>
      <h4>
        Full Stack web developer at xyz.org. When not learning or coding, I like
        to play video games,cycling, to cook, or to just enjoy the sunset at the
        view top.
      </h4>
    </div>
  );
}

function SkillList(props) {
  return (
    <div className="skill-list">
      <h4 style={{ backgroundColor: "rgb(107, 107, 219)" }}>{props.skill1}</h4>
      <h4 style={{ backgroundColor: "rgb(47, 221, 47)" }}>{props.skill2}</h4>
      <h4 style={{ backgroundColor: "rgb(192, 55, 55)" }}>{props.skill3}</h4>
      <h4 style={{ backgroundColor: "rgb(201, 201, 60)" }}>{props.skill4}</h4>
      <h4 style={{ backgroundColor: "rgb(203, 143, 32)" }}>{props.skill5}</h4>
    </div>
  );
}

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
