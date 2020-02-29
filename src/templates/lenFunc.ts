"use strict";

import * as vscode from 'vscode';

const { CompletionItemBuilder } = require("../completionItemBuilder");
const { BaseExpressionTemplate } = require("./baseFunc");

export class LenFunc extends BaseExpressionTemplate {

    applyItem(code: string, position: vscode.Position) {
        let replacement = '{{expr}}';

        return CompletionItemBuilder
            .create('len', code)
            .description('len(expr)')
            .replace(`len(${replacement})`, position, true)
            .build();
    }
}

exports.build = () => new LenFunc();