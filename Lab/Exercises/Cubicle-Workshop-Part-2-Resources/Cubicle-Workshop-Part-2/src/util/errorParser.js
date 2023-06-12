
const errorParser = (error) => {
    if (error instanceof Error) {
        let e = Object.values(error.errors)[0].message;
        console.log(e)
        return e

    }
    return error;
};

module.exports = errorParser;