'use strict';

import * as vscode from 'vscode';

const COMPLETION_ITEM_TITLE = 'Postfix templates';

export class CompletionItemBuilder {

    public static create = (keyword: string, code: string) => new CompletionItemBuilder(keyword, code);

    private item: vscode.CompletionItem;

    constructor(private keyword: string, private code: string) {
        this.item = new vscode.CompletionItem(keyword, vscode.CompletionItemKind.Snippet);
        this.item.detail = COMPLETION_ITEM_TITLE;
    }

    public command = (command: vscode.Command) => {
        this.item.command = command;
        return this;
    };

    public insertText = (insertText?: string) => {
        this.item.insertText = insertText;
        return this;
    };

    public description = (description: string): CompletionItemBuilder => {
        this.item.documentation = description;
        return this;
    };

    public build = () => this.item;

    public deleteTextBeforeCursor = (position: vscode.Position, length: number) => {
        this.item.additionalTextEdits = [
            vscode.TextEdit.delete(new vscode.Range(position.translate(0, -length), position))
        ];
        return this;
    };

    public replace = (replacement: string, position: vscode.Position, useSnippets?: boolean): CompletionItemBuilder => {
        const dotIdx = this.code.lastIndexOf('.');
        const codeBeforeTheDot = this.code.substr(0, dotIdx);

        if (useSnippets) {
            const escapedCode = codeBeforeTheDot.replace('$', '\\$');

            this.item.insertText = new vscode.SnippetString(replacement.replace(new RegExp('{{expr}}', 'g'), escapedCode));
        } else {
            this.item.insertText = replacement.replace(new RegExp('{{expr}}', 'g'), codeBeforeTheDot);
        }

        this.item.additionalTextEdits = [
            vscode.TextEdit.delete(new vscode.Range(position.translate(0, -codeBeforeTheDot.length - 1), position))
        ];

        return this;
    };

}