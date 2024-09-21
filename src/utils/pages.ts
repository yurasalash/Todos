export const countTotalPages = (limit = 10, totalCount) => {
    return Math.ceil(totalCount / limit)
}