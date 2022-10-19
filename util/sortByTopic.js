/**
 * @method sortByTopic
 * @summary Use this function to sort and save groups by size (based on minimum and maximum group size)
 * @param {Object} tutorial - a tutorial in which the groups will be deleted and recreated
 * @param {Number} groupSize - a number containing the minimum group size
 */

  function divideBucketInGroups ({studentsBucket, groupSize, tutorialId, startingGroupNumber, topic}) {

  const students = studentsBucket;
  const bucketSize = studentsBucket.length
  const numberOfGroups = Math.floor(bucketSize / groupSize);
  let groupNumber = startingGroupNumber;

  console.log("Number of Groups")
  console.log(numberOfGroups);

  const groups = [];
  let count = 0;

  for (let i = 1; i < numberOfGroups + 1; i++) {
    const group = {
      tutorialId: tutorialId,
      groupNumber: groupNumber,
      students: [],
      topic: topic
    };

    console.log("Group Number")
    console.log(i)

    console.log("Students")
    console.log(students)

    if (i != numberOfGroups) {
      for (let j = 0; j < groupSize; j++) {
        group.students.push(students[count]);
        count++;
      }
    } else {
      const remainingStudents = bucketSize - count;
      for (let k = 0; k < remainingStudents; k++) {
        group.students.push(students[count]);
        count++;
      }
    }
    groups.push(group);
    groupNumber++;
  }

  if (numberOfGroups == 0 && studentsBucket.length > 0) {
    const group = {
      tutorialId: tutorialId,
      groupNumber: groupNumber,
      students: students,
      topic: topic
    }

    groups.push(group);
  } 
  
  console.log("Groups")
  console.log(groups)

  return groups;
}


 export default async function sortGroupsByTopic({ tutorial, groupSize, students }) {

    console.log("Tutorial")
    console.log(tutorial)

    console.log("GroupSize")
    console.log(groupSize)

    console.log("tutorial students")
    console.log(students)

    const tutorialSize = tutorial.students?.length;

    if (!tutorialSize || tutorialSize < groupSize) {
      alert(
        "No Tutorial Size was Provided or the groupSize is too high. Check if students are in this tutorial."
      );
      return;
    }

    const tutorialId = tutorial?.tutorialId;

    // Group students into topic buckets
    const organizedByPreference = students.reduce((map, e) => ({
      ...map,
      [e.preference]: [...(map[e.preference] ?? []), e]
    }), {});

    console.log(organizedByPreference);

        // For the number of groups calculated, allocate a number (groupSize) of students to each group
    // Add remaining students to the last group

    const groups = []

    // For each bucket, divide into groups
    const topics = Object.keys(organizedByPreference)
    let startingGroupNumber = 1;

    topics.forEach(topic => {
      var studentsBucket = organizedByPreference[topic]
      console.log("Buckets")
      console.log(studentsBucket)

      console.log("Topic")
      console.log(topic)

      groups.push(...divideBucketInGroups({studentsBucket, groupSize, tutorialId, startingGroupNumber, topic}))
      startingGroupNumber++;
    });


    console.log(groups)




    // Get the student topic preferences
    const studentData = async () => {

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
  