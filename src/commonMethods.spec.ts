const oddSum = require('./commonMethods')

test('should provide the sum of only odd numbers', () => {
  const array = [ 1, 2, 1, 2]
  expect(oddSum(array)).toBe(2)
})