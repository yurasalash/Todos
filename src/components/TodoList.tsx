
import TodoItem from "./TodoItem.tsx";
import {ITodo} from "../types/todoTypes.ts";

type TodoListProps = {
    todos: ITodo[];
    remove: (item: ITodo) => void;
    onChange: (item: ITodo) => void;
}

const TodoList = ({todos, remove, onChange}: TodoListProps) => {
    return (
        <div>
            {todos.map(todo =>
                <TodoItem todo={todo} key={todo.id} remove={remove} onChange={onChange} />
            )}
        </div>
    );
};

export default TodoList;