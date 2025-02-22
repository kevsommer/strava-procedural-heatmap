import { Link as RouterLink } from "react-router-dom";
import './Landing.css';

const Landing = () => {
  return (
    <div class="c-landing-page">
      <h1>Strava Heatmap Generator</h1>
      <p>
        This page can be used to generate a procedurally rendered heatmap from your Strava activities.
      </p>
      <RouterLink to="/code">
        <button class="c-landing-page__button">
          Connect with Strava
        </button>
      </RouterLink>
    </div>
  );
};

export default Landing;
