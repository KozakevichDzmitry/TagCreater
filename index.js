"use strict"
import Controller from "./Controller.js";
import TagCreater from "./TagCreater.js";
import ViewTag from "./ViewTag.js";

const tagCreater = new TagCreater()
const controller = new Controller('#inputControl', '#btnAddTag', 'tag__btn-close', '#tagsArea', '#btnReadOnlyAll', 'readonly', tagCreater)
const viewTag = new ViewTag(tagCreater, '#tagsArea')
