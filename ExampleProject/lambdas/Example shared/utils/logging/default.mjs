class DefaultLogger {
    constructor() {
        this.list = []
    }
    log(message) {
        this.list.push({ level: "Info", message }) 
    }
    warn(message) {
        this.list.push({ level: "Warn", message }) 
    }
    error(message) {
        this.list.push({ level: "Error", message }) 
    }
}

export default DefaultLogger
