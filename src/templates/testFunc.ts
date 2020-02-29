"use strict";

import * as vscode from 'vscode';

const { CompletionItemBuilder } = require("../completionItemBuilder");
const { BaseExpressionTemplate } = require("./baseFunc");
const utils = require("../utils");

export class TestFunc extends BaseExpressionTemplate {

    applyItem(code: string, position: vscode.Position) {
        let lastComponent = utils.getLastComponent(code, position);
        let upCase = utils.capitalization(lastComponent);

        return CompletionItemBuilder
            .create('testFunc', lastComponent)
            .description('Test Function Create')
            .replace('func Test' + upCase + `(t *testing.T) {\n ${utils.getIndentCharacters()}\${0}\n}`, position, true)
            .deleteTextBeforeCursor(position, lastComponent.length + 1)
            .build();
    }
}

export class BenchmarkFunc extends BaseExpressionTemplate {

    applyItem(code: string, position: vscode.Position) {
        let lastComponent = utils.getLastComponent(code, position);
        let upCase = utils.capitalization(lastComponent);

        return CompletionItemBuilder
            .create('benchmarkFunc', lastComponent)
            .description('Benchmark Function Create')
            .replace('func Benchmark' + upCase + `(b *testing.B) {\n ${utils.getIndentCharacters()}\${0}\n}`, position, true)
            .deleteTextBeforeCursor(position, lastComponent.length + 1)
            .build();
    }
}

exports.build = () => [
    new TestFunc(),
    new BenchmarkFunc()
];
