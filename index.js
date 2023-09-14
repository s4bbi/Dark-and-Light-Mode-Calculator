function getHistory() {
    return document.getElementById('history-value').innerText;
}

function printHistory(num) {
    document.getElementById("history-value").innerText = num;
}

function getOutput() {
    return document.getElementById("output-value").innerText;
}

function printOutput(num) {
    document.getElementById("output-value").innerText = num;
}

var operator = document.getElementsByClassName("operator");
var decimalClicked = false;

for (var i = 0; i < operator.length; i++) {
    operator[i].addEventListener('click', function () {
        if (this.id === "clear") {
            printHistory("");
            printOutput("");
            decimalClicked = false;
        } else if (this.id === "backspace") {
            var output = getOutput().toString();
            if (output) {
                output = output.substr(0, output.length - 1);
                printOutput(output);
            }
        } else {
            var output = getOutput();
            var history = getHistory();
            if (output !== "" || history !== "") {
                if (output === "") {
                    output = "0";
                }
                history += output;
                if (this.id === "=") {
                    try {
                        // Use parseFloat for better precision
                        var result = parseFloat(eval(history)).toFixed(2);
                        printOutput(result);
                        printHistory("");
                    } catch (error) {
                        printOutput("Error");
                    }
                } else {
                    history = history + this.id;
                    printHistory(history);
                    printOutput("");
                }
                decimalClicked = false;
            }
        }
    });
}

var number = document.getElementsByClassName("number");
for (var i = 0; i < number.length; i++) {
    number[i].addEventListener('click', function () {
        var output = getOutput().toString();
        var n = this.id;
        if (!isNaN(n) || (n === "." && !decimalClicked)) {
            if (n === ".") {
                decimalClicked = true;
            }
            if (output === "0" && n !== ".") {
                output = n;
            } else {
                output += n;
            }
            printOutput(output);
        }
    });
}

var decimalButton = document.getElementById("decimal");
decimalButton.addEventListener('click', function () {
    if (!decimalClicked) {
        var output = getOutput().toString();
        if (output === "") {
            output = "0";
        }
        output += ".";
        printOutput(output);
        decimalClicked = true;
    }
});

let checkbox = document.querySelector('input[name=theme]');
checkbox.addEventListener('change', function () {
    if (this.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
});
