const formatPagination = (query) => {
  return {
    offset: query.offset ? +query.offset : undefined,
    count: query.count ? +query.count : undefined
  }
}

module.exports = {
  formatPagination
}