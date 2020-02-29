"use strict";

import * as vscode from 'vscode';

const { CompletionItemBuilder } = require("../completionItemBuilder");
const { BaseExpressionTemplate } = require("./baseFunc");

export class AppendFunc extends BaseExpressionTemplate {

    applyItem(code: string, position: vscode.Position) {

        return CompletionItemBuilder
            .create('append', code)
            .description(`expr = append(expr, ...)`)
            .replace(`{{expr}} = append({{expr}}, \${0:element})`, position, true)
            .build();
    }
}

exports.build = () => new AppendFunc();