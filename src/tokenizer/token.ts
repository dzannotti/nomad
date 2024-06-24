type TokenType =
  | "Number"
  | "ParenL"
  | "ParenR"
  | "String"
  | "Name"
  | "BraceL"
  | "BraceR"
  | "EOL"
  | "Operator"

interface Token {
  type: TokenType
  value: string
}

function token_number(value: string): Token {
  return { type: "Number", value }
}

function token_paren_left(): Token {
  return { type: "ParenL", value: "(" }
}

function token_paren_right(): Token {
  return { type: "ParenR", value: ")" }
}

function token_string(value: string): Token {
  return { type: "String", value }
}

function token_name(value: string): Token {
  return { type: "Name", value }
}

function token_brace_left(): Token {
  return { type: "BraceL", value: "{" }
}

function token_brace_right(): Token {
  return { type: "BraceR", value: "}" }
}

function token_eol(): Token {
  return { type: "EOL", value: "" }
}

function token_operator(value: string): Token {
  return { type: "Operator", value }
}

export {
  token_number,
  token_paren_left,
  token_paren_right,
  token_string,
  token_name,
  token_brace_left,
  token_brace_right,
  token_eol,
  token_operator,
}

export type { Token, TokenType }
