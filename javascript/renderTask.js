
function renderTask(doc) {
    model.localTasks.push(
        {
            id: doc.id,
            task: doc.data().task,
            urgency: doc.data().urgency,
            deadline: doc.data().deadline,
        }
    )
}