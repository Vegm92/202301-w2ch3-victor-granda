(function () {
  let screen = document.querySelector(".screen");
  let buttons = document.querySelectorAll(".btn");
  let clear = document.querySelector(".btn-clear");
  let equal = document.querySelector(".btn-equal");
  let delfunct = document.querySelector(".btn-del");
  let squareRoot = document.querySelector(".btn-squareRoot");
  let square = document.querySelector(".btn-square");
  let decimalCounter = 0;
  let operators = ["+", "-", "/", "*", "^"];

  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      let value = event.target.dataset.num;
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

        case screen.value.includes(".") && value == ".":
          break;

        default:
          screen.value += value;

          break;
      }
    });
  });

  equal.addEventListener("click", () => {
    let answer = eval(screen.value);
    if (answer == "Infinity") {
      return (screen.value = "Error! x/0");
    }
    screen.value = answer;
    operationDone = true;
  });

  clear.addEventListener("click", () => {
    screen.value = "";
  });

  delfunct.addEventListener("click", () => {
    let valueToDelete = screen.value.slice(0, -1);
    screen.value = valueToDelete;
  });

  squareRoot.addEventListener("click", () => {
    let value = Math.sqrt(screen.value);
    screen.value = value;
    operationDone = true;
  });

  square.addEventListener("click", () => {
    let value = screen.value * screen.value;
    screen.value = value;
    operationDone = true;
  });

  document.addEventListener("keydown", (event) => {
    let valueKeyDown = event.key;
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
        let answer = eval(screen.value);

        if (answer == "Infinity") {
          return (screen.value = "Error! x/0");
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
  });
})();
