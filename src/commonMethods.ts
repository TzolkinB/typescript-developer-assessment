function oddSum(numArray: number[]) {
  const oddArray = numArray.filter(num => num % 2 != 0)
    let sum = 0
    oddArray.forEach(num => sum += num)
  return sum
}

// reduce method
// const result = numArray => {
//  numArray.reduce((accumulator, currentValue) =>
//   currentValue % 2 > 0 ? accumulator + currentValue : accumulator, 0
// )


module.exports = oddSum