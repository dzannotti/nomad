type AstNodeType =
  | "Program"
  | "LiteralNumeric"
  | "LiteralString"
  | "Identifier"
  | "Expression"
  | "CallExpression"

interface AstNode {
  type: string
}

interface AstProgramNode extends AstNode {
  type: "Program"
  body: AstNode[]
}

interface AstLiteralStringNode extends AstNode {
  type: "LiteralString"
  value: string
}

interface AstLiteralNumericNode extends AstNode {
  type: "LiteralNumeric"
  value: number
}

interface AstIdentifierNode extends AstNode {
  type: "Identifier"
  name: string
}

interface AstExpressionNode extends AstNode {
  type: "Expression"
  left: AstNode
  right: AstNode
  operator: string
}

interface AstCallExpressionNode extends AstNode {
  type: "CallExpression"
  callee: AstIdentifierNode
  args: AstNode[]
}

function ast_program(body: AstNode[]): AstProgramNode {
  return {
    type: "Program",
    body,
  }
}

function ast_literal_numeric(value: number): AstLiteralNumericNode {
  return {
    type: "LiteralNumeric",
    value,
  }
}

function ast_literal_string(value: string): AstLiteralStringNode {
  return {
    type: "LiteralString",
    value,
  }
}

function ast_identifier(name: string): AstIdentifierNode {
  return {
    type: "Identifier",
    name,
  }
}

function ast_expression(lhs: AstNode, operator: string, rhs: AstNode): AstExpressionNode {
  return {
    type: "Expression",
    operator,
    left: lhs,
    right: rhs,
  }
}

function ast_call_expression(name: AstIdentifierNode, args: AstNode[]): AstCallExpressionNode {
  return {
    type: "CallExpression",
    callee: name,
    args,
  }
}

export {
  ast_program,
  ast_literal_numeric,
  ast_literal_string,
  ast_identifier,
  ast_expression,
  ast_call_expression,
}
export type {
  AstNode,
  AstNodeType,
  AstProgramNode,
  AstIdentifierNode,
  AstLiteralStringNode,
  AstLiteralNumericNode,
  AstExpressionNode,
  AstCallExpressionNode,
}
