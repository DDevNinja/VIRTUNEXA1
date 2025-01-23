function updateClock() {
    const clock = document.getElementById('clock');
    const now = new Date();
    clock.textContent = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();


function calculateFactorial(method) {
    const input = document.getElementById('numberInput').value;
    const output = document.getElementById('output');

    
    const number = parseInt(input);
    if (isNaN(number) || number < 0) {
        output.textContent = 'Please enter a valid positive integer.';
        return;
    }

    let result;
    if (method === 'iterative') {
        result = factorialIterative(number);
        output.textContent = `Factorial of ${number} (Iterative): ${result}`;
    } else if (method === 'recursive') {
        result = factorialRecursive(number);
        output.textContent = `Factorial of ${number} (Recursive): ${result}`;
    }
}

function factorialIterative(n) {
    let result = 1;
    for (let i = 1; i <= n; i++) {
        result *= i;
    }
    return result;
}

function factorialRecursive(n) {
    if (n === 0 || n === 1) return 1;
    return n * factorialRecursive(n - 1);
}