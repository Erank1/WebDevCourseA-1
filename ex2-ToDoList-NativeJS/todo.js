(function () {
    let taskList = {};


    class Task {
        constructor(taskname) {
            this.tasktext = taskname;
            this.completed = false;
        }
        setCompleted(value) {
            this.completed = value;
        }
    }
    class TasksList {
        constructor() {
            this.list = [];
        }
        add(v) {
            this.list.push(new Task(v));
        }
        findTask(v) {
            for(let t of this.list)
                if(t.tasktext == v) {
                    return true;
                }
            return false;
        }
        printList(incompleted){
            let ht = "<div class='list-group'>";
            let i = 0;
            let task_color = "list-group-item-primary";
            if(incompleted)
                task_color = "list-group-item-success";
            for(let t of this.list)
            {
                if(t.completed === incompleted) {
                    ht += '<a class="list-group-item list-group-item-action ' + task_color + '"'
                        + ' id="item"' + i + '"' + ' data-toggle="list" href="#" role="tab" aria-controls="home"' + '>'
                        + t.tasktext + "</a>";

                    ++i;
                }
            }
            ht += "</div>";
            return ht;

        }
        markCompleted(t) {
            for(let x of taskList.list) {
                if(t == x.tasktext) {
                    x.setCompleted(true);
                    return;
                }
            }
            throw(t + "not found");
        }
    }
    function setErrorMsg(value) {
        document.getElementById('error-msg').innerHTML = value;
        document.getElementById('error-msg').style.display = "block";
    }
    function clearErrorMsg() {
        document.getElementById('error-msg').innerHTML = "";
        document.getElementById('error-msg').style.display = "none";
    }
    function completeTask() {
        try {
            taskList.markCompleted(this.textContent);
            this.parentNode.removeChild(this);
        }
        catch(exc) {
            console.log("item not found - markCompletedAndRemove ignored");
        }
    }


    document.addEventListener('DOMContentLoaded', function() {
        clearErrorMsg();
        taskList = new TasksList();
        document.getElementById('add-btn').addEventListener('click', function(){
            let v = document.getElementById('task-text').value.trim();
            if(v == "") {
                setErrorMsg("An empty task has been entered.");
            }
            else if(taskList.findTask(v)) {
                setErrorMsg("This task already Exist!");
            }
            else {
                taskList.add(v);
                clearErrorMsg();
                document.getElementById('task-text').innerHTML = "";
                document.getElementById('theTasks').innerHTML = taskList.printList(false);

                for(let c of document.getElementsByClassName('list-group-item')) {
                    c.addEventListener('click', completeTask);
                }
            }
        });
        document.getElementById('show-btn').addEventListener('click', function() {
            document.getElementById('theTasks').innerHTML = taskList.printList(true);
            this.style.display='none';
            document.getElementById('back-btn').style.display = 'inline';
            document.getElementById('textbooks').style.display = 'none';
        });
        document.getElementById('back-btn').addEventListener('click', function() {
            document.getElementById('theTasks').innerHTML = taskList.printList(false);
            this.style.display='none';
            document.getElementById('show-btn').style.display = 'inline';
            document.getElementById('textbooks').style.display = 'initial';
            for(let c of document.getElementsByClassName('list-group-item')) {
                c.addEventListener('click', completeTask);
            }
        });
    });

})();