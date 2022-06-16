class Tag {
    constructor(id, value, readonly) {
        this.id = id
        this.value = value
        this._readonly = readonly || false
    }

    get readonly() {
        return this._readonly
    }

    set readonly(value) {
        if (value === true || value === false)
            this._readonly = value
    }
}

export default Tag