export const Calculator = {
    buttons: document.querySelectorAll(".calculator-button"),
    resultContainer: document.querySelector(".result-container p"),
    validNumbers: ["0", 
    "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    

    setResultContainerText(text: string) {
        if (Calculator.resultContainer) {
            Calculator.resultContainer.textContent += text;
        }
    },

    clearResultContainerText() {
        if (Calculator.resultContainer?.textContent) {
            Calculator.resultContainer.textContent = "";
        }
    },


    isValidEquacion() {
        const regexEquacion = /[-+]?[0-9][0-9]*[+-x/][0-9]([+-x/][0-9])?/;
        if (Calculator.resultContainer?.textContent) {
            return regexEquacion.test(Calculator.resultContainer?.textContent);
        }
        
    },


    isValidSignal(signal: string) {
        const actionsSignals = ["CL", "C", "=", "Backspace", "Enter", "Delete"];
        return actionsSignals.some(actionSignal => actionSignal === signal);
        
    },


    executeAction(action: { signal: string, key: string, execute: () => void }) {
        if (action.signal === action.key) {
            action.execute();
        }
    },

    calculate() {
        const resultContainerText = Calculator.resultContainer.textContent
        .replaceAll(" ", "")
        .replaceAll("x", "*");
        const mathEquacion = eval(resultContainerText);
        Calculator.clearResultContainerText();
        Calculator.setResultContainerText(`${mathEquacion}`);
    },
  

    deleteLastValue() {
        const resultContainerTextToArray = Calculator.resultContainer.textContent
        .split("")
        resultContainerTextToArray.pop();
        const resultContainerTextToString = resultContainerTextToArray.toString()
        .replaceAll(",", "");
        Calculator.clearResultContainerText();
        Calculator.setResultContainerText(`${resultContainerTextToString}`);
       
    },

    onKey({ key } : KeyboardEvent) {
        
        if (Calculator.isValidSignal(key)) {
            Calculator.executeAction({
                signal: key,
                key: "Delete",
                execute() {
                    Calculator.clearResultContainerText();
                }
            })

            Calculator.executeAction({
                signal: key,
                key: "Backspace",
                execute() {
                    Calculator.deleteLastValue();
                }
            })

            Calculator.executeAction({
                signal: key,
                key: "Enter",
                execute() {
                    if (Calculator.isValidEquacion()) {
                        Calculator.calculate();
                    }
                    
                }
            })
        }
        else {
            const invalidKeys = ["NumLock", "Shift", "Backspace", "Enter"];
            if (invalidKeys.every(invalidKey => key !== invalidKey)) {
                Calculator.setResultContainerText(`${key}`);
            }
            
        }

    },

    onButtonsClick() {
        Calculator.buttons.forEach((button) => {
            button.addEventListener("click", () => {
                const signal = button.textContent;
                const actionsSignals = ["CL", "C", "="];
                if (Calculator.isValidSignal(signal)) {
                    Calculator.executeAction({
                        signal,
                        key: "CL",
                        execute() {
                            Calculator.clearResultContainerText()
                        }
                    })

                    Calculator.executeAction({
                        signal,
                        key: "C",
                        execute() {
                            Calculator.deleteLastValue();
                        }
                    })

                    Calculator.executeAction({
                        signal,
                        key: "=",
                        execute() {
                            console.log(Calculator.resultContainer.textContent);
                            if (Calculator.isValidEquacion()) {
                                Calculator.calculate();
                            }
                        }
                    })
                }
                else {
                    Calculator.setResultContainerText(`${signal}`);
                }
            })
        })
    },
    init() {
        Calculator.onButtonsClick();
        window.addEventListener("keydown", Calculator.onKey);
    }

}