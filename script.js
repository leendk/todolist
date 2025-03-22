let tasks = [];

// حفظ المهام في localStorage
const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

// إضافة مهمة جديدة
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

// حذف مهمة
const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTaskList();
    updateStats();
    saveTasks();
};

// تحرير مهمة
const editTask = (index) => {
    const taskInput = document.getElementById("taskInput");
    taskInput.value = tasks[index].text;
    deleteTask(index);
};

// تحديث النص التحفيزي بناءً على حالة المهام
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

// تحديث الإحصائيات
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

    // تحديث النص التحفيزي
    updateMotivationalText();

    if (tasks.length && completTasks === totalTasks) {
        blaskConfetti();
    }
};

// تغيير حالة إتمام المهمة
const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateStats();
    saveTasks();

    // تحديث الـ DOM لإضافة الفئة completed
    const taskItem = document.querySelectorAll('.taskItem')[index];
    const taskText = taskItem.querySelector('.task');
    if (tasks[index].completed) {
        taskText.classList.add('completed');
    } else {
        taskText.classList.remove('completed');
    }
};

// تحديث قائمة المهام
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

// إضافة مهمة عند الضغط على الزر
document.getElementById("newTask").addEventListener("click", function (e) {
    e.preventDefault();
    addTask();
});

// تنفيذ تأثير الكنفتي عند إتمام كل المهام
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
