"use strict";

import * as vscode from 'vscode';

const { CompletionItemBuilder } = require("../completionItemBuilder");
const { BaseExpressionTemplate } = require("./baseFunc");
const utils = require("../utils");

export class FuncTemplate extends BaseExpressionTemplate {

    constructor(private keyword: string, private description: string, private arg: string) {
        super();
    }

    applyItem(code: string, position: vscode.Position) {

        return CompletionItemBuilder
            .create(this.keyword, code)
            .description(this.description)
            .replace(`func {{expr}}(${this.arg}) {\n${utils.getIndentCharacters()}\${0}\n}`, position, true)
            .build();
    }

}

exports.build = () => [
    new FuncTemplate('gin Context Func', 'create gin Context function', 'c *gin.Context'),
    new FuncTemplate('gin Router Func', 'create gin Engine function', 'r *gin.Engine')
];