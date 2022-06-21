import React, { useEffect, useRef, useState } from "react";
import useScroll from "../hooks/useScroll";

const List = () => {
    const [todos, setTodos] = useState([])
    const [page, setPage] = useState(1)
    const limit = 20

    const parentRef = useRef()
    const childRef = useRef()

    //В callback передаем функцию fetchTodos
    const intersected = useScroll(parentRef, childRef, () => fetchTodos(page, limit))

    function fetchTodos(page, limit){
        fetch(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}&_page=${page}`)
            .then(response => response.json())
            .then(json => 
                //Состояние полностью мы изменить не можем, поэтому разворачиваем новый массив, и добавляем элементы
                setTodos(prev => [...prev, ...json]))
                setPage(prev => prev + 1)
    }

    return(
        // Родительский элемент
        <div ref={parentRef} style={{height: '80vh', overflow: 'auto'}}>
            {todos.map(todo =>
                <div key={todo.id} style={{margin: 10, padding: 30, border: '2px solid black'}}>
                    {todo.id}. {todo.title}
                </div>    
            )}
            {/* Элемент, после которого требуется подгрузка элементов */}
            <div ref={childRef} style={{height: 10, background: 'blue'}}/>
        </div>
    )
}

export default List