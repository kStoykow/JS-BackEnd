const errorParser = (error) => {
    if (error instanceof Error) {
        return Object.values(error.errors)[0].message;
    }

    return error;
};

module.exports = errorParser;