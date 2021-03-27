import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { ChallengesContext } from "./ChallengesContext";

// Definindo Tipagem
interface CountdownContextData {
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  isActive: boolean;
  startCountdown: () => void;
  resetCountdown: () => void;
}

// Definindo Tipagem
interface CountdownProviderProps {
  children: ReactNode;
}

let countdownTimeout: NodeJS.Timeout;

//Criação do Contexto
export const CountdownContext = createContext({} as CountdownContextData);

export function CountdownProvider({ children }: CountdownProviderProps) {
  const { startNewChallenge } = useContext(ChallengesContext);

  const [time, setTime] = useState(25 * 60); // UseState do Contador para 25 minutos
  const [isActive, setIsActive] = useState(false); // Verifica se o contador está ativo
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60); // Contador dos minutos arrendondados
  const seconds = time % 60; //Contados dos segundos / Resto da divisão

  //Função para startar o Contador
  function startCountdown() {
    setIsActive(true);
  }

  //Função para resetar o Contador
  function resetCountdown() {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(0.05 * 60);
    setHasFinished(false);
  }

  //=> useEffect -> contagem regressiva
  // Enquanto active = true e time for > 0
  // setTimeout irá rodar a cada 1s (1000)
  // A cada 1s a variável time irá reduzir em 1
  // useEffect irá ativar => active e time mudar
  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, time]);

  return (
    <CountdownContext.Provider
      value={{
        minutes,
        seconds,
        hasFinished,
        isActive,
        startCountdown,
        resetCountdown,
      }}
    >
      {children}
    </CountdownContext.Provider>
  );
}
