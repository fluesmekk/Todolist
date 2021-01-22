function  saveTask(i) {
    var doc = db.collection('tasklist').doc(model.localTasks[i].id);
    disable = false;
    if (model.inputFromChange.inputTask != '') {
        doc.update({
            task: model.inputFromChange.inputTask,
        })
    } else if (model.inputFromChange.inputUrgency != '') {
        doc.update({
            urgency: model.inputFromChange.inputUrgency,
        })
    } else if (model.inputFromChange.inputDeadline != '') {
        doc.update({
            deadline: model.inputFromChange.inputDeadline,
        })
    } else {
        model.localTasks[i].editMode = false;
        updateView();
    }
    model.localTasks[i].editMode = false;
}