function addTask() {
    d = new Date(model.inputs.inputDeadline).toLocaleDateString()
    db.collection('tasklist').add({
        task: model.inputs.inputTask,
        urgency: model.inputs.inputUrgency,
        deadline: d
    })
}