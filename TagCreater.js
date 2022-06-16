import Tag from './Tag.js'

class TagCreater {
    constructor() {
        let _tags = []
        let _readonlyAll = false
        let _updateList = {
            isActual: true,
            add: [],
            delete: []
        }

        window.addEventListener('load', () => this.load = this.localStorage)
        window.addEventListener('unload', () => this.localStorage = this.tags)

        Object.defineProperty(this, "updateList", {
            get: function () {
                return Object.assign({}, _updateList);
            },
            set: function (isActual) {
                let updateList = this.updateList
                if (isActual) {
                    if (updateList.add.length > 0) {
                        updateList.add.forEach(item => _tags.push(item))
                        _updateList.add.length = 0
                    }
                    if (updateList.delete.length > 0) {
                        updateList.delete.forEach((item) => {
                            let index = this.findTagIndex(item);
                            if (index >= 0) _tags.splice(index, 1)
                        })
                        _updateList.delete.length = 0
                        _updateList.isActual = true
                    }

                } else {
                    _updateList.isActual = false
                }
            }
        })

        Object.defineProperty(this, "add", {
            set(val) {
                if (this.checkCondition('add')) {
                    if (this.checkValueTag(val)) {
                        const updateList = this.updateList
                        const tags = this.tags
                        let lastID;
                        if (updateList.add.length) {
                            lastID = updateList.add[updateList.add.length - 1].id
                        } else if (tags.length) {
                            lastID = tags[tags.length - 1].id
                        }
                        let id = lastID === undefined ? 0 : lastID + 1;

                        if (Array.isArray(val)) {
                            val.forEach((item) => {
                                let tag = new Tag(id, item)
                                _updateList.add.push(tag)
                                id++
                            })
                        } else {
                            let tag = new Tag(id, val)
                            _updateList.add.push(tag)
                        }

                        this.updateList = false
                    }
                }
            }
        })

        Object.defineProperty(this, "load", {
            set(arr) {
                arr.forEach((item) => {
                    let tag = new Tag(item.id, item.value, item._readonly)
                    _updateList.add.push(tag)
                })
                this.updateList = false
            }

        })

        Object.defineProperty(this, "delete", {
            set(id) {
                if (this.checkCondition("delete", id)) {
                    if (Array.isArray(id)) id.forEach(item => _updateList.delete.push(item))
                    else _updateList.delete.push(id)

                    this.updateList = false
                }
            }

        })

        Object.defineProperty(this, "tags", {
            get() {
                return [..._tags]
            }
        })

        Object.defineProperty(this, "isActual", {
            get() {
                return _updateList.isActual
            }
        })

        Object.defineProperty(this, "readonlyAll", {
            get() {
                return _readonlyAll
            },
            set(value) {
                _readonlyAll = value
            }
        })

        Object.defineProperty(this, "localStorage", {
            get() {
                return JSON.parse(localStorage.getItem('tags'))
            },
            set(value) {
                localStorage.setItem('tags', JSON.stringify(value))
            }
        })

    }

    findTagIndex(id) {
        return this.tags.findIndex(elem => elem.id == id);
    }

    checkCondition(action, id) {
        if (!this.readonlyAll) {
            if (action === 'delete') return !this.tags[this.findTagIndex(id)].readonly
            if (action === 'add') return true
        }
    }

    checkValueTag(value) {
        if (Array.isArray(value)) {
            return value.filter(item => checkString(item))
        } else if (typeof value === "string") {
            return checkString(value)
        }

        function checkString(val) {
            if (typeof val === "string") {
                let correctValue = val.trim()
                if (correctValue.length > 0) {
                    return correctValue
                } else return false
            } else return false
        }
    }

}

export default TagCreater