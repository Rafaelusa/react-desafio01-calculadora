import Input from './components/Input';
import Button from './components/Button';

import { Container, Content, Row, Column } from './styles';
import { useState } from 'react';

const App = () => {
  const [currentNumber, setCurrentNumber] = useState('0');
  const [firstNumber, setFirstNumber] = useState('0');
  const [operation, setOperation] = useState('');

  const handleOnClear = () => {
    setCurrentNumber('0');
    setFirstNumber('0');
  }

  const handleAddNumber = (number) => {
    setCurrentNumber(prev => `${prev === '0' ? '' : prev}${number}`);
  }

  const handleToggleSign = () => {
    if (currentNumber === '0') return;
    if (currentNumber.startsWith('-')) {
      setCurrentNumber(currentNumber.substring(1));
    } else {
      setCurrentNumber('-' + currentNumber);
    }
  }

  const handleSumNumbers = () => {
    if(firstNumber === '0') {
      setFirstNumber(String(currentNumber));
      setCurrentNumber('0');
      setOperation('+');
    } else {
      const sum = Number(firstNumber.replace(',', '.')) + Number(currentNumber.replace(',', '.'));
      setCurrentNumber(String(sum).replace('.', ','));
    }
  }

  const handleMinusNumbers = () => {
    if(firstNumber === '0') {
      setFirstNumber(String(currentNumber));
      setCurrentNumber('0');
      setOperation('-');
    } else {
      const result = Number(firstNumber.replace(',', '.')) - Number(currentNumber.replace(',', '.'));
      setCurrentNumber(String(result).replace('.', ','));
    }
  }

  const handleDivisionNumbers = () => {
    if(firstNumber === '0') {
      setFirstNumber(String(currentNumber));
      setCurrentNumber('0');
      setOperation('/');
    } else {
      const division = Number(firstNumber.replace(',', '.')) / Number(currentNumber.replace(',', '.'));
      setCurrentNumber(String(division).replace('.', ','));
    }
  }

  const handleMultiplicationNumbers = () => {
    if(firstNumber === '0') {
      setFirstNumber(String(currentNumber));
      setCurrentNumber('0');
      setOperation('*');
    } else {
      const multiplication = Number(firstNumber.replace(',', '.')) * Number(currentNumber.replace(',', '.'));
      setCurrentNumber(String(multiplication).replace('.', ','));
    }
  }

  const handlePercentageNumbers = () => {
    if (operation && firstNumber !== '0') {
      // Exemplo: 200 + 10% => 200 + (200 * 10 / 100)
      const percentValue = (Number(firstNumber.replace(',', '.')) * Number(currentNumber.replace(',', '.'))) / 100;
      setCurrentNumber(String(percentValue).replace('.', ','));
    } else {
      // Apenas converte o valor atual em porcentagem
      const percentValue = Number(currentNumber.replace(',', '.')) / 100;
      setCurrentNumber(String(percentValue).replace('.', ','));
    }
  }

  const handleEquals = () => {
    if(firstNumber !== '0' && operation !== '' && currentNumber !== '0') {
      switch(operation) {
        case '+':
          handleSumNumbers();
          break;
        case '-':
          handleMinusNumbers();
          break;
        case '*':
          handleMultiplicationNumbers();
          break;
        case '/':
          handleDivisionNumbers();
          break;
        case '%':
          handlePercentageNumbers();
          break;
        default:
          break;
      }
    }

  }

  return (
    <Container>
      <Content>
        <Input value={currentNumber} />
        <Row>
          <Button label="%" onClick={handlePercentageNumbers} />
          <Button label="C" onClick={handleOnClear} />
          <Button label="<-" onClick={() => setCurrentNumber(prev => prev.slice(1))} />
          <Button label="/" onClick={handleDivisionNumbers} />
        </Row>
        <Row>
          <Button label="7" onClick={() => handleAddNumber('7')} />
          <Button label="8" onClick={() => handleAddNumber('8')} />
          <Button label="9" onClick={() => handleAddNumber('9')} />
          <Button label="x" onClick={handleMultiplicationNumbers} />
        </Row>
        <Row>
          <Button label="4" onClick={() => handleAddNumber('4')} />
          <Button label="5" onClick={() => handleAddNumber('5')} />
          <Button label="6" onClick={() => handleAddNumber('6')} />
          <Button label="-" onClick={handleMinusNumbers} />
        </Row>
        <Row>
          <Button label="1" onClick={() => handleAddNumber('1')} />
          <Button label="2" onClick={() => handleAddNumber('2')} />
          <Button label="3" onClick={() => handleAddNumber('3')} />
          <Button label="+" onClick={handleSumNumbers} />
        </Row>
        <Row>
          <Button label="+/-" onClick={handleToggleSign} />
          <Button label="0" onClick={() => handleAddNumber('0')} />
          <Button label="," onClick={() => handleAddNumber(',')} />
          <Button label="=" onClick={handleEquals} />
        </Row>
      </Content>
    </Container>
  );
}

export default App;
