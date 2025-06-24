import React, { useState } from 'react';

const Calculator = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');

  const handleButtonClick = (value) => {
    setInput(input + value);
  };

  const handleClear = () => {
    setInput('');
  };

  const handleCalculate = () => {
    try {
      setInput(eval(input).toString()); // Simple evaluation, consider using a math library for complex expressions
    } catch {
      setInput('Error');
    }
  };

  if (!isOpen) return null;

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.container} onClick={(e) => e.stopPropagation()}>
        <input type="text" value={input} readOnly style={styles.input} />
        <div style={styles.buttons}>
          <button onClick={() => handleButtonClick('1')} style={styles.button}>1</button>
          <button onClick={() => handleButtonClick('2')} style={styles.button}>2</button>
          <button onClick={() => handleButtonClick('3')} style={styles.button}>3</button>
          <button onClick={() => handleButtonClick('+')} style={styles.button}>+</button>
          <button onClick={() => handleButtonClick('4')} style={styles.button}>4</button>
          <button onClick={() => handleButtonClick('5')} style={styles.button}>5</button>
          <button onClick={() => handleButtonClick('6')} style={styles.button}>6</button>
          <button onClick={() => handleButtonClick('-')} style={styles.button}>-</button>
          <button onClick={() => handleButtonClick('7')} style={styles.button}>7</button>
          <button onClick={() => handleButtonClick('8')} style={styles.button}>8</button>
          <button onClick={() => handleButtonClick('9')} style={styles.button}>9</button>
          <button onClick={() => handleButtonClick('*')} style={styles.button}>*</button>
          <button onClick={handleClear} style={styles.button}>C</button>
          <button onClick={() => handleButtonClick('0')} style={styles.button}>0</button>
          <button onClick={handleCalculate} style={styles.button}>=</button>
          <button onClick={() => handleButtonClick('/')} style={styles.button}>/</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  container: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    width: '300px',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    fontSize: '18px',
    textAlign: 'right',
  },
  buttons: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '10px',
  },
  button: {
    padding: '15px',
    fontSize: '18px',
    cursor: 'pointer',
    backgroundColor: '#f0f0f0',
    border: 'none',
    borderRadius: '4px',
  },
};

export default Calculator;
