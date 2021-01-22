function renderTaskDone(doc) {
    model.localTasksDone.push(
        {
            id: doc.id,
            task: doc.data().task,
            urgency: doc.data().urgency,
            deadline: doc.data().deadline,
            dateDone: doc.data().dateDone,
            editMode: false,
        }
    )
}