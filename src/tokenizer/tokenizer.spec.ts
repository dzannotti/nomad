import { describe, it, expect } from "vitest"
import { tokenizer } from "./tokenizer"

describe("tokenizer", () => {
  it("should parse an empty source", () => {
    expect(tokenizer("")).toEqual([])
  })

  it("should ignore whitespace", () => {
    expect(tokenizer("   ")).toEqual([])
  })

  it("should parse number tokens", () => {
    expect(tokenizer("12")).toEqual([{ type: "Number", value: "12" }])
  })

  it("should parse multiple numbers", () => {
    expect(tokenizer("12 34")).toEqual([
      { type: "Number", value: "12" },
      { type: "Number", value: "34" },
    ])
  })

  it("should parse parentheses", () => {
    expect(tokenizer("()")).toEqual([
      { type: "ParenL", value: "(" },
      { type: "ParenR", value: ")" },
    ])
  })

  it("should parse strings", () => {
    expect(tokenizer('"foo"')).toEqual([{ type: "String", value: "foo" }])
  })

  it("should parse newlines as EOL", () => {
    expect(tokenizer("\n")).toEqual([{ type: "EOL", value: "" }])
  })

  it("should parse names", () => {
    expect(tokenizer("foo")).toEqual([{ type: "Name", value: "foo" }])
  })

  it("should parse curly braces", () => {
    expect(tokenizer("{}")).toEqual([
      { type: "BraceL", value: "{" },
      { type: "BraceR", value: "}" },
    ])
  })

  it("should parse a mix of tokens", () => {
    expect(tokenizer('12 (foo)\n "bar"')).toEqual([
      { type: "Number", value: "12" },
      { type: "ParenL", value: "(" },
      { type: "Name", value: "foo" },
      { type: "ParenR", value: ")" },
      { type: "EOL", value: "" },
      { type: "String", value: "bar" },
    ])
  })
})
