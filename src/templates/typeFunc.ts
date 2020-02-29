"use strict";

import * as vscode from 'vscode';

const { CompletionItemBuilder } = require("../completionItemBuilder");
const { BaseExpressionTemplate } = require("./baseFunc");
const utils = require("../utils");

export class TypeFunc extends BaseExpressionTemplate {
    constructor(private keyword: string) {
        super();
    }

    applyItem(code: string, position: vscode.Position) {
        return CompletionItemBuilder
            .create(this.keyword, code)
            .description(`type expr ${this.keyword}`)
            .replace(`type {{expr}} ${this.keyword} {\n${utils.getIndentCharacters()}\${0}\n}`, position, true)
            .build();
    }
}

exports.build = () => [
    new TypeFunc(`struct`),
    new TypeFunc(`interface`)
];
