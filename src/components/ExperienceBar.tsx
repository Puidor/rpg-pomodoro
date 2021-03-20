import { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengesContext";
import styles from "../styles/components/ExperienceBar.module.css";

export function ExperienceBar() {
  const { currentExperience, experienceToNextLevel } = useContext(
    ChallengesContext
  );

  //Calculo da porcentagem da exp atual
  const percentToNextLevel =
    Math.round(currentExperience * 100) / experienceToNextLevel;

  return (
    <header className={styles.experienceBar}>
      {/* <span>0 xp</span> */}

      <div>
        <div style={{ width: `${percentToNextLevel}%` }} />

        <span
          className={styles.currentExperience}
          style={{ left: `${percentToNextLevel}%` }}
        >
          <img src="icons/arrow-up.svg" alt="arrow-up" />
          {currentExperience} xp
        </span>
      </div>

      <span>
        {" "}
        <img src="icons/level.svg" alt="level" /> {experienceToNextLevel} xp
      </span>
    </header>
  );
}
