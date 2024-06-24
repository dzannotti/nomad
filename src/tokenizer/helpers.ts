function is_whitespace(char: string) {
  return char === " " || char === "\t" || char == ","
}

function is_number(char: string) {
  return char >= "0" && char <= "9"
}

function is_paren_left(char: string) {
  return char === "("
}

function is_paren_right(char: string) {
  return char === ")"
}

function is_brace_left(char: string) {
  return char === "{"
}

function is_brace_right(char: string) {
  return char === "}"
}

function is_quote(char: string) {
  return char === '"'
}

function is_letter(char: string) {
  const allowed_characters = ["_"]
  return (
    (char >= "a" && char <= "z") ||
    (char >= "A" && char <= "Z") ||
    allowed_characters.includes(char)
  )
}

function is_eol(char: string) {
  return char === "\n" || char === "\r\n"
}

function is_operator(char: string) {
  return ["+", "-", "*", "/", "%"].includes(char)
}

export {
  is_whitespace,
  is_number,
  is_paren_left,
  is_paren_right,
  is_brace_left,
  is_brace_right,
  is_quote,
  is_eol,
  is_letter,
  is_operator,
}
