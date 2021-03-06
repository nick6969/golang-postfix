"use strict";

import * as vscode from 'vscode';

const { CompletionItemBuilder } = require("../completionItemBuilder");
const { BaseExpressionTemplate } = require("./baseFunc");

export class PrintFunc extends BaseExpressionTemplate {
    applyItem(code: string, position: vscode.Position) {
        let replacement = '{{expr}}';
        return CompletionItemBuilder
            .create('print', code)
            .description(`fmt.Println(expr)`)
            .replace(`fmt.Println(${replacement})`, position, true)
            .build();
    }
}

export class PrintFormatFunc extends BaseExpressionTemplate {
    applyItem(code: string, position: vscode.Position) {
        let replacement = '{{expr}}';
        return CompletionItemBuilder
            .create('print format', code)
            .description(`fmt.Printf("%+v'\\n", expr)`)
            .replace(`fmt.Printf("%+v\\n", ${replacement})`, position, true)
            .build();
    }
}

export class LogFunc extends BaseExpressionTemplate {
    applyItem(code: string, position: vscode.Position) {
        let replacement = '{{expr}}';
        return CompletionItemBuilder
            .create('log', code)
            .description(`log.Println(expr)`)
            .replace(`log.Println(${replacement})`, position, true)
            .build();
    }
}

export class LogFormatFunc extends BaseExpressionTemplate {

    applyItem(code: string, position: vscode.Position) {
        let replacement = '{{expr}}';
        return CompletionItemBuilder
            .create('log format', code)
            .description(`log.Printf("%+v'\\n", expr)`)
            .replace(`log.Printf("%+v\\n", ${replacement})`, position, true)
            .build();
    }
}

exports.build = () => [
    new PrintFunc(),
    new PrintFormatFunc(),
    new LogFunc(),
    new LogFormatFunc()
];
