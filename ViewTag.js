class ViewTag {
    constructor(model, tagArea) {
        Object.defineProperty(this, "_model", {
            value: model,
            writable: false,
            configurable: false,
        })
        this.tagArea = document.querySelector(tagArea)
        this.checkActual()

    }

    createTag(obj) {
        let tag = document.createElement('div');
        tag.classList.add('tag')
        tag.id = `tag-${obj.id}`
        tag.innerHTML = `
                <input type="checkbox" class="readonly" ${obj._readonly ? 'checked' : ''}>
                <p class="tag__text">${obj.value}</p>
                <button id="btnDeleteTag" class="tag__btn-close"></button>`
        return tag
    }

    addHTMLTag() {
        this._model.updateList.add.forEach(obj => this.tagArea.appendChild(this.createTag(obj)))
    }

    deleteHTMLTag() {
        this._model.updateList.delete.forEach(id => document.querySelector(`#tag-${id}`).remove())
    }

    checkActual() {
        if (!this._model.isActual) {
            this.addHTMLTag()
            this.deleteHTMLTag()
            this._model.updateList = true
        }
        window.requestAnimationFrame(() => this.checkActual())
    }
}

export default ViewTag