import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showingCompleted, setShowingCompleted] = useState(false)

  useEffect(() => {
    const todoString = localStorage.getItem("todos")
    if (todoString) {
      const todos = JSON.parse(todoString)
      setTodos(todos)
    }
  }, [])

  const saveTLS = (todos) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const handleDelete = (id) => {
    const newTodos = todos.filter((item) => item.id !== id)
    setTodos(newTodos)
    saveTLS(newTodos)
  }

  const handleEdit = (id) => {
    const t = todos.find((item) => item.id === id)
    setTodo(t.todo)
    const newTodos = todos.filter((item) => item.id !== id)
    setTodos(newTodos)
    saveTLS(newTodos)
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleAdd = () => {
    const newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }]
    setTodos(newTodos)
    setTodo("")
    saveTLS(newTodos)
  }

  const handleCheckbox = (e) => {
    const id = e.target.name
    const index = todos.findIndex((item) => item.id === id)
    const newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    saveTLS(newTodos)
  }

  const toggleShowCompleted = () => {
    setShowingCompleted(!showingCompleted)
  }

  return (
    <>
      <div className='flex flex-col items-center md:space-y-5'>
        <div className='bg-orange-200 sticky top-0 flex flex-col items-center justify-center space-y-3 py-3 w-full'>
          
          <div className='flex space-x-3 items-center justify-center'>
            <input onChange={handleChange} value={todo} className='rounded p-3 sm:w-[25rem]' type="text" placeholder="What's up??" />
            <button onClick={handleAdd} disabled={todo.length < 1} className='border p-2.5 rounded disabled:bg-orange-950 disabled:bg-opacity-50 transition-colors bg-orange-400 hover:bg-orange-950 hover:bg-opacity-50'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={26} height={26} color={"white"} fill={"white"}>
                <path d="M12 4V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4 12H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
        <div className='flex-col flex items-center justify-start w-full md:w-3/4 xl:w-1/2 bg-[#e3965c] p-7 md:rounded-[40px] space-y-5 md:shadow-neutral-600 md:shadow-2xl'>
       <div className='w-full flex items-center justify-center text-white text-3xl font-semibold'>TASKER</div>
          <div className='flex items-start justify-start w-full'>
            <ul className='flex flex-col w-full'>
              <li className='flex flex-col items-center justify-center w-full'>
              {(todos.filter(item => showingCompleted ? item.isCompleted : !item.isCompleted).length === 0) && <div className='text-[#dedede]'>All the Tasks are done!!</div>}
                {todos.filter(item => showingCompleted ? item.isCompleted : !item.isCompleted).map((item) => (
                  
                  <div key={item.id} className="flex items-center justify-between w-full">
                    <div className='flex items-center justify-center space-x-3 p-2.5'>
                      <label className="relative rounded-full cursor-pointer flex items-center justify-center">
                        <input name={item.id} onChange={handleCheckbox} checked={item.isCompleted} id="ripple-off" type="checkbox"
                          className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-white checked:bg-white checked:before:bg-white hover:before:opacity-0" />
                        <span
                          className="absolute text-orange-400 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
                            stroke="currentColor" strokeWidth="1">
                            <path fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"></path>
                          </svg>
                        </span>
                      </label>
                      <label className="mt-px text-lg text-white cursor-default select-none">
                        <span className={item.isCompleted ? "line-through" : ""}>
                          {item.todo}
                        </span>
                      </label>
                    </div>
                    <div className='flex space-x-2 justify-center items-center'>
                      <button id='delete' name={item.id} onClick={() => handleDelete(item.id)} className='hover:scale-110'>
                        <div>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"white"} fill={"none"}>
                            <path d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M9 11.7349H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M10.5 15.6543H13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M3 5.5H21M16.0555 5.5L15.3729 4.09173C14.9194 3.15626 14.6926 2.68852 14.3015 2.39681C14.2148 2.3321 14.1229 2.27454 14.0268 2.2247C13.5937 2 13.0739 2 12.0343 2C10.9686 2 10.4358 2 9.99549 2.23412C9.89791 2.28601 9.80479 2.3459 9.7171 2.41317C9.32145 2.7167 9.10044 3.20155 8.65842 4.17126L8.05273 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                          </svg>
                        </div>
                      </button>
                      <button onClick={() => handleEdit(item.id)} className='hover:scale-110'>
                        <div>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"white"} fill={"none"}>
                            <path d="M16.2141 4.98239L17.6158 3.58063C18.39 2.80646 19.6452 2.80646 20.4194 3.58063C21.1935 4.3548 21.1935 5.60998 20.4194 6.38415L19.0176 7.78591M16.2141 4.98239L10.9802 10.2163C9.93493 11.2616 9.41226 11.7842 9.05637 12.4211C8.70047 13.058 8.3424 14.5619 8 16C9.43809 15.6576 10.942 15.2995 11.5789 14.9436C12.2158 14.5877 12.7384 14.0651 13.7837 13.0198L19.0176 7.78591M16.2141 4.98239L19.0176 7.78591" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M21 12C21 16.2426 21 18.364 19.682 19.682C18.364 21 16.2426 21 12 21C7.75736 21 5.63604 21 4.31802 19.682C3 18.364 3 16.2426 3 12C3 7.75736 3 5.63604 4.31802 4.31802C5.63604 3 7.75736 3 12 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                          </svg>
                        </div>
                      </button>
                    </div>
                  </div>
                ))}
              </li>
            </ul>
          </div>
        </div>
        <div onClick={toggleShowCompleted} className='flex-col flex items-center justify-start w-11/12 sm:w-3/5 xl:w-1/3 text-orange-400 font-bold bg-[#ffffff] p-3 rounded-lg space-y-5 transition-all cursor-pointer hover:shadow-orange-400 shadow-2xl fixed bottom-7'>
          {showingCompleted ? 'Show Incomplete Tasks' : 'Show Completed Tasks'}
        </div>
      </div>
    </>
  )
}

export default App
