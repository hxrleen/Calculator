let inputText = "";

function clearText() {
  inputText = "";
  document.getElementById("result").innerHTML = "";
}

function appendText(value) {
  inputText += value;
  document.getElementById("result").innerHTML = inputText;
}

function calculate() {
  try {
    const result = evaluateExpression(inputText);
    document.getElementById("result").innerHTML = result;
    inputText = result.toString();
  } catch (error) {
    document.getElementById("result").innerHTML = "Error";
    inputText = "";
  }
}

function evaluateExpression(expression) {
  const operators = ["+", "-", "*", "/"];
  const operatorRegex = new RegExp(`[${operators.join("\\")}]`, "g");

  const numbers = expression.split(operatorRegex);
  const operatorsFound = expression.match(operatorRegex);

  if (!numbers || !operatorsFound) {
    throw new Error("Invalid Expression");
  }

  const operations = [];
  for (let i = 0; i < operatorsFound.length; i++) {
    operations.push(numbers[i]);
    operations.push(operatorsFound[i]);
  }
  operations.push(numbers[numbers.length - 1]);

  let result = parseFloat(operations[0]);
  for (let i = 1; i < operations.length; i += 2) {
    const operator = operations[i];
    const operand = parseFloat(operations[i + 1]);

    switch (operator) {
      case "+":
        result += operand;
        break;
      case "-":
        result -= operand;
        break;
      case "*":
        result *= operand;
        break;
      case "/":
        if (operand === 0) {
          throw new Error("Division by zero");
        }
        result /= operand;
        break;
      default:
        throw new Error("Invalid operator");
    }
  }

  return result;
}
