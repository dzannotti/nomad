import type { AstCallExpressionNode, AstExpressionNode, AstNode } from "../parser/index.ts"

function is_call_expression(node?: AstNode): node is AstCallExpressionNode {
  if (!node) {
    return false
  }
  return node.type === "CallExpression"
}

function is_expression(node: AstNode): node is AstExpressionNode {
  return node.type === "Expression"
}

export { is_call_expression, is_expression }
