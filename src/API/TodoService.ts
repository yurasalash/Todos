import axios from "axios";
import {ITodo} from "../types/todoTypes.ts";

export default class TodoService {
    static async getAll(page: number) {
        const response = axios.get<ITodo[]>('https://jsonplaceholder.typicode.com/todos?_limit=10&_page=' + page)
        return response
    }
}