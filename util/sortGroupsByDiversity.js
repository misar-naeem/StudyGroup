/**
 * @method sortGroupsByDiversity
 * @summary This aims to create groups within each topic preference that have different years OR degrees
 * @param {Object} tutorial - a tutorial in which the groups will be deleted and recreated
 * @param {Number} groupSize - a number containing the minimum group size
 */

export default async function sortGroupsByDiversity({ tutorial, groupSize, students, diversityKey }) {

    const tutorialSize = tutorial.students?.length;

    if (!tutorialSize || tutorialSize < groupSize) {
        alert(
            "No Tutorial Size was Provided or the groupSize is too high. Check if students are in this tutorial."
        );
        return;
    }

    const tutorialId = tutorial?.tutorialId;

    // //Group students into topic buckets
    const organizedByPreference = students.reduce((map, e) => ({
        ...map,
        [e.preference]: [...(map[e.preference] ?? []), e]
    }), {});

    let groupNumberStart = 1;

    let groups = []

    // For each topic bucket sort by diversity
    const topics = Object.keys(organizedByPreference)
    topics.forEach(topic => {
        console.log(`THE TOPIC IS = ${topic}`)
        const bucket = organizedByPreference[topic]

        const bucketGroups = sortTopicGroupByDiversity({
            studentsToSort: bucket,
            tutorialId: tutorialId,
            diversityKey: diversityKey,
            groupNumberStart: groupNumberStart,
            groupSize: groupSize,
            topic: topic
        })

        groupNumberStart = groupNumberStart + (bucketGroups.length)

        groups = [...groups, ...bucketGroups]

    })
    console.log("GROUP UPDATE")
    console.log(groups)
    await saveGroups({ tutorialId, groups, groupSize });
};

function sortTopicGroupByDiversity({ studentsToSort, tutorialId, diversityKey, groupNumberStart, groupSize, topic }) {

    const students = studentsToSort;
    console.log('STUDENTS TO SORT')
    console.log(students)

    let groupBy = {}

    // Group students into buckets based on year or degree
    if (diversityKey == "year") {
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

    const keys = Object.keys(groupBy)
    console.log(`KEYS = ${keys}`)
    let keysIndex = 0;

    const numberOfGroups = Math.floor(students.length / groupSize);
    let groupNumber = groupNumberStart;

    console.log("Number of Groups")
    console.log(numberOfGroups);

    console.log("Tutorial ID")
    console.log(tutorialId)

    const groups = [];
    let count = 0;

    let localGroupNumber = 1;

    while (localGroupNumber <= numberOfGroups) {
        const group = {
            tutorialId: tutorialId,
            groupNumber: groupNumber,
            students: [],
            topic: topic
        };

        if (localGroupNumber != numberOfGroups) {
            let groupStudentsAdded = 0;

            while (groupStudentsAdded < groupSize) {
                console.log(`Key index = ${keysIndex}`)
                let bucket = groupBy[keys[keysIndex]]
                if (bucket.length > 0) {
                    group.students.push(bucket[0]);
                    bucket.shift()
                    groupStudentsAdded++;
                    count++;
                }

                if (keysIndex == keys.length - 1) {
                    keysIndex = 0;
                } else {
                    keysIndex++;
                }
            }
        } else {
            const remainingStudents = students.length - count;
            for (let k = 0; k < keys.length; k++) {
                const bucket = groupBy[keys[k]]

                for (let index = 0; index < bucket.length; index++) {
                    group.students.push(bucket[index]);
                    count++;
                }
            }
        }
        console.log("Group")
        console.log(group)

        groups.push(group);
        groupNumber++;
        localGroupNumber++;
    }

    if (numberOfGroups == 0 && students.length > 0) {
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
