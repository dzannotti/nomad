import type { Option } from "rustic"

import type { Token } from "./token"
import {
  token_number,
  token_paren_left,
  token_paren_right,
  token_brace_left,
  token_brace_right,
  token_string,
  token_name,
  token_eol,
  token_operator,
} from "./token"
import { peek_while, peek_until } from "../utils.ts"
import { is_number, is_quote, is_letter } from "./helpers"

type TokenMatcher = [Option<Token>, number]
type Tokenizer = () => TokenMatcher

function tokenize_whitespace(): TokenMatcher {
  return [null, 1]
}

function tokenize_number(source: string): Tokenizer {
  return () => {
    let count = peek_while(is_number, source)
    let number = source.substring(0, count)
    return [token_number(number), count]
  }
}

function tokenize_paren_left(): TokenMatcher {
  return [token_paren_left(), 1]
}

function tokenize_paren_right(): TokenMatcher {
  return [token_paren_right(), 1]
}

function tokenize_brace_left(): TokenMatcher {
  return [token_brace_left(), 1]
}

function tokenize_brace_right(): TokenMatcher {
  return [token_brace_right(), 1]
}

function tokenize_string(source: string): Tokenizer {
  return () => {
    let count = peek_until(is_quote, source)
    let symbol = source.substring(0, count)
    return [token_string(symbol), count + 2]
  }
}

function tokenize_letter(source: string): Tokenizer {
  return () => {
    let count = peek_while(is_letter, source)
    let number = source.substring(0, count)
    return [token_name(number), count]
  }
}

function tokenize_eol(): TokenMatcher {
  return [token_eol(), 1]
}

function tokenize_operator(character: string): TokenMatcher {
  return [token_operator(character), 1]
}

export {
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
}

export type { Tokenizer, TokenMatcher }
