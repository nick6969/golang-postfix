"use strict";

import * as vscode from 'vscode';

const { CompletionItemBuilder } = require("../completionItemBuilder");
const { BaseExpressionTemplate } = require("./baseFunc");

export class ForRangeFunc extends BaseExpressionTemplate {

    applyItem(code: string, position: vscode.Position) {
        return CompletionItemBuilder
            .create('for range', code)
            .description('for index := range objects')
            .replace(`for \${1:index} := range \${3:{{expr}}} {\n\${0}\n}`, position, true)
            .build();
    }
}

export class ForFunc extends BaseExpressionTemplate {

    applyItem(code: string, position: vscode.Position) {
        return CompletionItemBuilder
            .create('for', code)
            .description('for index, element := range objects')
            .replace(`for \${1:index}, \${2:element} := range \${3:{{expr}}} {\n\${0}\n}`, position, true)
            .build();
    }
}

exports.build = () => [
    new ForRangeFunc(),
    new ForFunc()
];
