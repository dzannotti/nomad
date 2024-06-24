import type { Token } from "../tokenizer"
import { first, peek } from "../utils"

function is_null(token?: Token): token is undefined {
  return token == null
}

function is_paren_left(token?: Token): boolean {
  if (is_null(token)) {
    return false
  }
  return token.type === "ParenL"
}

function is_paren_right(token?: Token): boolean {
  if (is_null(token)) {
    return false
  }
  return token.type === "ParenR"
}

function is_brace_left(token?: Token): boolean {
  if (is_null(token)) {
    return false
  }
  return token.type === "BraceL"
}

function is_brace_right(token?: Token): boolean {
  if (is_null(token)) {
    return false
  }
  return token.type === "BraceR"
}

function is_number(token?: Token): boolean {
  if (is_null(token)) {
    return false
  }
  return token.type === "Number"
}

function is_string(token?: Token): boolean {
  if (is_null(token)) {
    return false
  }
  return token.type === "String"
}

function is_name(token?: Token): boolean {
  if (is_null(token)) {
    return false
  }
  return token.type === "Name"
}

function is_operator(token?: Token): boolean {
  if (is_null(token)) {
    return false
  }
  return token.type === "Operator"
}

function is_simple(token?: Token): boolean {
  if (is_null(token)) {
    return false
  }
  return is_number(token) || is_string(token) || is_name(token)
}

function peek_until_matching_paren(tokens: Token[]): number {
  let count = 0
  let depth = 1
  while (count < tokens.length) {
    const token = tokens[count]
    if (is_paren_left(token)) {
      depth += 1
    }
    if (is_paren_right(token)) {
      depth -= 1
      if (depth === 0) {
        return count
      }
    }
    count += 1
  }
  return count
}

export {
  is_brace_left,
  is_brace_right,
  is_number,
  is_string,
  is_name,
  is_operator,
  is_simple,
  peek_until_matching_paren,
}
