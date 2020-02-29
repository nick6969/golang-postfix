
import * as vscode from 'vscode';

export interface NPostfixTemplate {
    shouldApplyItem(code: string): boolean
    applyItem(code: string, position: vscode.Position, suffix: string): vscode.CompletionItem
}