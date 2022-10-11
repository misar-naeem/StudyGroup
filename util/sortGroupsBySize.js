/**
 * @method sortGroupsBySize
 * @summary Use this function to sort and save groups by size (based on minimum and maximum group size)
 * @param {Object} tutorial - a tutorial in which the groups will be deleted and recreated
 * @param {Number} groupSize - a number containing the minimum group size
 */

export default async function sortGroupsBySize({ tutorial, groupSize }) {
  const tutorialSize = tutorial.students?.length;

  if (!tutorialSize || tutorialSize < groupSize) {
    alert(
      "No Tutorial Size was Provided or the groupSize is too high. Check if students are in this tutorial."
    );
    return;
  }

  const tutorialId = tutorial?.tutorialId;
  const students = tutorial?.students;
  const numberOfGroups = Math.floor(tutorialSize / groupSize);

  // For the number of groups calculated, allocate a number (groupSize) of students to each group
  // Add remaining students to the last group
  const groups = [];
  let count = 0;
  for (let i = 1; i < numberOfGroups + 1; i++) {
    const group = {
      tutorialId: tutorialId,
      groupNumber: i,
      students: [],
    };

    if (i != numberOfGroups) {
      for (let j = 0; j < groupSize; j++) {
        group.students.push({ email: students[count] });
        count++;
      }
    } else {
      const remainingStudents = tutorialSize - count;
      for (let k = 0; k < remainingStudents; k++) {
        group.students.push({ email: students[count] });
        count++;
      }
    }
    groups.push(group);
  }

  // Find and delete all groups for the current tutorial
  const deleteGroupData = async () => {
    const JSONdata = JSON.stringify({ tutorialId: tutorialId });
    const endpoint = "/api/delete-group-data";

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSONdata,
    };

    const response = await fetch(endpoint, options);
    const responseJson = await response.json();
    console.log(responseJson);
  };

  // Delete all existing groups for this tutorial
  await deleteGroupData();

  // Add all the new groups for this tutorial
  const addGroupData = async (group) => {
    const JSONdata = JSON.stringify(group);
    const endpoint = "/api/add-group-data";

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSONdata,
    };

    console.log(JSONdata);

    const response = await fetch(endpoint, options);
    const responseJson = await response.json();
    console.log(responseJson);
  };

  for (const group of groups) {
    await addGroupData(group);
  }

  // Save the group config to the tutorial
  const saveGroupConfiguration = async () => {
    const JSONdata = JSON.stringify({
      tutorialId: tutorialId,
      groupConfiguration: { groupSize: groupSize },
    });

    const endpoint = "api/add-group-config";
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSONdata,
    };

    const response = await fetch(endpoint, options);
    const result = await response.json();
    console.log(result);
  };

  await saveGroupConfiguration();
}
