
class Calculator {
  expressionToPRN(exprCalc) {
    let current = "";
    let stack = [];
    let priority;
    let brasket = 0
    for (let i = 0; i < exprCalc.length; i++) {
      priority = this.prioritatGet(exprCalc[i]);
      if (priority == 0) {
        current = current + exprCalc[i];
      }
      if (priority == 1) {
        stack.push(exprCalc[i]);
        brasket = brasket +1
      }
      if (priority > 1) {
        current += " ";
        while (stack.length) {
          if (this.prioritatGet(stack[stack.length - 1]) >= priority) {
            current += stack.pop();
          } else {
            break;
          }
        }
        stack.push(exprCalc[i]);
      }
      if (priority == -1) {
        current += " ";
        while (this.prioritatGet(stack[stack.length - 1]) != 1) {
          current += stack.pop();
        }
        stack.pop();
        brasket = brasket- 1;
      }
      
    }
    if(brasket!=0){
          throw "ExpressionError: Brackets must be paired"
        }
    while (stack.length) {
      current += stack.pop();
    }
    return current;
  }
  rpnToAnswer(rpn) {

    let operand = '';
    let stackTwo = [];
    for (let i = 0; i < rpn.length;i++) {
      if (rpn[i]==' ') {
        continue
        
      }
      if (this.prioritatGet(rpn[i])==0) {
        while (rpn[i]!=' '&& this.prioritatGet(rpn[i])==0) {
          operand+=rpn[i++]
          if(i==rpn.length)break
        }
        stackTwo.push(operand);
        operand = ''
        
        
      }
      if (this.prioritatGet(rpn[i])>1) {
        let one = stackTwo.pop()
        let two = stackTwo.pop()
        
        if (rpn[i]== '+') {
          stackTwo.push(+two + +one)
        }
        if (rpn[i]== '-') {
          stackTwo.push(+two - +one)
        }
        if (rpn[i]== '*') {
          stackTwo.push(two * one)
        }
        if (rpn[i]== '/') {
          if(one == 0){
              throw "TypeError: Division by zero."
            }
          stackTwo.push(two / one)
        }
      }
      
    }

    return stackTwo.pop();
  }
  prioritatGet(token) {
    if (token == "*" || token == "/") {
      return 3;
    } else if (token == "+" || token == "-") {
      return 2;
    } else if (token == "(") {
      return 1;
    } else if (token == ")") {
      return -1;
    } else {
      return 0;
    }
  }
}

function expressionCalculator(expr) {
  let gameCalc = new Calculator();
  const newExprStr = expr.replace(/\s/g, "");
  gameCalc.expressionToPRN(newExprStr);
  return gameCalc.rpnToAnswer(gameCalc.expressionToPRN(newExprStr))
}

module.exports = {
  expressionCalculator
}