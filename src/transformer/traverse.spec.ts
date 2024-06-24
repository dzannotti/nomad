import { describe, it, expect } from "vitest"
import type {
  AstCallExpressionNode,
  AstProgramNode,
  AstLiteralNumericNode,
  AstLiteralStringNode,
} from "../parser"
import type { Transformer } from "./types"
import { traverse } from "./traverse"

describe("traverse", () => {
  it("should travel to all the nodes in the tree and reverse the math", () => {
    const ast: AstProgramNode = {
      type: "Program",
      body: [
        {
          type: "CallExpression",
          callee: {
            type: "Identifier",
            name: "add",
          },
          args: [
            { type: "LiteralNumeric", value: 12 } as AstLiteralNumericNode,
            { type: "LiteralNumeric", value: 6 } as AstLiteralNumericNode,
          ],
        } as AstCallExpressionNode,
      ],
    }

    const visitor: Transformer = {
      CallExpression: {
        enter(node) {
          const call_node = node as AstCallExpressionNode
          if (call_node.callee.name === "add") {
            call_node.callee.name = "subtract"
          }
        },
      },
      LiteralNumeric: {
        exit(node) {
          const literal_node = node as AstLiteralNumericNode
          literal_node.value = literal_node.value * 2
        },
      },
    }

    traverse(ast, visitor)
    const call_node = ast.body[0] as AstCallExpressionNode
    expect(call_node.callee.name).toBe("subtract")
    expect((call_node.args[0] as AstLiteralStringNode).value).toBe(24)
  })
})
