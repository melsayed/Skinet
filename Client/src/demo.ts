type TODO = {
    id: number
    title: string
    completed: boolean
}

let toDos: TODO[] = [];

function addToToDos(title: string): TODO {
    const newToDo: TODO = {
        id: toDos.length + 1,
        title,
        completed: false
    }
    toDos.push(newToDo);
    return newToDo;
}

function ToggleToDo(id: number): void {
    const toDo = toDos.find(t => t.id == id);
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
