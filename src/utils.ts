"use strict";

import * as vscode from 'vscode';
const vsc = require("vscode");


export function getLastComponent(code: string, position: vscode.Position): string {
    const dotIdx = code.lastIndexOf('.', position.character);
    const input = code.substr(0, dotIdx);
    if (input.length === 0) {
        return '';
    }
    let lastComponent = '';
    for (let i = 0; i < input.length; i++) {
        let character = input.substr(input.length - i - 1, 1);
        if (!character.match(/[a-zA-Z0-9_\(\)\[\]\.]/)) {
            return lastComponent;
        }
        lastComponent = character + lastComponent;
    }
    return lastComponent;
}

export function capitalization(code: string): string {
    if (code.length === 0) {
        return '';
    }
    if (code.length === 1) {
        return code.toUpperCase();
    }
    return code.charAt(0).toUpperCase() + code.substring(1).toLowerCase();
}

export function getIndentCharacters(): string {
    if (vsc.window.activeTextEditor.options.insertSpaces) {
        return ' '.repeat(vsc.window.activeTextEditor.options.tabSize);
    }
    else {
        return '\t';
    }
};