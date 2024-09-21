import {useMemo} from "react";
import {ITodo} from "../types/todoTypes.ts";

export const useSortedTodos = (todos: ITodo[], sort: string) => {
    const sortedTodos: ITodo[] = useMemo(() => {
        if (sort === 'completed') {
            return [...todos.filter(todo => todo.completed), ...todos.filter(todo => !todo.completed)]
        }
        if (sort === 'not completed') {
            return [...todos.filter(todo => !todo.completed), ...todos.filter(todo => todo.completed)]
        }
        if (sort) {
            return [...todos].sort((a: ITodo, b: ITodo) => a[sort].localeCompare(b[sort]))
        }
        return todos
    }, [sort, todos])

    return sortedTodos
}

export const useTodos = (todos: ITodo[], sort: string, query: string) => {
    const sortedTodos: ITodo[] = useSortedTodos(todos, sort)

    const sortedAndSearchedTodos: ITodo[] = useMemo(() => {
        return sortedTodos.filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()))
    }, [query, sortedTodos])

    return sortedAndSearchedTodos
}