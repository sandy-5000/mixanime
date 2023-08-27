export const getpages = async (current, last) => {
    let pages = [1, last, current, Math.max(current - 1, 1), Math.min(current + 1, last)]
    pages = [...new Set(pages)]
    pages.sort((a, b) => a - b)
    let i = 1
    while (i < pages.length) {
        if (pages[i - 1] + 1 != pages[i]) {
            pages.splice(i, 0, '...');
            i += 1
        }
        i += 1
    }
    return pages
}