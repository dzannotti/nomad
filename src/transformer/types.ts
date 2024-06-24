import type { AstNode, AstNodeType } from "../parser/index.ts"

type Transformer = Partial<Record<AstNodeType, Visitor>>

type VisitorTransformer = (node: AstNode, parent?: AstNode) => void

type VisitorWithEnter = { enter: VisitorTransformer }
type VisitorWithExit = { exit: VisitorTransformer }
type VisitorWithEnterAndExit = { enter: VisitorTransformer; exit: VisitorTransformer }

type Visitor = VisitorWithEnter | VisitorWithExit | VisitorWithEnterAndExit

function has_enter(visitor: Visitor): visitor is VisitorWithEnter | VisitorWithEnterAndExit {
  return "enter" in visitor
}

function has_exit(visitor: Visitor): visitor is VisitorWithExit | VisitorWithEnterAndExit {
  return "exit" in visitor
}

export { has_enter, has_exit }

export type { Transformer, VisitorTransformer, Visitor }
