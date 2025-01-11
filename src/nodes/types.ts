import type { Node, BuiltInNode } from "@xyflow/react";
import CustomNode from "./CustomNode.tsx";

// Extend BuiltInNode to include `inputData`
export interface ExtendedBuiltInNode extends BuiltInNode {
  data: {
    label: string;
    inputData?: string; // Add optional inputData field
  };
}

// Extend FunctionNode to include `inputData`
export type FunctionNode = Node<{
  label: string;
  func?: (input: any) => any;
  functionName: string;
  inputData?: string; // Optional input data field
}, "function-node">;

export const nodeTypes = {
  custom: CustomNode, // Register the custom node type
};


// AppNode can be either an ExtendedBuiltInNode or FunctionNode
export type AppNode = ExtendedBuiltInNode | FunctionNode;
