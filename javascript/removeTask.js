function removeTask(doc) {
    for (let i = 0; i < model.localTasks.length; i++) {
        if (model.localTasks[i].id == doc.id) {
            model.localTasks.splice(i, 1);
        }
    }
}