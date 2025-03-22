let tasks = [];


const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};


const addTask = () => {
    const taskInput = document.getElementById("taskInput");
    const text = taskInput.value.trim();
    if (text) {
        tasks.push({ text: text, completed: false });
        taskInput.value = "";
        updateTaskList();
        updateStats();
        saveTasks();
    }
};


const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTaskList();
    updateStats();
    saveTasks();
};


const editTask = (index) => {
    const taskInput = document.getElementById("taskInput");
    taskInput.value = tasks[index].text;
    deleteTask(index);
};


const updateMotivationalText = () => {
    const completTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const motivationalText = document.querySelector(".details p");

    if (totalTasks === 0) {
        motivationalText.innerText = "Keep it up!";
    } else if (completTasks === 0) {
        motivationalText.innerText = "Keep going!";
    } else if (completTasks === totalTasks) {
        motivationalText.innerText = "You've done it!";
    } else {
        motivationalText.innerText = "Keep going!";
    }
};


const updateStats = () => {
    const completTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const progress = totalTasks > 0 ? (completTasks / totalTasks) * 100 : 0;

    const progressBar = document.getElementById("progress");
    if (progressBar) {
        progressBar.style.width = `${progress}%`;
    }

    const statsNumber = document.getElementById("numbers");
    if (statsNumber) {
        statsNumber.innerText = `${completTasks}/${totalTasks}`;
    }

  
    updateMotivationalText();

    if (tasks.length && completTasks === totalTasks) {
        blaskConfetti();
    }
};


const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateStats();
    saveTasks();

   
    const taskItem = document.querySelectorAll('.taskItem')[index];
    const taskText = taskItem.querySelector('.task');
    if (tasks[index].completed) {
        taskText.classList.add('completed');
    } else {
        taskText.classList.remove('completed');
    }
};


const updateTaskList = () => {
    const taskList = document.getElementById("task-list");
    if (!taskList) {
        console.error("task-list element not found!");
        return;
    }

    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
        <div class="taskItem">
            <div class="task ${task.completed ? "completed" : ""}">
                <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""}/>
                <p>${task.text}</p>
            </div>
            <div class="icons">
                <img src="edit.png" onClick="editTask(${index})"/>
                <img src="bin.png" onClick="deleteTask(${index})"/>
            </div>
        </div>
        `;
        listItem.querySelector(".checkbox").addEventListener("change", () => toggleTaskComplete(index));
        taskList.append(listItem);
    });
};


document.getElementById("newTask").addEventListener("click", function (e) {
    e.preventDefault();
    addTask();
});


const blaskConfetti = () => {
    const count = 200,
        defaults = {
            origin: { y: 0.7 },
        };

    function fire(particleRatio, opts) {
        confetti(
            Object.assign({}, defaults, opts, {
                particleCount: Math.floor(count * particleRatio),
            })
        );
    }

    fire(0.25, {
        spread: 26,
        startVelocity: 55,
    });

    fire(0.2, {
        spread: 60,
    });

    fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
    });

    fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
    });

    fire(0.1, {
        spread: 120,
        startVelocity: 45,
    });
};
