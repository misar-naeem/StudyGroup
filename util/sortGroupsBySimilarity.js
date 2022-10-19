/**
 * @method sortGroupsBySimilarity
 * @summary This aims to create groups within each topic preference that have the same years OR degrees.
 * Note: If there is a great variety of years or degrees, this function will may have lots of remainder groups.
 * @param {Object} tutorial - a tutorial in which the groups will be deleted and recreated
 * @param {Number} groupSize - a number containing the minimum group size
 */

function divideBucketInGroups({ studentsBucket, groupSize, tutorialId, startingGroupNumber, topic }) {

    const students = studentsBucket;
    const bucketSize = studentsBucket.length
    let numberOfGroups = Math.floor(bucketSize / groupSize);
    let groupNumber = startingGroupNumber;

    console.log("Number of Groups")
    console.log(numberOfGroups);

    console.log("Tutorial ID")
    console.log(tutorialId)

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
        console.log(groupNumber)
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

    return groups;
}

export default async function sortGroupsBySimilarity({ tutorial, groupSize, students, similarityKey }) {

    const tutorialSize = tutorial.students?.length;

    if (!tutorialSize || tutorialSize < groupSize) {
        alert(
            "No Tutorial Size was Provided or the groupSize is too high. Check if students are in this tutorial."
        );
        return;
    }

    const tutorialId = tutorial?.tutorialId;

    //Group students into topic buckets
    const organizedByPreference = students.reduce((map, e) => ({
        ...map,
        [e.preference]: [...(map[e.preference] ?? []), e]
    }), {});

    let groupNumberStart = 1;

    let groups = []

    // // For each topic bucket sort by similarity
    const topics = Object.keys(organizedByPreference)
    topics.forEach(topic => {
        const bucket = organizedByPreference[topic]

        const bucketGroups = sortTopicGroupBySimilarity({
            studentsToSort: bucket,
            tutorialId: tutorialId,
            similarityKey: similarityKey,
            groupNumberStart: groupNumberStart,
            groupSize: groupSize,
            topic: topic
        })

        groupNumberStart = groupNumberStart + (bucketGroups.length)

        groups = [...groups, ...bucketGroups]

    })
    await saveGroups({ tutorialId, groups, groupSize });
};

function sortTopicGroupBySimilarity({ studentsToSort, tutorialId, similarityKey, groupNumberStart, groupSize, topic }) {

    const students = studentsToSort;

    let groupBy = {}

    // Group students into buckets based on year or degree
    if (similarityKey == "year") {
        groupBy = students.reduce((map, e) => ({
            ...map,
            [e.year]: [...(map[e.year] ?? []), e]
        }), {});
    } else {
        groupBy = students.reduce((map, e) => ({
            ...map,
            [e.degree]: [...(map[e.degree] ?? []), e]
        }), {});
    }

    // For the number of groups calculated, allocate a number (groupSize) of students to each group
    // Add remaining students to the last group

    const groups = []

    // For each bucket, divide into groups
    const keys = Object.keys(groupBy)
    let startingGroupNumber = groupNumberStart;

    keys.forEach(key => {
        var studentsBucket = groupBy[key]

        groups.push(...divideBucketInGroups({ studentsBucket, groupSize, tutorialId, startingGroupNumber, topic }))
        startingGroupNumber++;
    });

    return groups;
}


async function saveGroups({ tutorialId, groupSize, groups }) {

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

        await saveGroupConfiguration();
    }
}
