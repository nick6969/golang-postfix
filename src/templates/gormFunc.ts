"use strict";

import * as vscode from 'vscode';

const { CompletionItemBuilder } = require("../completionItemBuilder");
const { BaseExpressionTemplate } = require("./baseFunc");
const utils = require("../utils");

export class GormFunc extends BaseExpressionTemplate {
  constructor(private keyword: string, private value: string, private type: string) {
    super();
  }

  applyItem(code: string, position: vscode.Position) {
    let lastComponent = utils.getLastComponent(code, position);
    let upCase = utils.capitalization(lastComponent);
    let end = `\"\`\n`;
    return CompletionItemBuilder
      .create(this.keyword + ' gorm', lastComponent)
      .description(`create gorm built-in with ` + this.keyword)
      .replace(upCase + ' ' + this.value + ' `gorm:\"column:' + lastComponent + this.type + end, position, true)
      .deleteTextBeforeCursor(position, lastComponent.length + 1)
      .build();
  }
}

exports.build = () => [
  new GormFunc("varchar", "string", ";type:varchar(\${0:number})"),
  new GormFunc("varchar not null", "string", ";type:varchar(\${0:number});not null"),
  new GormFunc("text", "string", ";sql:type:text"),
  new GormFunc("text not null", "string", ";sql:type:text;not null"),
  new GormFunc("bool default 0", "bool", ";DEFAULT:0;not null"),
  new GormFunc("bool default 1", "bool", ";DEFAULT:1;not null"),
  new GormFunc("bool", "bool", ""),
  new GormFunc("decimal", "decimal.Decimal", ";type:decimal(\${1:10},\${0:2})"),
  new GormFunc("json", "[]byte", ";type:json"),
  new GormFunc("time", "time.Time", ""),
];