import React ,{ useState ,useRef ,useEffect} from "react";
import TodoList from "./TodoList";
import uuidv4 from "uuid/v4";

const LOCAL_STORAGE_KEY = "todoapp.todos"

function App() {
  const [todos , setTodo] = useState([])
  const todoRefname = useRef()

  useEffect(()=>{
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedTodos)setTodo(storedTodos)
  }, [])

  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  },[todos])

  function toggletodo(id){
    const newtodos = [...todos]
    const todo = newtodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodo(newtodos)
  }

  function handleAddtodo(e){
    const name = todoRefname.current.value
    if(name==="")return
    setTodo(prevTodo =>{
      return [...prevTodo , { id: uuidv4(), name: name, complete:false}]
    })
    todoRefname.current.value = null
  }

  function handleClearTodos(){
    const newtodos = todos.filter(todo => !todo.complete)
    setTodo(newtodos)
  }

  return (
    <>
    <TodoList todos={todos} toggletodo={toggletodo}/>
    <input ref={todoRefname} type="text"/>
    <button onClick={handleAddtodo}>Add Todo</button>
    <button onClick={handleClearTodos}>Clear Completed</button>
    <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </>
  );
}

export default App;
