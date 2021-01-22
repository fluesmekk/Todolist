function editTask(i) {
    disable = true;

    model.localTasks[i].editMode = true;
    
    updateView();
}