(function () {
  const screen = document.querySelector(".screen");
  const buttons = document.querySelectorAll(".btn");
  const clear = document.querySelector(".btn-clear");
  const equal = document.querySelector(".btn-equal");
  const delfunct = document.querySelector(".btn-del");
  const squareRoot = document.querySelector(".btn-squareRoot");
  const square = document.querySelector(".btn-square");
  let decimalCounter = 0;
  let operationDone = false;
  const operators = ["+", "-", "/", "*", "^"];
  const eventListener =

  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const value = event.target.dataset.num;
      if (operators.includes(value)) {
        decimalCounter = 0;
      }

      switch (value) {
        case ".":
          decimalCounter++;
          if (decimalCounter < 2) {
            screen.value += value;
          }

          break;

        case screen.value.includes(".") && value === ".":
          break;

        default:
          screen.value += value;

          break;
      }
    });
  });

  equal.addEventListener("click", () => {
    // eslint-disable-next-line no-eval
    const answer = eval(screen.value);
    if (answer === "Infinity") {
      screen.value = "Error! x/0";
      return;
    }

    screen.value = answer;
    operationDone = true;
    
  });

  clear.addEventListener("click", () => {
    screen.value = "";
  });

  delfunct.addEventListener("click", () => {
    const valueToDelete = screen.value.slice(0, -1);
    screen.value = valueToDelete;
  });

  squareRoot.addEventListener("click", () => {
    const value = Math.sqrt(screen.value);
    screen.value = value;
    operationDone = true;
  });

  square.addEventListener("click", () => {
    const value = screen.value * screen.value;
    screen.value = value;
    operationDone = true;
  });


    document.addEventListener("keydown", (event) => {
    
    const valueKeyDown = event.key;
    if (operators.includes(valueKeyDown)) {
      decimalCounter = 0;
    }

    switch (event.key) {
      case "1":
        screen.value += 1;
        break;
      case "2":
        screen.value += 2;
        break;
      case "3":
        screen.value += 3;
        break;
      case "4":
        screen.value += 4;
        break;
      case "5":
        screen.value += 5;
        break;
      case "6":
        screen.value += 6;
        break;
      case "7":
        screen.value += 7;
        break;
      case "8":
        screen.value += 8;
        break;
      case "9":
        screen.value += 9;
        break;
      case "0":
        screen.value += 0;
        break;
      case "+":
        decimalCounter = 0;
        if (!screen.value.includes("+")) {
          screen.value += "+";
        }

        break;
      case "/":
        decimalCounter = 0;
        if (!screen.value.includes("/")) {
          screen.value += "/";
        }

        break;
      case "*":
        decimalCounter = 0;
        if (!screen.value.includes("*")) {
          screen.value += "*";
        }

        break;
      case "-":
        decimalCounter = 0;
        if (!screen.value.includes("-")) {
          screen.value += "-";
        }

        break;
      case ".":
        decimalCounter++;
        if (decimalCounter < 2) {
          screen.value += ".";
        }

        break;
      case "Enter":
        decimalCounter = 0;
         answer = eval(screen.value);

        if (answer == "Infinity") {
           (screen.value = "Error! x/0");
           return;
        }

        if (screen.value === "") {
          screen.value = "";
        } else {
          screen.value = answer;
          operationDone = true;
        }

        break;
      case "Backspace":
        screen.value = screen.value.slice(0, -1);
        break;
      case "Delete":
        decimalCounter = 0;
        screen.value = "";
        break;
      default:
        break;
    }

  }
  
  }});
})();
