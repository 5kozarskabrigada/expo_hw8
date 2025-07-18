import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Category = 'task' | 'event' | 'goal'

export interface Todo {
    id: string
    text: string
    completed: boolean
    category: Category 
    time: string
    date?: string
    notes?: string
}

interface ContextProps {
    todos: Todo[]
    addTodo: (
        text: string,
        category: Category,
        time: string,
        date?: string,
        notes?: string
    ) => void
    toggleTodo: (id: string) => void
}

const TodoContext = createContext<ContextProps | undefined>(undefined)

export const useTodos = () => {
    const c = useContext(TodoContext)
    if (!c) throw new Error()
    return c
}

export const TodoProvider = ({
    children}: {children: React.ReactNode}) => {
    const [todos, setTodos] = useState<Todo[]>([])

    useEffect(() => {
        ; (async () => {
            const j = await AsyncStorage.getItem('TODOS')
            if (j) setTodos(JSON.parse(j))
        })()
    }, [])

    const persist = async (t: Todo[]) => {
        setTodos(t)
        await AsyncStorage.setItem('TODOS', JSON.stringify(t))
    }

    const addTodo = (
        text: string,
        category: Category = 'task', 
        time: string,
        date?: string,
        notes?: string
    ) => {
        const t: Todo = {
            id: Date.now().toString(),
            text,
            completed: false,
            category, 
            time,
            date,
            notes
        };
        persist([...todos, t]);
    };

    const toggleTodo = (id: string) => {
        const t = todos.map(todo =>
            todo.id === id
                ? { ...todo, completed: !todo.completed }
                : todo
        )
        persist(t)
    }

    return (
        <TodoContext.Provider value={{ todos, addTodo, toggleTodo }}>
            {children}
        </TodoContext.Provider>
    )
}

export default TodoContext;