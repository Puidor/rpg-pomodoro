import { useContext } from "react";
import { CountdownContext } from "../contexts/CountdownContext";
import styles from "../styles/components/CountDown.module.css";

export function CountDown() {
  const {
    minutes,
    seconds,
    hasFinished,
    isActive,
    startCountdown,
    resetCountdown,
  } = useContext(CountdownContext);

  // => Separa Minutes/Seconds
  // padStart -> Verifica se a string possui 2 valores
  // Se não possui, acrescenta um 0 na frente.
  //Ex: minutes = 32 -> Possui 2 valores -> "3" e "2"
  //Ex: minutes = 2 -> Não possui 2 valores -> Então fica -> "0" e "2"
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, "0").split("");
  const [secondLeft, secondRight] = String(seconds).padStart(2, "0").split("");

  return (
    <div>
      {/* CONTADOR */}
      <div className={styles.countDownContainer}>
        {/* Div Minutos */}
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>

        <span>:</span>

        {/* Div Segundos */}
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      {hasFinished ? (
        <button disabled className={styles.countdownButton}>
          Ciclo Encerrado
        </button>
      ) : (
        <>
          {isActive ? (
            <button
              type="button"
              className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
              onClick={resetCountdown}
            >
              Abandonar Ciclo
            </button>
          ) : (
            /* Button Abandonar Ciclo */

            /* Button Contador */
            <button
              type="button"
              className={styles.countdownButton}
              onClick={startCountdown}
            >
              Iniciar um Ciclo
            </button>
          )}
        </>
      )}
    </div>
  );
}
