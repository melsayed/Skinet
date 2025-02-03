var toDos = [];
function addToToDos(title) {
    var newToDo = {
        id: toDos.length + 1,
        title: title,
        completed: false
    };
    toDos.push(newToDo);
    return newToDo;
}
function ToggleToDo(id) {
    var toDo = toDos.find(function (t) { return t.id == id; });
    if (toDo) {
        toDo.completed = !toDo.completed;
    }
}
addToToDos("Test Mahmoud");
addToToDos("Noor Test");
addToToDos("Lareine Test");
ToggleToDo(1);
console.log(toDos);
//Next code to convert ts to js file
//npx tsc src/demo.ts
//node src/demo.js
