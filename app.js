
//gammel måte å tegne opp data på uten at den oppdaterer seg dynamisk
// db.collection('cafes').get().then((snapshot) => {
//     snapshot.docs.forEach(doc => {
//         renderCafe(doc);
//     })
// })


//kan hende du må lage en index om du sorterer over flere forskjellige fields
//orderBy name, name velger vilket field som skal sorteres rundt
//kan legge til en where() før order for å videre sammenligne før man sorterer
// db.collection('cafes').orderBy('name').get().then((snapshot) => {
//     snapshot.docs.forEach(doc => {
//         renderCafe(doc);
//     })
// })

//where når skal skjekke spesifikke objekter
// db.collection('cafes').where('city', '==', 'Marioland').get().then((snapshot) => {
//     snapshot.docs.forEach(doc => {
//         renderCafe(doc);
//     })
// })

    db.collection('tasklist').onSnapshot(snapshot => {
        let changes = snapshot.docChanges();
        changes.forEach(change => {
            if(change.type == 'added') {
                renderTask(change.doc);
                
            }
            if (change.type == 'modified') {
                changeTask(change.doc);
            }
            if (change.type == 'removed') {
                removeTask(change.doc)
            }
            updateView();
        })
    })


    db.collection('tasklistDone').onSnapshot(snapshot => {
        let changes = snapshot.docChanges();
        changes.forEach(change => {
            if(change.type == 'added') {
                renderTaskDone(change.doc);
                
            }
            if (change.type == 'modified') {
                changeTask(change.doc);
            }
            if (change.type == 'removed') {
                removeTask(change.doc)
            }
            updateView();
        })
    })





function deleteTask(id) {
    db.collection('tasklist').doc(id).delete();
    
}

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

function renderTaskDone(doc) {
    model.localTasksDone.push(
        {
            id: doc.id,
            task: doc.data().task,
            urgency: doc.data().urgency,
            deadline: doc.data().deadline,
            dateDone: doc.data().dateDone,
        }
    )
}


function removeTask(doc) {
    for (let i = 0; i < model.localTasks.length; i++) {
        if (model.localTasks[i].id == doc.id) {
            model.localTasks.splice(i, 1);
        }
    }
}

function addTask() {
    d = new Date(model.inputs.inputDeadline).toLocaleDateString()
    db.collection('tasklist').add({
        task: model.inputs.inputTask,
        urgency: model.inputs.inputUrgency,
        deadline: d
    })
}

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
var tasklist = 'tasklist'
function changeTaskList() {
    if (tasklist == 'tasklist') {
        tasklist = 'tasklistDone'
    } else {
        tasklist = 'tasklist'
    }
    console.log(tasklist)
    updateView();
}

function taskDone(index) {
    deleteTask(model.localTasks[index].id)
    db.collection('tasklistDone').add({
        task: model.localTasks[index].task,
        urgency: model.localTasks[index].urgency,
        deadline: model.localTasks[index].deadline,
        dateDone: new Date().toLocaleDateString(),
    })
}

let html = '';
updateView()
function updateView() {
    var tasks = '';
    if (tasklist == 'tasklist') {
        for (let i = 0; i < model.localTasks.length; i++) {
            tasks += `
            <div class="task">
            <div class="tasks">Oppgave: ${model.localTasks[i].task}</div>
            <div class="urgency">Prioritet: ${model.localTasks[i].urgency}</div>
            <div class="deadline">Frist: ${model.localTasks[i].deadline}</div>
            <button class="button" onclick="taskDone(${i})">ferdiggjør</button>
            </div>
            
            `;
        }
    }
    if (tasklist == 'tasklistDone') {
        for (let i = 0; i < model.localTasksDone.length; i++) {
            tasks += `
            <div class="task">
            <div class="tasks">Oppgave: ${model.localTasksDone[i].task}</div>
            <div class="urgency">Prioritet: ${model.localTasksDone[i].urgency}</div>
            <div class="deadline">Frist: ${model.localTasksDone[i].deadline}</div>
            <div class="urgency">Dato ferdiggjort: ${model.localTasksDone[i].dateDone}</div>
            </div>
            
            `;
        }
    }
    
    
    html = `
            <div class="page">
                <div class="select">
                    <div class="select1"onclick="changeTaskList()">Tasks yet completed</div>
                    <div class="select2"onclick="changeTaskList()">Finished Task</div>
                    <div class="tasklist">${tasklist == 'tasklistDone' ? 'Ferdige Tasks' : 'Uferdige Tasks'}</div>
                </div>
                ${tasklist == 'tasklistDone' ? '' : `
                <div class="inputs">
                    Task: <input oninput="model.inputs.inputTask = this.value"></input>
                    Urgency: <input oninput="model.inputs.inputUrgency = this.value"></input>  
                    Deadline: <input oninput="model.inputs.inputDeadline = this.value" type="date"></input>  
                    <button onclick="addTask()">Submit</button>  
                </div>`
                }
                
                
                
            </div>
            <div class="pageTask">
                ${tasks}
                </div>
            
    `;
    document.getElementById('app').innerHTML = html;
}