function assert(statement, message) {
    if(!statement) {
        if (message == null) {
            message = '';
        }
        throw new Error('assert was false ' + message);
    }
}
