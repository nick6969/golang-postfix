"use strict";

import * as vscode from 'vscode';

const { CompletionItemBuilder } = require("../completionItemBuilder");
const { BaseExpressionTemplate } = require("./baseFunc");


export class IsEmptyFunc extends BaseExpressionTemplate {

    applyItem(code: string, position: vscode.Position) {

        return CompletionItemBuilder
            .create('isEmpty', code)
            .description(`len(expr) == 0`)
            .replace(`len({{expr}}) == 0`, position, true)
            .build();
    }
}

export class IsNotEmptyFunc extends BaseExpressionTemplate {

    applyItem(code: string, position: vscode.Position) {

        return CompletionItemBuilder
            .create('isNotEmpty', code)
            .description(`len(expr) != 0`)
            .replace(`len({{expr}}) != 0`, position, true)
            .build();
    }
}

exports.build = () => [
    new IsEmptyFunc(),
    new IsNotEmptyFunc()
];