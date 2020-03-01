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

export class GinRouterFunc extends BaseExpressionTemplate {
    constructor(private keyword: string) {
        super();
    }

    applyItem(code: string, position: vscode.Position) {
        return CompletionItemBuilder
        .create('gin ' + this.keyword, code)
        .description('quick create ' + this.keyword + ' function')
        .replace(`r.${this.keyword}("{{expr}}", \${0:handle})`, position, true)
        .build();
    }
}

export class GinRouterHandle extends BaseExpressionTemplate {
    constructor(private keyword: string) {
        super();
    }

    applyItem(code: string, position: vscode.Position) {
        return CompletionItemBuilder
        .create('gin ' + this.keyword + ' handle', code)
        .description('quick create ' + this.keyword + ' handle')
        .replace(`r.${this.keyword}("{{expr}}", func(c *gin.Context) {\n${utils.getIndentCharacters()}\${0}\n}`, position, true)
        .build();
    }
}

exports.build = () => [
    new FuncTemplate('func', 'create no arg function', ''),
    new FuncTemplate('gin Context Func', 'create gin Context function', 'c *gin.Context'),
    new FuncTemplate('gin Router Func', 'create gin Engine function', 'router *gin.Engine'),
    new FuncTemplate('gin RouterGroup Func', 'create gin RouterGroup Func', 'r *gin.RouterGroup'),
    new GinRouterFunc('POST'),
    new GinRouterFunc('GET'),
    new GinRouterHandle('POST'),
    new GinRouterHandle('GET')
];