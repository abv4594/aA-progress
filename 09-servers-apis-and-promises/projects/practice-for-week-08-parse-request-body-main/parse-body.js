function firstStep(input) {
  return input.split('&')
}

function secondStep(input) {
  return input.map(pair => pair.split('='));
}

function thirdStep(input) {
  return input.map(pair => pair.map(el => el.replace('+',' ')))
}

function fourthStep(input) {
  return input.map(pair => pair.map(el => {
    const regex = /%[0-9A-Fa-f]{2}/
    return el.replace(regex, decodeURIComponent(el.match(regex)));
  }))
}

function fifthStep(input) {
  return input.reduce((acc, el) => {
    acc[el[0]] = el[1];
    return acc
  }, {});
}

function parseBody(str) {
  return fifthStep(
    fourthStep(
      thirdStep(
        secondStep(
          firstStep(str)
        )
      )
    )
  )
}


/******************************************************************************/
/******************* DO NOT CHANGE THE CODE BELOW THIS LINE *******************/

module.exports = {
  firstStep,
  secondStep,
  thirdStep,
  fourthStep,
  fifthStep,
  parseBody
};