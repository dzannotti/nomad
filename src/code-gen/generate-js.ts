import type {
  AstProgramNode,
  AstCallExpressionNode,
  AstExpressionNode,
  AstLiteralNumericNode,
  AstLiteralStringNode,
} from "../parser"
import { traverse } from "../transformer/traverse"
import { is_call_expression } from "../transformer/helpers"

function generate_js(ast: AstProgramNode): string {
  let output: string = ""
  traverse(ast, {
    CallExpression: {
      enter(node, parent) {
        const call_node = node as AstCallExpressionNode
        if (is_call_expression(parent) && parent.args[0] != node) {
          output += ", "
        }

        output += `${call_node.callee.name}(`
      },
      exit(node) {
        output += ")"
      },
    },
    LiteralNumeric: {
      enter(node, parent) {
        const literal_node = node as AstLiteralNumericNode
        if (is_call_expression(parent) && parent.args[0] != node) {
          output += ", "
        }

        output += literal_node.value
      },
    },
    LiteralString: {
      enter(node, parent) {
        const literal_node = node as AstLiteralStringNode
        if (is_call_expression(parent) && parent.args[0] != node) {
          output += ", "
        }
        output += `"${literal_node.value}"`
      },
    },
    Expression: {
      enter(node, parent) {
        const expression_node = node as AstExpressionNode
        const lhs = expression_node.left as AstLiteralNumericNode
        if (is_call_expression(parent) && parent.args[0] != node) {
          output += ", "
        }
        output += `${lhs.value}${expression_node.operator}`
      },
    },
  })
  return output
}

export { generate_js }
