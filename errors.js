const WhootError = (err) => {
    if (err.stack && err.message) {
        console.log('iserror');
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