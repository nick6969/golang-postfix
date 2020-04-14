"use strict";

import * as vscode from 'vscode';

const { CompletionItemBuilder } = require("../completionItemBuilder");
const { BaseExpressionTemplate } = require("./baseFunc");

export class ErrorFunc extends BaseExpressionTemplate {

    shouldApplyItem(code: string): boolean {
        // code.length >= 3, is pass the case ".
        if (code.length >= 3 && code.startsWith(`"`) && code.endsWith(`".`)) {
            return true;
        }
        return false;
    }

    applyItem(code: string, position: vscode.Position) {
        let replacement = '{{expr}}';

        return CompletionItemBuilder
            .create('error', code)
            .description(`errors.New("Error Message")`)
            .replace(`errors.New(${replacement})`, position, true)
            .build();
    }
}

exports.build = () => new ErrorFunc();