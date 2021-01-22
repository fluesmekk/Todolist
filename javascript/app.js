
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


    db.collection('tasklistDone').orderBy('dateDone').onSnapshot(snapshot => {
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


var tasklist = 'tasklist'
var editMode = false;
let html = '';
var disable = false;
updateView()
function updateView() {
    var tasks = '';
    if (tasklist == 'tasklist') {
        for (let i = 0; i < model.localTasks.length; i++) {
            
            if (model.localTasks[i].editMode) {
                disable = true;
                tasks += `
                <div class="task">
                <input class="tasks" value="${model.localTasks[i].task}" oninput="model.inputFromChange.inputTask = this.value"></input>
                <input class="urgency" value="${model.localTasks[i].urgency}" oninput="model.inputFromChange.inputUrgency = this.value"></input>
                <input class="deadline" value="${model.localTasks[i].deadline}" oninput="model.inputFromChange.inputDeadline = this.value"></input>
                <button class="button" onclick="saveTask(${i})">Lagre</button>
                </div>
                `
            } else if (!model.localTasks[i].editMode) {
                tasks += `
                <div class="task">
                <div class="tasks">Oppgave: ${model.localTasks[i].task}</div>
                <div class="urgency">Prioritet: ${model.localTasks[i].urgency}</div>
                <div class="deadline">Frist: ${model.localTasks[i].deadline}</div>
                <button class="button" onclick="taskDone(${i})">Ferdiggjør</button>
                <button ${disable ? 'disabled' : ''} class="button" onclick="editTask(${i})">Endre</button>
                </div>
                
                `;
            }
            
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
                    <div class="select1"onclick="changeTaskList()"><button>Change page</button></div>
                    <div class="tasklist">${tasklist == 'tasklistDone' ? 'Ferdige Tasks' : 'Uferdige Tasks'}</div>
                </div>
                ${tasklist == 'tasklistDone' ? '' : `
                <div class="inputs">
                    Task: <input class="inputsChild" oninput="model.inputs.inputTask = this.value"></input>
                    Urgency: <input class="inputsChild" oninput="model.inputs.inputUrgency = this.value"></input>  
                    Deadline: <input class="inputsChild" oninput="model.inputs.inputDeadline = this.value" type="date"></input>  
                    <button class="inputsChild" onclick="addTask()">Submit</button>  
                </div>`
                }
                
                
                
            </div>
            <div class="pageTask">
                ${tasks}
                </div>
            
    `;
    document.getElementById('app').innerHTML = html;
}



