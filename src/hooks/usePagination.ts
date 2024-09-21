import {useMemo} from "react";

export const usePagination = (totalPages: number) => {
    const pages: number[] = useMemo(() => {
        const arr = []
        for (let i = 0; i < totalPages; i++) {
            arr.push(i + 1)
        }
        return arr
    }, [totalPages]);

    return pages
}