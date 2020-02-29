'use strict';

import * as vscode from 'vscode';
import { PostfixCompletionProvider } from './postfixCompletionProvider';

let completionProvider: vscode.Disposable;

export function activate(context: vscode.ExtensionContext) {
	registerCompletionProvider(context);

	context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(() => {
		if (completionProvider) {
			let idx = context.subscriptions.indexOf(completionProvider);
			context.subscriptions.splice(idx, 1);
			completionProvider.dispose();
		}
		registerCompletionProvider(context);
	}));
}

export function deactivate() { }

function registerCompletionProvider(context: vscode.ExtensionContext) {
	const provider = new PostfixCompletionProvider();

	let documentSelector: vscode.DocumentSelector = { scheme: 'file', language: 'go' };
	completionProvider = vscode.languages.registerCompletionItemProvider(documentSelector, provider, '.');
	context.subscriptions.push(completionProvider);
}

