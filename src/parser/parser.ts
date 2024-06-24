import { match } from "ts-pattern"
import type { Option } from "rustic"
import type { Token } from "../tokenizer"
import {
  ast_program,
  ast_literal_numeric,
  ast_literal_string,
  ast_identifier,
  ast_expression,
  ast_call_expression,
} from "./ast.ts"
import type { AstNode, AstProgramNode } from "./ast.ts"
import { peek, slice } from "../utils"
import { is_number, is_string, is_name, peek_until_matching_paren } from "./helpers"

type AstNodeMatcher = [Option<AstNode>, number]

function parse_unary_expression(tokens: Token[]): [AstNode, number] {
  const token = tokens[0]
  const [node, consumed] = match<Token>(token)
    .returnType<AstNodeMatcher>()
    .when(is_number, () => [ast_literal_numeric(parseInt(token.value)), 1])
    .when(is_string, () => [ast_literal_string(token.value), 1])
    .when(is_name, () => [ast_identifier(token.value), 1])
    .otherwise((token: Token) => {
      throw new Error(`parse_unary_expression: unexpected token ${JSON.stringify(token)}`)
    })
  return [node as AstNode, consumed]
}

function parse_binary_expression(tokens: Token[]): [AstNode, number] {
  const [left, consumed] = parse_unary_expression(tokens)
  const rest = slice(tokens, consumed)
  const operator = rest[0]
  if (operator && operator.type === "Operator") {
    const [right, right_consumed] = parse_binary_expression(slice(rest, 1))
    return [ast_expression(left, operator.value, right), consumed + right_consumed + 1]
  }
  return [left, consumed]
}

function parse_call_expression(tokens: Token[]): [AstNode, number] {
  const name = tokens[0].value
  const rest = slice(tokens, 2) // skip name, (
  const args: AstNode[] = []
  let args_token_count = peek_until_matching_paren(rest)
  let all_args_tokens = slice(rest, 0, args_token_count)
  let position = 0
  while (position < args_token_count) {
    const [node, consumed] = parse_expression(slice(all_args_tokens, position))
    position += consumed
    args.push(node)
  }
  return [ast_call_expression(ast_identifier(name), args), position + 3] // 3 is for name, (, )
}

function parse_expression(tokens: Token[]): [AstNode, number] {
  if (tokens[0].type === "Name" && peek(tokens)?.type === "ParenL") {
    return parse_call_expression(tokens)
  }
  return parse_binary_expression(tokens)
}

function parse_statement(tokens: Token[]): [AstNode, number] {
  // TODO check for keywords
  // do, for, function, class if, return, switch, throw, finally,
  // try, with, while, var, const, let, using, interface, type, enum, {
  // if none of above then it's expression statement
  return parse_expression(tokens)
}

function parse_body(tokens: Token[]): AstNode[] {
  const nodes: AstNode[] = []
  let position = 0
  while (position < tokens.length) {
    const [node, consumed] = parse_statement(slice(tokens, position))
    nodes.push(node)
    position += consumed
  }
  return nodes
}

function parser(tokens: Token[]): AstProgramNode {
  const ast = ast_program([])
  ast.body = parse_body(tokens)
  return ast
}

export { parser }
