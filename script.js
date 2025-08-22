const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const completedCounter = document.getElementById("completed-counter");
const uncompletedCounter = document.getElementById("uncompleted-counter");
const inputButton = document.getElementById("input-button");

// Use event listener on the button instead of 'onclick' in HTML
inputButton.addEventListener("click", addTask);

// Use event delegation on the list container
listContainer.addEventListener("click", function(event) {
    const clickedElement = event.target;
    const li = clickedElement.closest("li");
    if (!li) return; // Exit if the click wasn't inside a list item

    if (clickedElement.type === "checkbox") {
        li.classList.toggle("completed", clickedElement.checked);
        updateCounters();
    } else if (clickedElement.classList.contains("edit-btn")) {
        const taskSpan = li.querySelector("span");
        const update = prompt("Edit task:", taskSpan.textContent);
        if (update !== null && update.trim() !== "") {
            taskSpan.textContent = update.trim();
        }
    } else if (clickedElement.classList.contains("delete-btn")) {
        if (confirm("Are you sure you want to delete this task?")) {
            li.remove();
        }
    }
    updateCounters(); // A single call to update counters after any action
});


function addTask() {
    const task = inputBox.value.trim();
    if (!task) {
        alert("Please write down a task");
        return;
    }

    const li = document.createElement("li");
    li.innerHTML = `
        <label>
            <input type="checkbox">
            <span>${task}</span>
        </label>
        <span class="edit-btn">Edit</span>
        <span class="delete-btn">Delete</span>
    `;

    listContainer.appendChild(li);
    inputBox.value = "";
    updateCounters();
}

function updateCounters() {
    const completedTasks = document.querySelectorAll("#list-container li.completed").length;
    const uncompletedTasks = document.querySelectorAll("#list-container li:not(.completed)").length;
    completedCounter.textContent = completedTasks;
    uncompletedCounter.textContent = uncompletedTasks;
}
