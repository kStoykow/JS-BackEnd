function errorParser(error) {

    if (error.name == 'ValidationError') {
        const err = [Object.fromEntries(Object.entries(error.errors).map(([field, props]) => ['msg', props.message]))];
        return err;

    } else if (Array.isArray(error)) {
        return error.reduce((a, b) => {
            a.push({ msg: b.msg })
            return a;
        }, []);

    } else {
        return [{ msg: error.message }];
    }
}

module.exports = {
    errorParser
}