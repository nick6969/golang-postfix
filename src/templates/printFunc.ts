"use strict";

import * as vscode from 'vscode';

const { CompletionItemBuilder } = require("../completionItemBuilder");
const { BaseExpressionTemplate } = require("./baseFunc");

export class PrintFunc extends BaseExpressionTemplate {
    applyItem(code: string, position: vscode.Position) {
        return CompletionItemBuilder
            .create('print', code)
            .description(`fmt.Println(expr)`)
            .replace(`fmt.Println(\${0:{{expr}}})`, position, true)
            .build();
    }
}

export class PrintFormatFunc extends BaseExpressionTemplate {
    applyItem(code: string, position: vscode.Position) {
        return CompletionItemBuilder
            .create('print format', code)
            .description(`fmt.Printf("%+v'\\n", expr)`)
            .replace(`fmt.Printf("%+v\\n", \${0:{{expr}}})`, position, true)
            .build();
    }
}

exports.build = () => [
    new PrintFunc(),
    new PrintFormatFunc()
];
