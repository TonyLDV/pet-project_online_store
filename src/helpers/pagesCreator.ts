export function createPages(
  pages: any[],
  pagesCount: number,
  currentPage: number
) {
  if (pagesCount > 8) {
    if (currentPage > 5) {
      for (let i = currentPage - 4; i <= currentPage + 4; i++) {
        pages.push(i);
        if (i == pagesCount) break;
      }
    } else {
      for (let i = 1; i <= 8; i++) {
        pages.push(i);
        if (i == pagesCount) break;
      }
    }
  } else {
    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
    }
  }
}
