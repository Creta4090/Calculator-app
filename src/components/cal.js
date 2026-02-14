import "./cal.css";
import { evaluate } from "mathjs";
import { useSelector, useDispatch } from 'react-redux';
import { appendInput, setInput, setResult, setLast, clearAll } from '../features/calcSlice';

function Cal() {
  const input = useSelector((state) => state.calc.input);
  const result = useSelector((state) => state.calc.result);
  const lastOp = useSelector((state) => state.calc.lastOp);
  const lastNum = useSelector((state) => state.calc.lastNum);
  const dispatch = useDispatch();
 

  const handleClick = (value) => {
    if (value === "=") {
      if (input !== "") {
        try {
          const evalResult = evaluate(input);
          dispatch(setResult(String(evalResult)));
          const match = input.match(/([+\-*/])\s*([\d.]+)\s*$/);
          if (match) {
            dispatch(setLast({ op: match[1], num: match[2] }));
          } else {
            dispatch(setLast({ op: '', num: '' }));
          }
          dispatch(setInput(''));
        } catch (error) {
          dispatch(setResult('Math Error'));
          dispatch(setInput(''));
        }
      } else if (result !== "" && lastOp && lastNum) {
        let newExp = `${result}${lastOp}${lastNum}`;
        try {
          const evalResult = evaluate(newExp);
           dispatch(setResult(String(evalResult)));
        } catch (error) {
          dispatch(setResult('Math Error'));
        }
      }
    } else if (value === "Clear") {
      dispatch(clearAll());
    } else {
      if (result !== "" && /[0-9.]/.test(value)) {
        dispatch(setInput(value));
        dispatch(setResult(''));
        dispatch(setLast({ op: '', num: '' }));
      } else {
        dispatch(appendInput(value));
        dispatch(setResult(''));
      }
    }
  };

  return (
    <>
      <h1 style={{ textAlign: "center", margin: "10px" }}>
        Custom Calculator{' '}
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
