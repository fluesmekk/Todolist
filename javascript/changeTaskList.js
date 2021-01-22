function changeTaskList() {
    if (tasklist == 'tasklist') {
        tasklist = 'tasklistDone'
    } else {
        tasklist = 'tasklist'
    }
    console.log(tasklist)
    updateView();
}