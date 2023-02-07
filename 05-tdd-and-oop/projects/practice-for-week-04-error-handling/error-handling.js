// 1.
function sum(array) {
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    sum += array[i];
  }
  return sum;
}

try {

let res = sum(null);
console.log(res);

} catch (error) {
  if (error instanceof TypeError) {
    console.log(`Wrong type passed into sum: ${error.message}`)
  } else {
    console.log(error.message);
  }
}




// 2.
// tests


try { 
  sayName("Alex");
  sayName(1); }
  catch (error) {
    if (error instanceof TypeError)
     {console.log(`Type error: ${error.message}`);
      } else {
        console.log(error.message);
    }
  }
// Your code here

function sayName(name) {
  if ((typeof name === 'string')) {
    console.log(name);
  } else {
    throw TypeError('Invalid name! Must be a string!')
  }
}


// 3.
function greet(greeting) {
  if (!greeting) {
    throw new Error("There was no greeting given.");
  }

  console.log(greeting);
}

try {
  greet(null)
} catch (error) {
  console.log('Hello World')
}