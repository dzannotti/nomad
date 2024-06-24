import { describe, it, expect } from "vitest"
import { generate_js } from "./generate-js"
import type {
  AstCallExpressionNode,
  AstExpressionNode,
  AstLiteralNumericNode,
  AstLiteralStringNode,
  AstProgramNode,
} from "../parser"

describe("generate-js", () => {
  it("should parse an empty source", () => {
    //let source = ""
    const ast: AstProgramNode = {
      type: "Program",
      body: [],
    }
    let out = generate_js(ast)
    expect(out).toBe("")
  })

  it("should number tokens", () => {
    // let source = "123"
    let ast: AstProgramNode = {
      type: "Program",
      body: [
        {
          type: "LiteralNumeric",
          value: 123,
        } as AstLiteralNumericNode,
      ],
    }
    let out = generate_js(ast)
    expect(out).toBe("123")
  })

  it("should parse string tokens", () => {
    // let source = '"hello"'
    let ast: AstProgramNode = {
      type: "Program",
      body: [
        {
          type: "LiteralString",
          value: "hello",
        } as AstLiteralStringNode,
      ],
    }
    let out = generate_js(ast)
    expect(out).toBe('"hello"')
  })

  it("should parse a simple expression", () => {
    // let source = "12 + 23 - 34 "
    let ast: AstProgramNode = {
      type: "Program",
      body: [
        {
          type: "Expression",
          operator: "+",
          left: {
            type: "LiteralNumeric",
            value: 12,
          } as AstLiteralNumericNode,
          right: {
            type: "Expression",
            operator: "-",
            left: {
              type: "LiteralNumeric",
              value: 23,
            } as AstLiteralNumericNode,
            right: {
              type: "LiteralNumeric",
              value: 34,
            } as AstLiteralNumericNode,
          },
        } as AstExpressionNode,
      ],
    }
    let out = generate_js(ast)
    expect(out).toBe("12+23-34")
  })

  it("should parse a simple function call", () => {
    // let source = "add()"
    let ast: AstProgramNode = {
      type: "Program",
      body: [
        {
          type: "CallExpression",
          callee: {
            type: "Identifier",
            name: "add",
          },
          args: [],
        } as AstCallExpressionNode,
      ],
    }
    let out = generate_js(ast)
    expect(out).toBe("add()")
  })

  it("should parse a function call with params", () => {
    // let source = "add(12, 23)"
    let ast: AstProgramNode = {
      type: "Program",
      body: [
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
            } as AstLiteralNumericNode,
            {
              type: "LiteralNumeric",
              value: 23,
            } as AstLiteralNumericNode,
          ],
        } as AstCallExpressionNode,
      ],
    }
    let out = generate_js(ast)
    expect(out).toBe("add(12, 23)")
  })

  it("should parse a function call with operation in  call params", () => {
    // let source = "add(12, 23-45, 55)"
    let ast: AstProgramNode = {
      type: "Program",
      body: [
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
            } as AstExpressionNode,
            { type: "LiteralNumeric", value: 55 },
          ],
        } as AstCallExpressionNode,
      ],
    }
    let out = generate_js(ast)
    expect(out).toBe("add(12, 23-45, 55)")
  })
  it("should parse a function call with nested call params", () => {
    // let source = "add(12, add(23, 45), 55)"
    let ast: AstProgramNode = {
      type: "Program",
      body: [
        {
          type: "CallExpression",
          callee: { type: "Identifier", name: "add" },
          args: [
            { type: "LiteralNumeric", value: 12 },
            {
              type: "CallExpression",
              callee: { type: "Identifier", name: "add" },
              args: [
                { type: "LiteralNumeric", value: 23 } as AstLiteralNumericNode,
                { type: "LiteralNumeric", value: 45 } as AstLiteralNumericNode,
              ],
            } as AstCallExpressionNode,
            { type: "LiteralNumeric", value: 55 },
          ],
        } as AstCallExpressionNode,
      ],
    }
    let out = generate_js(ast)
    expect(out).toBe("add(12, add(23, 45), 55)")
  })
})
