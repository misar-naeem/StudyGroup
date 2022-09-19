/**
 * @method sortGroupsBySize
 * @summary Use this function to sort and save groups by size (based on minimum and maximum group size)
 * @param {Object} tutorial - a tutorial in which the groups will be deleted and recreated
 * @param {Number} minGroupSize - a number containing the minimum group size
 * @param {Number} maxGroupSize - a number containing the maximum group size
 */

export default async function sortGroupsBySize(
  tutorial,
  minGroupSize,
  maxGroupSize
) {
  const tutorialSize = tutorial[0]?.students?.length;
  if (!tutorialSize) {
    alert(
      "No Tutorial Size was Provided. Check if students are in this tutorial."
    );
    return;
  }

  const students = tutorial[0].students;

  let groupSize = tutorialSize;

  groupSize = groupSize / minGroupSize;

  while (groupSize > maxGroupSize) {
    groupSize = groupSize / minGroupSize;
  }

  if (Math.ceil(groupSize) < minGroupSize) {
    alert(
      "There are not enough students in your tutorial to sort. Consider lowering the minimum group size."
    );
    return;
  }

  let remainingStudents = tutorialSize;
  let index = 0;

//   while (remainingStudents > 0) {
//     if (remainingStudents - groupSize < groupSize) {
//       // use up the rest of the students
//       break;
//     } else {
//       for (let i = 0; i < groupSize; i++) {
//         console.log(students[index]);
//         index++;
//       }
//       remainingStudents = remainingStudents - groupSize;
//     }
//   }
}
