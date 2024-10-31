
let saveTodoButton = document.getElementById("saveTodoButton");
let getTodoButton = document.getElementById("getTodoButton");
let taskItemsContainer = document.getElementById("taskItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");
let successMessage =document.getElementById("success-message")

const onTaskStatusChange = async (checkboxId, labelId, taskId,task,data) => {
  let checkboxElement = document.getElementById(checkboxId);
  let labelElement = document.getElementById(labelId);
  labelElement.classList.toggle("checked");
  let statusValue="";
  if (task.status === "false") {
    statusValue="true";
  }else if (task.status === "true"){
    statusValue="false";
  }
  console.log(statusValue)

  try {
    const response = await fetch(`http://localhost:3005/tasks/put/${taskId}`,{method:"PUT",headers: {'Content-Type':'application/json'},body:JSON.stringify({status:statusValue})});
    const jsonData = await response.json();
   // console.log(jsonData);
    let count=0;
    taskItemsContainer.innerHTML="";
    for (let task of jsonData) {
        count++;
        createAppendTasks(task,count,jsonData)
        }
  } catch (error) {
    console.log(error);
  }

} 



function createAppendTasks(task,count,data) {
  console.log(task)
    let checkboxId = "checkbox" + count;
    let labelId = "label" + count;

    let taskElement = document.createElement("li");
    taskElement.classList.add("task-item-container");
    taskElement.id = task._id;
    taskItemsContainer.appendChild(taskElement);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    
    if (task.status === 'true') {
      inputElement.checked=true;
    }else{
      inputElement.checked=false;
    }
    inputElement.onclick = function () {
        onTaskStatusChange(checkboxId, labelId, task._id,task,data);
      };
    
    inputElement.classList.add("checkbox-input");
    taskElement.appendChild(inputElement);
    
    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container");
    taskElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.id = labelId;
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = task.name;
    if (task.status === 'true') {
      labelElement.classList.add("checked");
    }else{
      labelElement.classList.remove("checked");
    }
    labelContainer.appendChild(labelElement);

    let checkMessage=document.createElement("p");
    checkMessage.textContent="click checkbox to change the mark as completed"
    labelContainer.appendChild(checkMessage);
    let dateMessage=document.createElement("h3");
    dateMessage.textContent=task.date;
    labelContainer.appendChild(dateMessage);
    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");

    deleteIcon.onclick = function () {
        onDeleteTask(task._id);
    };

    deleteIconContainer.appendChild(deleteIcon);
}



addTodoButton.addEventListener("click", async() => {
    let userInputElement = document.getElementById("todoUserInput");
    let userInputValue = userInputElement.value;
    let newDate = new Date();
    let dateValue=newDate.toLocaleDateString() +" "+newDate.toLocaleTimeString()

    if (userInputValue === "") {
        alert("Enter Valid Text");
        //return;
    }
    else{ 
            try {
              const response = await fetch("http://localhost:3005/tasks/add-task",{method:"POST",headers: {'Content-Type':'application/json'},body:JSON.stringify({name:userInputValue,date:dateValue})});
              const jsonData = await response.json();
              console.log(jsonData);
             
              successMessage.style.display="block";
            } catch (error) {
              console.log(error);
            }

            userInputElement.value="";
        }
       
})


getTodoButton.addEventListener("click", async () =>{
     await fetch("http://localhost:3005/tasks/all-tasks")
        .then((response) => {
            return response.json();
        })
        .then((data) =>{
            let count=0;
            taskItemsContainer.innerHTML="";
            for (let task of data) {
                count++;
                createAppendTasks(task,count,data)
              }
            
            
        })
        .catch((error) => {
            console.log("errror during GET", error);
            
        })
        successMessage.style.display="none";
});



 const onDeleteTask= async (taskId)=> {
    try {
        const response = await fetch(`http://localhost:3005/tasks/delete/${taskId}`,{method:"DELETE"});
        const jsonData = await response.json();
        console.log(jsonData.message);
        let count=0;
        taskItemsContainer.innerHTML="";
        for (let task of jsonData.allTasks) {
            count++;
            createAppendTasks(task,count,jsonData.allTasks)
            }

       
        //SsuccessMessage.style.display="block";
      } catch (error) {
        console.log(error);
      }
  
}


