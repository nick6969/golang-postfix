'use strict';

import * as vscode from 'vscode';
import * as glob from 'glob';
import { NPostfixTemplate } from './template';

let currentSuggestion: string;

export class PostfixCompletionProvider implements vscode.CompletionItemProvider {

    private templates: NPostfixTemplate[] = [];

    constructor() {
        this.loadBuiltinTemplates();
    }

    provideCompletionItems(
        document: vscode.TextDocument, 
        position: vscode.Position, 
        token: vscode.CancellationToken, 
        context: vscode.CompletionContext): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList> {

        let line = document.lineAt(position.line);
        let dotIdx = line.text.lastIndexOf('.', position.character);

        if (dotIdx === -1) {
            return [];
        }

        let code = line.text.substring(line.firstNonWhitespaceCharacterIndex);

        const commentIndex = line.text.indexOf('//');
        if (commentIndex >= 0 && position.character > commentIndex) {
            return [];
        }

        let suffix = line.text.substring(dotIdx + 1, position.character);

        return this.templates.filter(t => t.shouldApplyItem(code)).map(t => t.applyItem(code, position, suffix));
    }

    resolveCompletionItem?(item: vscode.CompletionItem, token: vscode.CancellationToken): vscode.ProviderResult<vscode.CompletionItem> {
        currentSuggestion = item.label;
        return item;
    }

    private loadBuiltinTemplates = () => {
        let files = glob.sync('./templates/*.js', { cwd: __dirname });
        files.forEach(path => {
            let builder: () => NPostfixTemplate | NPostfixTemplate[] = require(path).build;
            if (builder) {
                let templates = builder();
                if (Array.isArray(templates)) {
                    this.templates.push(...templates);
                } else {
                    this.templates.push(templates);
                }
            }
        });
    };
}

export const getCurrentSuggestion = () => currentSuggestion;
