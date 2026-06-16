import React, { useState, useRef } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const buttons = [
  ['%', 'CE', 'C', '⌫'],
  ['x²', '√', '1/x', '/'],
  ['7', '8', '9', '*'],
  ['4', '5', '6', '-'],
  ['1', '2', '3', '+'],
  ['+/-', '0', '.', '='],
];

const CalculatorComponent = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<any>('');
  const lastOperator = useRef('');
  const lastNumber = useRef('');
  const lastExpression = useRef('');

  const handlePress = (value: string) => {
    if (
      result &&
      !['C', 'CE', '⌫', '+/-', '%', 'x²', '√', '1/x', '='].includes(value)
    ) {
      if (!['+', '-', '*', '/'].includes(value)) {
        setInput(value);
        setResult('');
        return;
      } else {
        setInput(result + value);
        setResult('');
        return;
      }
    }

    if (value === 'C') {
      setInput('');
      setResult('');
      lastExpression.current = '';
      lastNumber.current = '';
      lastExpression.current = '';
      return;
    }
    if (value === 'CE') {
      setInput('');
      return;
    }

    if (value === '⌫') {
      setInput(prev => prev.slice(0, -1));
      return;
    }

    if (value === '+/-') {
      if (!input) return;
      setInput(input.startsWith('-') ? input.slice(1) : '-' + input);
      return;
    }

    if (value === 'x²') {
      const base = input || result;
      const num = Number(base);
      if (isNaN(num)) {
        setResult('Error');
        setInput('');
        return;
      }
      lastExpression.current = `sqr(${base})`;
      setResult(Math.pow(num, 2).toString());
      setInput('');
      return;
    }
    if (value === '√') {
      const base = input || result;
      const num = Number(base);
      if (isNaN(num) || num < 0) {
        setResult('Error');
        setInput('');
        return;
      }
      lastExpression.current = `√(${base})`;
      setResult(Math.sqrt(num).toString());
      setInput('');
      return;
    }

    if (value === '1/x') {
      const base = input || result;
      const num = Number(base);
      if (isNaN(num) || num === 0) {
        setResult('Error');
        setInput('');
        return;
      }
      lastExpression.current = `1/(${base})`;
      setResult((1 / num).toString());
      setInput('');
      return;
    }
 if (value === '%') {

  const match = input.match(/^(-?\d+\.?\d*)([+\-*/])(-?\d+\.?\d*)$/);

  if (match) {
    const firstNumber = Number(match[1]);
    const operator = match[2];
    const secondNumber = Number(match[3]);
    const percentValue = (firstNumber * secondNumber) / 100;
    const newExpression = `${firstNumber}${operator}${percentValue}`;
    const finalResult = eval(newExpression);
    lastExpression.current = `${firstNumber}${operator}${secondNumber}%`;
    setInput('');
    setResult(finalResult.toString());
    return;
  }

  const base = input || result;
  const num = Number(base);
  if (!base || isNaN(num)) {
    setResult('Error');
    setInput('');
    return;
  }
  lastExpression.current = `${base}%`;
  setResult((num / 100).toString());
  setInput('');
  return;
}

    if (value === '=') {
      try {
        if (!input && result && lastOperator.current && lastNumber.current) {
          const res = eval(
            `${result}${lastOperator.current}${lastNumber.current}`,
          );
          setResult(res.toString());
          return;
        }

        const res = eval(input);

        lastOperator.current =
          input.match(/[+\-*/](?![^+\-*/]*[+\-*/])/)?.[0] || '';
        lastNumber.current =
          input
            .split(/[+\-*/]/)
            .filter(Boolean)
            .pop() || '';
        lastExpression.current = input;

        setResult(res.toString());
        setInput('');
      } catch {
        setResult('Error');
        setInput('');
      }
      return;
    }

    setInput(prev => prev + value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.displayBox}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}
        >
          <Text style={styles.inputText} numberOfLines={2}>
            {input || lastExpression.current || '0'}
          </Text>
        </ScrollView>
        <Text style={styles.resultText}>{result ? `= ${result}` : ''}</Text>
      </View>

      <View style={styles.buttonsContainer}>
        {buttons.map((row, rowIndex) => (
          <View style={styles.row} key={rowIndex}>
            {row.map((button, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.button, button === '=' && styles.equalButton]}
                onPress={() => handlePress(button)}
              >
                <Text
                  style={[
                    styles.buttonText,
                    button === '=' && styles.equalText,
                  ]}
                >
                  {button}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

export default CalculatorComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee9e9',
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    paddingBottom: 20,
  },

  displayBox: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingHorizontal: 15,
    paddingBottom: 10,
  },

  inputText: {
    fontSize: 44,
    color: '#111',
    fontWeight: '500',
    textAlign: 'right',
  },

  resultText: {
    fontSize: 28,
    color: '#000',
    marginTop: 5,
  },

  buttonsContainer: {
    width: '100%',
  },

  row: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 10,
  },

  button: {
    flex: 1,
    height: 65,
    marginHorizontal: 4,
    backgroundColor: '#f5f1f1',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },

  buttonText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111',
  },

  equalButton: {
    backgroundColor: '#1144a1',
  },

  equalText: {
    color: '#fff',
  },
});
