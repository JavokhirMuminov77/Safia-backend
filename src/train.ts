// Task - J
function findLongestWord(str: string): string {
  let result = str
    .split(" ")
    .reduce((acc, curr) => (acc.length >= curr.length ? acc : curr));
  return result;
}

  console.log(findLongestWord("I come from Uzbekistan"));
