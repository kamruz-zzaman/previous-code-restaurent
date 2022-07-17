import PointTarget from 'react-point'
import React from 'react';
import { Fragment } from 'react';
import Print from './Print/Bill'
import Splitpayment from './Splitpayment';

class AutoScalingText extends React.Component {
  state = {
    scale: 1
  };

  componentDidUpdate() {
    const { scale } = this.state

    const node = this.node
    const parentNode = node.parentNode

    const availableWidth = parentNode.offsetWidth
    const actualWidth = node.offsetWidth
    const actualScale = availableWidth / actualWidth

    if (scale === actualScale)
      return

    if (actualScale < 1) {
      this.setState({ scale: actualScale })
    } else if (scale < 1) {
      this.setState({ scale: 1 })
    }
  }

  render() {
    const { scale } = this.state

    return (
      <div
        className="auto-scaling-text"
        style={{ transform: `scale(${scale},${scale})` }}
        ref={node => this.node = node}
      >{this.props.children}</div>
    )
  }
}

class CalculatorDisplay extends React.Component {
  render() {
    const { value, ...props } = this.props

    const language = navigator.language || 'en-US'
    let formattedValue = parseFloat(value).toLocaleString(language, {
      useGrouping: true,
      maximumFractionDigits: 6
    })

    // Add back missing .0 in e.g. 12.0
    const match = String(value).match(/\.\d*?(0*)$/)

    if (match)
      formattedValue += (/[1-9]/).test(match[0]) ? match[1] : match[0]

    return (
      <div {...props} className="calculator-display">
        <AutoScalingText>{formattedValue}</AutoScalingText>
      </div>
    )
  }
}

class CalculatorKey extends React.Component {
  render() {
    const { onPress, className, ...props } = this.props

    return (
      <PointTarget onPoint={onPress}>
        <button className={`calculator-key ${className}`} {...props} />
      </PointTarget>
    )
  }
}

const CalculatorOperations = {
  '/': (prevValue, nextValue) => prevValue / nextValue,
  '*': (prevValue, nextValue) => prevValue * nextValue,
  '+': (prevValue, nextValue) => prevValue + nextValue,
  '-': (prevValue, nextValue) => prevValue - nextValue,
  '=': (prevValue, nextValue) => nextValue
}

class Calculator extends React.Component {
  state = {
    value: null,
    displayValue: '0',
    operator: null,
    showdis: true,
    discount: null,
    waitingForOperand: false,
    total: this.props.total,
    split: false
  };

  clearAll() {
    this.setState({
      value: null,
      displayValue: '0',
      operator: null,
      waitingForOperand: false
    })
  }

  clearDisplay() {
    this.setState({
      displayValue: '0'
    })
  }

  clearLastChar() {
    const { displayValue } = this.state

    this.setState({
      displayValue: displayValue.substring(0, displayValue.length - 1) || '0'
    })
  }

  toggleSign() {
    const { displayValue } = this.state
    const newValue = parseFloat(displayValue) * -1

    this.setState({
      displayValue: String(newValue)
    })
  }

  onInputchange(event) {

    this.setState({
      [event.target.name]: event.target.value
    });



  }

  toggledis() {
    const { showdis } = this.state

    if (showdis) {
      this.setState({
        showdis: false
      })
    }
    else {
      this.setState({
        showdis: true
      })
    }
  }

  inputPercent() {
    const { total, discount } = this.state

    let x = discount / 100;
    let y = discount * x;
    this.setState({
      total: total - y
    })

  }

  handlePrint = (e) => {
    var mywindow = window.open("", "PRINT", "height=400,width=600");

    mywindow.document.write(
      "<html><head><title></title>"
    );
    mywindow.document.write("</head><body >");

    // mywindow.document.write();
    mywindow.document.write(document.getElementById('Bill').innerHTML);
    mywindow.document.write("</body></html>");

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
    mywindow.close();

    return true;



  }
  inputDot() {
    const { displayValue } = this.state

    if (!(/\./).test(displayValue)) {
      this.setState({
        displayValue: displayValue + '.',
        waitingForOperand: false
      })
    }
  }

  inputDigit(digit) {
    const { displayValue, waitingForOperand } = this.state

    if (waitingForOperand) {
      this.setState({
        displayValue: String(digit),
        waitingForOperand: false
      })
    } else {

      this.setState({
        displayValue: displayValue === '0' ? String(digit) : displayValue + digit
      })
    }
  }

  handelsplit() {
    const { split } = this.state

    if (split) {
      this.setState({
        split: false
      })
    } else {

      this.setState({
        split: true
      })
    }
  }
  inputDigitN(digit) {
    const { displayValue, waitingForOperand } = this.state

    if (waitingForOperand) {
      this.setState({
        displayValue: String(+digit + +displayValue),
        waitingForOperand: false
      })
    } else {

      this.setState({
        displayValue: displayValue === '0' ? String(+digit + +displayValue) : +digit + +displayValue
      })
    }
  }

  performOperation(nextOperator) {
    const { value, displayValue, operator } = this.state
    const inputValue = parseFloat(displayValue)

    if (value == null) {
      this.setState({
        value: inputValue
      })
    } else if (operator) {
      const currentValue = value || 0
      const newValue = CalculatorOperations[operator](currentValue, inputValue)

      this.setState({
        value: newValue,
        displayValue: String(newValue)
      })
    }

    this.setState({
      waitingForOperand: true,
      operator: nextOperator
    })
  }

  handleKeyDown = (event) => {
    let { key } = event

    if (key === 'Enter')
      key = '='

    if ((/\d/).test(key)) {
      event.preventDefault()
      this.inputDigit(parseInt(key, 10))
    } else if (key in CalculatorOperations) {
      event.preventDefault()
      this.performOperation(key)
    } else if (key === '.') {
      event.preventDefault()
      this.inputDot()
    } else if (key === '%') {
      event.preventDefault()
      this.inputPercent()
    } else if (key === 'Backspace') {
      event.preventDefault()
      this.clearLastChar()
    } else if (key === 'Clear') {
      event.preventDefault()

      if (this.state.displayValue !== '0') {
        this.clearDisplay()
      } else {
        this.clearAll()
      }
    }
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown)
  }




  render() {
    const { displayValue, showdis, total, discount, split } = this.state

    const clearDisplay = displayValue !== '0'
    const clearText = clearDisplay ? 'C' : 'AC'

    return (<Fragment>
      <div className='containerCal'>
        <div className='app'>
          <div className="calculator">

            <CalculatorDisplay value={displayValue} />
            <CalculatorKey className="buttonPP" onPress={() => this.inputDigitN(this.props.total)}>Pay in Full</CalculatorKey>
            <div className="calculator-keypad">
              <div className="input-keys">

                <div className="function-keys">

                  <CalculatorKey className="key-1" onPress={() => this.inputDigit(1)}>1</CalculatorKey>
                  <CalculatorKey className="key-2" onPress={() => this.inputDigit(2)}>2</CalculatorKey>
                  <CalculatorKey className="key-3" onPress={() => this.inputDigit(3)}>3</CalculatorKey>

                </div>

                <div className="digit-keys">
                  <CalculatorKey className="key-clear" onPress={() => clearDisplay ? this.clearDisplay() : this.clearAll()}>{clearText}</CalculatorKey>
                  <CalculatorKey className="key-sign" onPress={() => this.inputDot()}>●</CalculatorKey>
                  <CalculatorKey className="key-percent" onPress={() => this.inputDigit(0)}>0</CalculatorKey>
                  <CalculatorKey className="key-7" onPress={() => this.inputDigit(7)}>7</CalculatorKey>
                  <CalculatorKey className="key-8" onPress={() => this.inputDigit(8)}>8</CalculatorKey>
                  <CalculatorKey className="key-9" onPress={() => this.inputDigit(9)}>9</CalculatorKey>
                  <CalculatorKey className="key-4" onPress={() => this.inputDigit(4)}>4</CalculatorKey>
                  <CalculatorKey className="key-5" onPress={() => this.inputDigit(5)}>5</CalculatorKey>
                  <CalculatorKey className="key-6" onPress={() => this.inputDigit(6)}>6</CalculatorKey>


                </div>

              </div>

              <div className="input-keys">
                <div className="digit-keys">
                  <CalculatorKey className="key-3" onPress={() => this.inputDigitN(50)} >£50 </CalculatorKey>
                  <CalculatorKey className="key-3" onPress={() => this.inputDigitN(20)}>£20 </CalculatorKey>
                  <CalculatorKey className="key-3" onPress={() => this.inputDigitN(10)}>£10</CalculatorKey>
                  <CalculatorKey className="key-3" onPress={() => this.inputDigitN(5)}>£5</CalculatorKey>
                </div>

              </div>

              <div className='adjust'>

                <button className="buttonPb" >Total: {total}</button>
                <button className="buttonPb" >Balance:  {displayValue === '0' ? 0 : (Math.abs(total - +displayValue).toFixed(2))}</button>
                {showdis ? (
                  <div className='form'>
                    <div className='form-group'>
                      <input
                        type='number'
                        name="discount"
                        value={this.state.discount}
                        placeholder="Enter Discount %"
                        onChange={(e) => this.onInputchange(e)}
                        onBlur={() => this.inputPercent()}

                      /></div>
                  </div>
                ) : (null)}

                <div className="cal input-radio">
                  <input type="radio" id="Cash" name="c" value="Cash" checked />
                  <label for="Cash">Cash</label></div>
                <div className="cal input-radio"><input type="radio" id="Credit Card" name="c" value="Credit Card" /> <label for="Credit Card">Credit Card</label></div>


                <div className=" cal input-radio">
                  <input type="radio" id="Customer Account" name="c" value="Customer Account" />
                  <label for="Customer Account" onClick={() => this.handelsplit()}>Split</label></div>



              </div>

            </div>

          </div>
        </div>

      </div>
      {split ? (<Fragment>
        <Splitpayment amount={total} />
      </Fragment>) : ('')}

      <button className="checkout" onClick={(e) => (this.handlePrint(e))}>Print Bill</button>
      <Print products={this.props.products} total={total} discount={discount} pay={displayValue} balance={displayValue === '0' ? 0 : (Math.abs(total - +displayValue).toFixed(2))} />

    </Fragment>
    )
  }
}

export default Calculator;
