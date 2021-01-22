function taskDone(index) {
    deleteTask(model.localTasks[index].id)
    db.collection('tasklistDone').add({
        task: model.localTasks[index].task,
        urgency: model.localTasks[index].urgency,
        deadline: model.localTasks[index].deadline,
        dateDone: new Date().toLocaleDateString(),
    })
}