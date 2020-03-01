"use strict";

import * as vscode from 'vscode';

const { CompletionItemBuilder } = require("../completionItemBuilder");
const { BaseExpressionTemplate } = require("./baseFunc");
const utils = require("../utils");

export class JsonFunc extends BaseExpressionTemplate {
    constructor(private keyword: string) {
        super();
    }

    applyItem(code: string, position: vscode.Position) {
        let lastComponent = utils.getLastComponent(code, position);
        let upCase = utils.capitalization(lastComponent);

        return CompletionItemBuilder
            .create(this.keyword + ' Json', lastComponent)
            .description(`create json built-in with ` + this.keyword)
            .insertText(upCase + ' ' + this.keyword + ' `json:\"' + lastComponent + '\"`')
            .deleteTextBeforeCursor(position, lastComponent.length + 1)
            .build();
    }
}

exports.build = () => [
    new JsonFunc(""),
    new JsonFunc("string"),
    new JsonFunc("int"),
    new JsonFunc("int64"),
    new JsonFunc("float32"),
    new JsonFunc("float64"),
    new JsonFunc("bool")
];