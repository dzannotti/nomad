import { match } from "ts-pattern"

import type { Token } from "./token"
import {
  is_whitespace,
  is_number,
  is_paren_left,
  is_paren_right,
  is_brace_left,
  is_brace_right,
  is_quote,
  is_letter,
  is_eol,
  is_operator,
} from "./helpers"

import {
  tokenize_whitespace,
  tokenize_number,
  tokenize_paren_left,
  tokenize_paren_right,
  tokenize_brace_left,
  tokenize_brace_right,
  tokenize_string,
  tokenize_letter,
  tokenize_eol,
  tokenize_operator,
} from "./tokenize"

import { slice, is_not_null } from "../utils.ts"

import type { TokenMatcher } from "./tokenize"

function tokenizer(source: string) {
  const tokens: Token[] = []
  let position = 0
  while (position < source.length) {
    const char = source[position]
    const rest = slice(source, position)
    const rest_skip = slice(rest, 1)
    const [token, consumed] = match<string>(char)
      .returnType<TokenMatcher>()
      .when(is_whitespace, tokenize_whitespace)
      .when(is_eol, tokenize_eol)
      .when(is_number, tokenize_number(rest))
      .when(is_paren_left, tokenize_paren_left)
      .when(is_paren_right, tokenize_paren_right)
      .when(is_brace_left, tokenize_brace_left)
      .when(is_brace_right, tokenize_brace_right)
      .when(is_quote, tokenize_string(rest_skip))
      .when(is_letter, tokenize_letter(rest))
      .when(is_operator, tokenize_operator)
      .otherwise((char: string) => {
        throw new Error(`tokenizer: unexpected character ${char}`)
      })

    match(token).when(is_not_null, (token: Token) => tokens.push(token))
    position += consumed
  }
  return tokens
}

export { tokenizer }
