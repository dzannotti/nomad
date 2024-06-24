import type { AstNode, AstNodeType, AstProgramNode } from "../parser/index.ts"
import { has_enter, has_exit } from "./types.ts"
import type { Transformer } from "./types.ts"
import { is_call_expression, is_expression } from "./helpers.ts"

type TraverseNode = {
  node: AstNode
  parent?: AstNode
  visitor: Transformer
}

type TraverseArray = {
  array: AstNode[]
  parent?: AstNode
  visitor: Transformer
}

const traverse_node = ({ node, parent, visitor }: TraverseNode) => {
  const node_type = node.type as AstNodeType
  const methods = visitor[node_type]

  if (methods && has_enter(methods)) {
    methods.enter(node, parent)
  }

  if (is_call_expression(node) && node.args.length) {
    traverse_array({ array: node.args, parent: node, visitor })
  }

  if (is_expression(node)) {
    traverse_node({ node: node.right, parent: node, visitor })
  }

  if (methods && has_exit(methods)) {
    methods.exit(node, parent)
  }
}

const traverse_array = ({ array, parent, visitor }: TraverseArray) => {
  array.forEach((node) => {
    traverse_node({ node, parent, visitor })
  })
}

const traverse = (node: AstProgramNode, visitor: Transformer) => {
  traverse_array({ array: node.body, visitor })
}

export { traverse }
