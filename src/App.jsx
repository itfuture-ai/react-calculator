import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (number) => {
    if (waitingForOperand) {
      setDisplay(number);
      setWaitingForOperand(false);
      return;
    }

    if (display === "0") {
      setDisplay(number);
    } else {
      setDisplay(display + number);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
      return;
    }

    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const clearCalculator = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const toggleSign = () => {
    if (display === "0") return;

    setDisplay(
      display.startsWith("-") ? display.slice(1) : "-" + display
    );
  };

  const percentage = () => {
    const value = parseFloat(display);

    if (isNaN(value)) return;

    setDisplay(String(value / 100));
  };

  const backspace = () => {
    if (waitingForOperand) return;

    if (display.length <= 1 || (display.length === 2 && display.startsWith("-"))) {
      setDisplay("0");
    } else {
      setDisplay(display.slice(0, -1));
    }
  };

  const calculate = (firstValue, secondValue, selectedOperator) => {
    switch (selectedOperator) {
      case "+":
        return firstValue + secondValue;

      case "-":
        return firstValue - secondValue;

      case "×":
        return firstValue * secondValue;

      case "÷":
        if (secondValue === 0) {
          return "Error";
        }
        return firstValue / secondValue;

      default:
        return secondValue;
    }
  };

  const handleOperator = (nextOperator) => {
    const inputValue = parseFloat(display);

    if (isNaN(inputValue)) return;

    if (operator && previousValue !== null && !waitingForOperand) {
      const result = calculate(previousValue, inputValue, operator);

      if (result === "Error") {
        setDisplay("Error");
        setPreviousValue(null);
        setOperator(null);
        setWaitingForOperand(true);
        return;
      }

      setDisplay(formatResult(result));
      setPreviousValue(result);
    } else {
      setPreviousValue(inputValue);
    }

    setOperator(nextOperator);
    setWaitingForOperand(true);
  };

  const handleEquals = () => {
    if (operator === null || previousValue === null) return;

    const inputValue = parseFloat(display);

    if (isNaN(inputValue)) return;

    const result = calculate(previousValue, inputValue, operator);

    if (result === "Error") {
      setDisplay("Error");
    } else {
      setDisplay(formatResult(result));
    }

    setPreviousValue(null);
    setOperator(null);
    setWaitingForOperand(true);
  };

  const formatResult = (value) => {
    if (!Number.isFinite(value)) {
      return "Error";
    }

    const rounded = Number(value.toPrecision(12));

    return String(rounded);
  };

  const handleButton = (value) => {
    if (display === "Error" && value !== "AC") {
      clearCalculator();
    }

    if (/^[0-9]$/.test(value)) {
      inputNumber(value);
      return;
    }

    switch (value) {
      case ".":
        inputDecimal();
        break;

      case "AC":
        clearCalculator();
        break;

      case "⌫":
        backspace();
        break;

      case "+/-":
        toggleSign();
        break;

      case "%":
        percentage();
        break;

      case "+":
      case "-":
      case "×":
      case "÷":
        handleOperator(value);
        break;

      case "=":
        handleEquals();
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key;

      if (/^[0-9]$/.test(key)) {
        handleButton(key);
      } else if (key === ".") {
        handleButton(".");
      } else if (key === "+") {
        handleButton("+");
      } else if (key === "-") {
        handleButton("-");
      } else if (key === "*") {
        handleButton("×");
      } else if (key === "/") {
        event.preventDefault();
        handleButton("÷");
      } else if (key === "%") {
        handleButton("%");
      } else if (key === "Enter" || key === "=") {
        handleButton("=");
      } else if (key === "Backspace") {
        handleButton("⌫");
      } else if (key === "Escape" || key.toLowerCase() === "c") {
        handleButton("AC");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <div className="app">
      <div className="calculator">
        <div className="calculator-header">
          <h1>Calculator</h1>
          <span>React</span>
        </div>

        <div className="display-container">
          {operator && previousValue !== null && (
            <div className="operation">
              {formatResult(previousValue)} {operator}
            </div>
          )}

          <div className="display" title={display}>
            {display}
          </div>
        </div>

        <div className="buttons">
          <button
            className="button function"
            onClick={() => handleButton("AC")}
          >
            AC
          </button>

          <button
            className="button function"
            onClick={() => handleButton("⌫")}
          >
            ⌫
          </button>

          <button
            className="button function"
            onClick={() => handleButton("%")}
          >
            %
          </button>

          <button
            className="button operator"
            onClick={() => handleButton("÷")}
          >
            ÷
          </button>

          <button
            className="button number"
            onClick={() => handleButton("7")}
          >
            7
          </button>

          <button
            className="button number"
            onClick={() => handleButton("8")}
          >
            8
          </button>

          <button
            className="button number"
            onClick={() => handleButton("9")}
          >
            9
          </button>

          <button
            className="button operator"
            onClick={() => handleButton("×")}
          >
            ×
          </button>

          <button
            className="button number"
            onClick={() => handleButton("4")}
          >
            4
          </button>

          <button
            className="button number"
            onClick={() => handleButton("5")}
          >
            5
          </button>

          <button
            className="button number"
            onClick={() => handleButton("6")}
          >
            6
          </button>

          <button
            className="button operator"
            onClick={() => handleButton("-")}
          >
            −
          </button>

          <button
            className="button number"
            onClick={() => handleButton("1")}
          >
            1
          </button>

          <button
            className="button number"
            onClick={() => handleButton("2")}
          >
            2
          </button>

          <button
            className="button number"
            onClick={() => handleButton("3")}
          >
            3
          </button>

          <button
            className="button operator"
            onClick={() => handleButton("+")}
          >
            +
          </button>

          <button
            className="button function"
            onClick={() => handleButton("+/-")}
          >
            +/−
          </button>

          <button
            className="button number"
            onClick={() => handleButton("0")}
          >
            0
          </button>

          <button
            className="button number"
            onClick={() => handleButton(".")}
          >
            .
          </button>

          <button
            className="button equals"
            onClick={() => handleButton("=")}
          >
            =
          </button>
        </div>

        <div className="keyboard-info">
          Keyboard supported
        </div>
      </div>
    </div>
  );
}

export default App;