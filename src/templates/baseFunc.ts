'use strict';

import * as vscode from 'vscode';
import { NPostfixTemplate } from '../template';

export abstract class BaseTemplate implements NPostfixTemplate {
    abstract applyItem(code: string, position: vscode.Position, suffix: string): vscode.CompletionItem;
    abstract shouldApplyItem(code: string): boolean;
}

export abstract class BaseExpressionTemplate extends BaseTemplate {
    shouldApplyItem(code: string): boolean {
        // if no text before .
        if (code === ".") {
            return false;
        }
        return true;
    }
}