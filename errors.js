const WhootError = (err) => {
  if (err.stack && err.message) {
    return {
      error: {
        message: err.message
      }
    }
  }
  return {
    error: {
      message: err
    }
  }
}

module.exports = { WhootError }
