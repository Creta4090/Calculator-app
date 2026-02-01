import React, { useState } from "react";
import "./cal.css";
import { evaluate } from "mathjs";

function Cal() {
  // add state here for access and data
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [lastOp, setLastOp] = useState("");
  const [lastNum, setLastNum] = useState("");

  const handleClick = (value) => {
    if (value === "=") {
      if (input !== "") {
        // Normal evaluation
        try {
          const evalResult = evaluate(input);
          setResult(evalResult);
          // Find last operator and operand for repeat
          const match = input.match(/([+\-*/])\s*([\d.]+)\s*$/);
          if (match) {
            setLastOp(match[1]);
            setLastNum(match[2]);
          } else {
            setLastOp("");
            setLastNum("");
          }
          setInput("");
        } catch (error) {
          setResult("Math Error");
          setInput("");
        }
      } else if (result !== "" && lastOp && lastNum) {
        // Repeat last operation
        try {
          const newExp = `${result}${lastOp}${lastNum}`;
          const evalResult = evaluate(newExp);
          setResult(evalResult);
        } catch (error) {
          setResult("Math Error");
        }
      }
    } else if (value === "Clear") {
      setInput("");
      setResult("");
      setLastOp("");
      setLastNum("");
    } else {
      // If result is showing and user clicks a number or dot, start new input
      if (result !== "" && /[0-9.]/.test(value)) {
        setInput(value);
        setResult("");
        setLastOp("");
        setLastNum("");
      } else {
        setInput((prev) => prev + value);
        setResult("");
      }
    }
  };

  return (
    <>
      <h1 style={{ textAlign: "center", margin: "10px" }}>
        Custom Calculator{" "}
      </h1>
      <div className="calculator card">
        <input
          type="text"
          className="calculator-screen z-depth-1"
          value={result !== "" ? result : input}
          placeholder="0"
          readOnly
        />

        <div className="calculator-keys">
          <button
            onClick={() => handleClick("+")}
            type="button"
            data-mdb-button-init
            className="operator btn btn-info"
            value="+"
          >
            +
          </button>
          <button
            onClick={() => handleClick("-")}
            type="button"
            data-mdb-button-init
            className="operator btn btn-info"
            value="-"
          >
            -
          </button>
          <button
            onClick={() => handleClick("*")}
            type="button"
            data-mdb-button-init
            className="operator btn btn-info"
            value="*"
          >
            &times;
          </button>
          <button
            onClick={() => handleClick("/")}
            type="button"
            data-mdb-button-init
            className="operator btn btn-info"
            value="/"
          >
            &divide;
          </button>

          {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((item) => (
            <button
              key={item}
              onClick={() => handleClick(item)}
              type="button"
              data-mdb-button-init
              data-mdb-ripple-init
              className="btn btn-light waves-effect"
            >
              {item}
            </button>
          ))}

          <button
            onClick={() => handleClick("0")}
            type="button"
            data-mdb-button-init
            value="0"
            data-mdb-ripple-init
            className="btn btn-light waves-effect"
          >
            0
          </button>
          <button
            onClick={() => handleClick(".")}
            type="button"
            data-mdb-button-init
            className="decimal function btn btn-secondary"
            value="."
          >
            .
          </button>
          <button
            onClick={() => handleClick("Clear")}
            type="button"
            data-mdb-button-init
            className="all-clear function btn btn-danger btn-sm"
            value="all-clear"
          >
            AC
          </button>

          <button
            onClick={() => handleClick("=")}
            type="button"
            data-mdb-button-init
            className="equal-sign operator btn btn-default"
            value="="
          >
            =
          </button>
        </div>
      </div>
    </>
  );
}

export default Cal;
