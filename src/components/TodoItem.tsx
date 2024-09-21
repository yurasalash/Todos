
import Button from "./UI/button/Button.tsx";
import {ITodo} from "../types/todoTypes.ts";

type TodoItemProps = {
    todo: ITodo;
    remove: (item: ITodo) => void;
    onChange: (item: ITodo) => void;
}

const TodoItem = ({todo, remove, onChange}: TodoItemProps) => {
    return (
        <div className='todoItem'>
            <div className="todoInfo">
                <h3 className={todo.completed ? 'no' : 'yes'}>{todo.title}</h3>
                <input onChange={() => onChange(todo)}
                       type="checkbox"
                       checked={todo.completed}
                />
            </div>
            <div className="todoBtns">
                <Button onClick={() => remove(todo)}>Delete</Button>
            </div>
        </div>
    );
};

export default TodoItem;