function changeTask(doc) {
    for (let i = 0; i < model.localTasks.length; i++) {
        if (model.localTasks[i].id == doc.id) {
            model.localTasks[i].task = doc.data().task
            model.localTasks[i].urgency = doc.data().urgency
            model.localTasks[i].deadline = doc.data().deadline
        }
    }
    updateView() 
}