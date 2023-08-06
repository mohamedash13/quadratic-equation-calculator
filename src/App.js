import React, { useState } from 'react';
import Graph from './Graph';


function App() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [result, setResult] = useState(null);
  const [vertex, setVertex] = useState({ x: 0, y: 0 });

  const Complex = require("complex.js")


  const handleCalculate = () => {
      const discriminant = Complex(b * b - 4 * a * c).sqrt()
  
      if (discriminant) {
        const plus = new Complex(-b).add(discriminant).div(2 * a)
        const minus = new Complex(-b).sub(discriminant).div(2 * a)
        // console.log(plus.format("cartesian"))
        setResult([plus.toString(),  minus.toString()]);
      }
  
      const vertexX = -b / (2 * a);
      const vertexY = a * vertexX ** 2 + b * vertexX + c;
      setVertex({ x: vertexX, y: vertexY });
    };
  
  return (
    <div>
      <h1>Quadratic Equation Solver</h1>
      <div className='inputs'>
      <div>
        <label>
           <i>a  :</i>
          <input type="number" value={a} onChange={(e) => setA(Number(e.target.value))} />
        </label>
      </div>
      <div>
        <label>
           <i>b   :</i> 
          <input type="number" value={b} onChange={(e) => setB(Number(e.target.value))} />
        </label>
      </div>
      <div>
        <label>
           <i>c   :</i> 
          <input type="number" value={c} onChange={(e) => setC(Number(e.target.value))} />
        </label>
      </div>
      </div>

      <button onClick={handleCalculate}>Calculate</button>
      {result && <div>
        <h2>Steps:</h2>
         <ol>
          <li>
            Solve the quadratic equation using the quadratic formula: <br />
            <i>x = (-b ± √(b² - 4ac)) / (2a)</i>
          </li>
          <i>
          x = (-{b} ± √({b}² - 4 x {a} x {c})) / (2{a})
          </i><br />
          <i>
          x = ({-b} ± √{((b * b) -  4 * a * c)}) / ({2 * a})
          </i>
        </ol>
      </div>}
      {result &&<div>
        <h2>Results:</h2>
         
          <div>
            <p>Positive Root: <strong>( {result[0]} )</strong></p>
            {result.length > 1 && <p>Negative Root: <strong>( {result[1]} )</strong></p>}
          </div>
        
        {result && result.length === 0 && <p>No real roots exist.</p>}
      </div>}
      {result && <Graph a={a} b={b} c={c} result={result} vertex={vertex} />}



    </div>
  );
}
export default App;