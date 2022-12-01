function errorParser(error) {

    if (error.name == 'ValidationError') {
        const err = [Object.fromEntries(Object.entries(error.errors).map(([field, props]) => [field, props.message]))];
        return err;
        //TODO : make errors equal
    } else if (Array.isArray(error)) {

    } else {
        return [{ msg: error.message }];
    }
}

module.exports = {
    errorParser
}