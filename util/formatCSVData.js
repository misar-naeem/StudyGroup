export default function formatCSVData({groups, tutorialId}) {

    const data = []

    groups.forEach(group => {

        group.students.forEach(student => {
            const allocation = {
                "groupNumber": group.groupNumber,
                "studentEmail": student.email,
                "studentName": student.name,
                "degree": student.degree,
                "year": student.year,
                "topicPreference": student.preference,
                "tutorial": tutorialId
            }

            data.push(allocation)
        })

    });

    console.log(data)
    return data
}