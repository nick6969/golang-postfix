"use strict";

import * as vscode from 'vscode';

const { CompletionItemBuilder } = require("../completionItemBuilder");
const { BaseExpressionTemplate } = require("./baseFunc");
const utils = require("../utils");

export class IfFunc extends BaseExpressionTemplate {

    applyItem(code: string, position: vscode.Position) {
        let replacement = '{{expr}}';

        return CompletionItemBuilder
            .create('if', code)
            .description(`if expr`)
            .replace(`if ${replacement} {\n${utils.getIndentCharacters()}\${0}\n}`, position, true)
            .build();
    }
}

export class ElseFunc extends BaseExpressionTemplate {

    applyItem(code: string, position: vscode.Position) {
        let replacement = '{{expr}}';

        return CompletionItemBuilder
            .create('else', code)
            .description(`if (!expr)`)
            .replace(`if !${replacement} {\n${utils.getIndentCharacters()}\${0}\n}`, position, true)
            .build();
    }
}

export class IfEqualityFunc extends BaseExpressionTemplate {
    constructor(private keyword: string, private operator: string, private operand: string) {
        super();
    }

    applyItem(code: string, position: vscode.Position) {
        return CompletionItemBuilder
            .create(this.keyword, code)
            .description(`if expr ${this.operator} ${this.operand}`)
            .replace(`if {{expr}} ${this.operator} ${this.operand} {\n${utils.getIndentCharacters()}\${0}\n}`, position, true)
            .build();
    }
}

export const build = () => [
    new IfFunc(),
    new ElseFunc(),
    new IfEqualityFunc('nil', '==', 'nil'),
    new IfEqualityFunc('not nil', '!=', 'nil')
];