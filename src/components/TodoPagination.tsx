
import {usePagination} from "../hooks/usePagination.ts";

type TodoPaginationProps = {
    totalPages: number;
    page: number;
    setPage: (page: number) => void;
}

const TodoPagination = ({totalPages, page, setPage}: TodoPaginationProps) => {
    const arr = usePagination(totalPages);
    return (
        <div className='pagination'>
            {arr.map((item) =>
                <span key={item} className={item === page ? 'pag active' : 'pag'} onClick={() => setPage(item)}>{item}</span>
            )}
        </div>
    );
};

export default TodoPagination;