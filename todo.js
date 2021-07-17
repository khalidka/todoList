var tasks = []

function addTaskToTable(jobs, msg) {
    var rows = ''
    jobs.forEach(job => {
        var row = `
        <tr>
        <td>
            <span class="task-${jobs.indexOf(job)}">${job.name}</span>
        </td>
        <td>${job.status}</td>
        <td>
          <a href="" class="btn btn-success btn-sm markBtn" data-index="${jobs.indexOf(job)}">  
    
    `
    if (job.status === 'Incomplete') {
        row += ` <i class="fa fa-check"></i>
        Mark As Completed`
    }else{
        row += ` <i class="fa fa-times"></i>
        Mark As Incomplete`
    }
    row +=
    `
      </a>
      </td>
      <td>
        <a href="" class="btn btn-danger btn-sm deleteBtn" data-index="${jobs.indexOf(job)}">Delete</a>
      </td>
      </tr>
    `
    
    rows += row
        
    });
    
    document.getElementById('taskTable').innerHTML = rows
    document.getElementById('successMessage').innerHTML = msg
    document.getElementById('successAlert').classList.remove('invisible')

    setTimeout(() => {
        document.getElementById('successAlert').classList.add('invisible')
    }, 3000);

}




document.getElementById('addTask').addEventListener('click', ()=>{
    var taskInputField = document.getElementById('taskName')
    var taskName = taskInputField.value

    if (taskName == '') {
        document.getElementById('errorAlert').classList.remove('invisible')
        setTimeout(() => {
            document.getElementById('errorAlert').classList.add('invisible')
        }, 2000);
    }else{
        var task = {
            name: taskName,
            status: 'Incomplete'
        }
        tasks.push(task)
        addTaskToTable(tasks, 'A new task has been added successfully!')  
    }
    taskInputField.value = ''
    taskInputField.focus()
    
    
})

document.getElementById('taskName').addEventListener('keyup', (event)=>{
    if(event.keyCode == 13){
        document.getElementById('addTask').click()
    }
})

document.addEventListener('click', (e) =>{
    e.preventDefault()
    if (e.target.classList.contains('markBtn')) {
        var item = tasks[e.target.dataset.index]
        console.log('Before', item)
        var message, textDecoration;
        if (item.status === 'Incomplete') {
            item.status = 'Complete'
            message = `${item.name} has been marked as complete!`
            textDecoration = "line-through"
        } else {
            item.status = 'Incomplete'
            message = `${item.name} has been marked as incomplete!`
            textDecoration = ''
        }
        console.log('After', item)
        // tasks[e.target.dataset.index] = item
        addTaskToTable(tasks, message)
        document.querySelector(`.task-${e.target.dataset.index}`).style.textDecoration = textDecoration
    }
})
document.addEventListener('click', (e) =>{
    if (e.target.classList.contains('deleteBtn')) {
        tasks.splice(e.target.index, 1)
        addTaskToTable(tasks, 'Task has been deleted!')
    }
})