/*G-TASK:

Shunday function tuzingki unga integerlardan iborat array pass bolsin va function bizga osha arrayning eng katta qiymatiga tegishli birinchi indexni qaytarsin.
MASALAN: getHighestIndex([5, 21, 12, 22, 8]) return qiladi 1 sonini.

@MITASK
*/

// const a;
// const a = new Array();
// a[0] = 10;
// a[1] = 20;

// declaration
// creation
// initialization
// assignment


// 1. Shunday function tuzingki unga integerlardan iborat array pass bolsin
// 2. Arrayni loop qilamiz
// 3. Bitta yangi variable create qilamiz va 0 index dagi array elementini solamiz
// 4. Har bir Array elementini 0inchi elementdan kattami yo'qmi tekshiramiz
function getHighestIndex(arr) {
  let max = arr[0];
  let maxIndex = 0
  for(let i=0; i<arr.length; i++) {
    if(max <= arr[i]) {
      max = arr[i]
      maxIndex = i
    }
  }
  return maxIndex
}

const a = [5, 21, 20000, 12, 80000, 9000];
const maximumIndex = getHighestIndex(a)
console.log(maximumIndex)

// 5. Agar 0inchidan keyingi element katta bo'lsa yangi variableni ichidagi qiymatni keyingi element bilan almashtiramiz
// 6. Eng katta qiymatli elementni indeksini qaytaramiz
console.log(sonlar("1a1a5a1a1"));