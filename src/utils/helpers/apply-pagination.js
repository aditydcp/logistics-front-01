export function applyPagination(documents, page, rowsPerPage) {
  return documents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}

export function getPageItemLimit(pageNumber, rowsPerPage) {
  return {
    start: pageNumber * rowsPerPage,
    end: pageNumber * rowsPerPage + rowsPerPage
  }
}