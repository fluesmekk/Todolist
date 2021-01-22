function deleteTask(id) {
    db.collection('tasklist').doc(id).delete();
    
}