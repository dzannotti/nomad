import { describe, it, expect } from "vitest"
import { parser } from "./parser"
// import { tokenizer } from "../tokenizer"
import type { Token } from "../tokenizer"

describe("parser", () => {
  it("should parse an empty source", () => {
    //let source = ""
    let tokens = [] as Token[]
    let ast = parser(tokens)
    expect(ast).toEqual({
      body: [],
      type: "Program",
    })
  })

  it("should number tokens", () => {
    // let source = "123"
    let tokens = [{ type: "Number", value: "123" }] as Token[]
    let ast = parser(tokens)
    expect(ast.body).toEqual([
      {
        type: "LiteralNumeric",
        value: 123,
      },
    ])
  })

  it("should parse string tokens", () => {
    // let source = '"hello"'
    let tokens = [{ type: "String", value: "hello" }] as Token[]
    let ast = parser(tokens)
    expect(ast.body).toEqual([
      {
        type: "LiteralString",
        value: "hello",
      },
    ])
  })

  it("should parse name tokens", () => {
    // let source = "hello"
    let tokens = [{ type: "Name", value: "hello" }] as Token[]
    let ast = parser(tokens)
    expect(ast.body).toEqual([
      {
        type: "Identifier",
        name: "hello",
      },
    ])
  })

  it("should parse a simple expression", () => {
    // let source = "12 + 23 - 34 "
    let tokens = [
      { type: "Number", value: "12" },
      { type: "Operator", value: "+" },
      { type: "Number", value: "23" },
      { type: "Operator", value: "-" },
      { type: "Number", value: "34" },
    ] as Token[]
    let ast = parser(tokens)
    expect(ast.body).toEqual([
      {
        type: "Expression",
        operator: "+",
        left: {
          type: "LiteralNumeric",
          value: 12,
        },
        right: {
          type: "Expression",
          operator: "-",
          left: {
            type: "LiteralNumeric",
            value: 23,
          },
          right: {
            type: "LiteralNumeric",
            value: 34,
          },
        },
      },
    ])
  })

  it("should parse a simple function call", () => {
    // let source = "add()"
    let tokens = [
      { type: "Name", value: "add" },
      { type: "ParenL", value: "(" },
      { type: "ParenR", value: ")" },
    ] as Token[]
    let ast = parser(tokens)
    expect(ast.body).toEqual([
      {
        type: "CallExpression",
        callee: {
          type: "Identifier",
          name: "add",
        },
        args: [],
      },
    ])
  })

  it("should parse a function call with params", () => {
    // let source = "add(12, 23)"
    let tokens = [
      { type: "Name", value: "add" },
      { type: "ParenL", value: "(" },
      { type: "Number", value: "12" },
      { type: "Number", value: "23" },
      { type: "ParenR", value: ")" },
    ] as Token[]
    let ast = parser(tokens)
    expect(ast.body).toEqual([
      {
        type: "CallExpression",
        callee: {
          type: "Identifier",
          name: "add",
        },
        args: [
          {
            type: "LiteralNumeric",
            value: 12,
          },
          {
            type: "LiteralNumeric",
            value: 23,
          },
        ],
      },
    ])
  })

  it("should parse a function call with operation in  call params", () => {
    // let source = "add(12, 23-45, 55)"
    let tokens = [
      { type: "Name", value: "add" },
      { type: "ParenL", value: "(" },
      { type: "Number", value: "12" },
      { type: "Number", value: "23" },
      { type: "Operator", value: "-" },
      { type: "Number", value: "45" },
      { type: "Number", value: "55" },
      { type: "ParenR", value: ")" },
    ] as Token[]
    let ast = parser(tokens)
    expect(ast.body).toEqual([
      {
        type: "CallExpression",
        callee: { type: "Identifier", name: "add" },
        args: [
          { type: "LiteralNumeric", value: 12 },
          {
            type: "Expression",
            operator: "-",
            left: { type: "LiteralNumeric", value: 23 },
            right: { type: "LiteralNumeric", value: 45 },
          },
          { type: "LiteralNumeric", value: 55 },
        ],
      },
    ])
  })

  it("should parse a function call with nested call params", () => {
    // let source = "add(12, add(23, 45), 55)"
    let tokens = [
      { type: "Name", value: "add" },
      { type: "ParenL", value: "(" },
      { type: "Number", value: "12" },
      { type: "Name", value: "add" },
      { type: "ParenL", value: "(" },
      { type: "Number", value: "23" },
      { type: "Number", value: "45" },
      { type: "ParenR", value: ")" },
      { type: "Number", value: "55" },
      { type: "ParenR", value: ")" },
    ] as Token[]
    let ast = parser(tokens)
    expect(ast.body).toEqual([
      {
        type: "CallExpression",
        callee: { type: "Identifier", name: "add" },
        args: [
          { type: "LiteralNumeric", value: 12 },
          {
            type: "CallExpression",
            callee: { type: "Identifier", name: "add" },
            args: [
              { type: "LiteralNumeric", value: 23 },
              { type: "LiteralNumeric", value: 45 },
            ],
          },
          { type: "LiteralNumeric", value: 55 },
        ],
      },
    ])
  })
})
