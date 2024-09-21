import {ChangeEvent, useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {useFetching} from "./hooks/useFetching.ts";
import TodoService from "./API/TodoService.ts";
import TodoList from "./components/TodoList.tsx";
import Select from "./components/UI/select/Select.tsx";
import {useTodos} from "./hooks/useTodos.ts";
import Input from "./components/UI/input/Input.tsx";
import Modal from "./components/UI/modal/Modal.tsx";
import Button from "./components/UI/button/Button.tsx";
import Loader from "./components/UI/loader/Loader.tsx";
import {countTotalPages} from "./utils/pages.ts";
import TodoPagination from "./components/TodoPagination.tsx";
import {ITodo} from "./types/todoTypes.ts";
import * as React from "react";

function App() {
    const [todos, setTodos] = useState<ITodo[]>([])
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState<boolean>(false)
    const [todo, setTodo] = useState<string>('')
    const sortedAndSearchedTodos = useTodos(todos, filter.sort, filter.query)
    const [totalPages, setTotalPages] = useState<number>(0)
    const [page, setPage] = useState<number>(1)
    const [fetchTodos, isLoading, error] = useFetching(async (page: number) => {
        const response = await TodoService.getAll(page)
        setTodos(response.data)
        const totalCount: number = response.headers['x-total-count']
        setTotalPages(countTotalPages(10, totalCount))
    })

    useEffect(() => {
        fetchTodos(page)
    }, [page])

    const removeTodo = (item: ITodo) => {
        setTodos(todos.filter(todo => todo.id !== item.id))
    }

    const createTost = () => {
        if (todo) {
            setTodos([...todos, {id: Date.now(), title: todo, completed: false}])
            setTodo('')
            setModal(false)
        }
    }

    const onChange = (item: ITodo) => {
        setTodos(todos.map(todo => todo.id === item.id ? {...todo, completed: !todo.completed} : todo))
    }

    return (
        <div className='app'>
            <Button style={{width: '100%', margin: '10px 0'}} onClick={() => setModal(true)}>Create todo</Button>
            <Modal visible={modal} setVisible={setModal}>
                <Input type="text"
                       value={todo}
                       onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTodo(event.target.value)}
                />
                <Button onClick={() => createTost()}>Create todo</Button>
            </Modal>
            <Select defaultValue={'Sorting'}
                    value={filter.sort}
                    onChange={(sort: string) => setFilter({...filter, sort: sort})}
                    options={[
                        {value: 'title', name: 'by title'},
                        {value: 'completed', name: 'by done'},
                        {value: 'not completed', name: 'by not done'},
                    ]}
            />
            <Input placeholder='search...'
                   type="text"
                   onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFilter({...filter, query: event.target.value})}
                   value={filter.query}
            />
            {!isLoading && !sortedAndSearchedTodos.length && <h1>There is no todos</h1>}
            {!isLoading
                ?
                <TodoList todos={sortedAndSearchedTodos} remove={removeTodo} onChange={onChange}/>
                :
                <Loader />
            }
            <TodoPagination totalPages={totalPages} page={page} setPage={setPage} />
        </div>

    )
}

export default App
