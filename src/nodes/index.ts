import type { NodeTypes } from "@xyflow/react";
import { AppNode } from "./types";

export const initialNodes: AppNode[] = [
  {
    id: "a",
    type: "input",
    position: { x: 0, y: 0 },
    data: { label: "Website - Demo: nrml.ca", inputData: "" },
  },
  {
    id: "b",
    type: "default",
    position: { x: 100, y: 100 },
    data: { label: "Name of Shoe - Demo: HYDRO 5 SLIDE", inputData: "" },
  },
  {
    id: "c",
    type: "default", 
    position: { x: 200, y: 200 },
    data: { label: "Shoe Size - Demo: 9.5", inputData: "" },
  }
];

export const nodeTypes = {
  
} satisfies NodeTypes;
