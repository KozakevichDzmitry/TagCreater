class Controller {
    constructor(input, btnAdd, btnDelete, tagBox, btnReadOnlyAll, btnReadOnly, model) {
        Object.defineProperty(this, "_model", {
            value: model,
            writable: false,
            configurable: false,
        })
        let inputElem = document.querySelector(input)
        document.querySelector(tagBox).addEventListener('click', mutateTag.bind(this))
        document.querySelector(btnAdd).addEventListener('click', addTag.bind(this))
        document.querySelector(btnReadOnlyAll).addEventListener('change', readonlyAll.bind(this))


        function mutateTag(e) {
            if (e.target.classList.contains(btnDelete)) {
                let id = e.target.parentElement.id.split('-')[1]
                let result = this._model.delete = id

            } else if (e.target.classList.contains(btnReadOnly)) {
                let id = e.target.parentElement.id.split('-')[1]
                this._model.tags[this._model.findTagIndex(id)].readonly = e.target.checked
            }
        }

        function addTag() {
            let inputValue = inputElem.value.trim()
            let result = (this._model.add = inputValue)
            inputElem.value = ''

        }

        function readonlyAll(e) {
            this._model.readonlyAll = e.currentTarget.checked

        }
    }
}

export default Controller