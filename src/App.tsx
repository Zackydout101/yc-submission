import React, { useCallback, useState } from "react";
import {
  ReactFlow,
  Background,
  addEdge,
  useNodesState,
  useEdgesState,
  type OnConnect,
  type NodeMouseHandler,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import { initialNodes, nodeTypes } from "./nodes";
import { initialEdges, edgeTypes } from "./edges";
import { RunButton } from "./components/RunButton";
import { RunReportPanel } from "./components/RunReportPanel";
import { Logo } from "./components/Logo";
import { AppNode } from "./nodes/types";
import CustomModal from "./components/CustomModal";
import axios from "axios";

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [logMessages, setLogMessages] = useState<string[]>([]); // State to store logs

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState<AppNode | null>(null);

  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((edges) => addEdge(connection, edges)),
    [setEdges]
  );

  const onNodeClick: NodeMouseHandler = useCallback(
    (event, node) => {
      setSelectedNode(node as AppNode);
      setIsModalOpen(true);
    },
    []
  );

  const handleSave = useCallback(
    (inputData: string) => {
      if (selectedNode) {
        // Store data locally
        localStorage.setItem(`node-${selectedNode.id}`, inputData);

        // Update node data
        setNodes((nds) =>
          nds.map((n) => {
            if (n.id === selectedNode.id) {
              return {
                ...n,
                data: {
                  ...n.data,
                  inputData, 
                },
              } as AppNode;
            }
            return n;
          })
        );

      //  alert(`Data for node ${selectedNode.id} saved!`);
      }

      setIsModalOpen(false);
    },
    [selectedNode, setNodes]
  );

  

  const getModalContent = () => {
    if (!selectedNode) return { title: "", placeholder: "" };

    switch (selectedNode.data.label) {
      case "Select Website - Demo: nrml.ca":
        return { title: "Enter Website URL - Demo: nrml.ca", placeholder: "e.g., https://example.com" };
      case "Select Shoe":
        return { title: "Enter Shoe Name", placeholder: "e.g., Nike Air Max" };
      case "Selection Method":
        return { title: "Enter Selection Method", placeholder: "e.g., Random, First Come First Serve" };
      default:
        return { title: "Enter Data", placeholder: "e.g., Custom Input" };
    }
  };

  const { title, placeholder } = getModalContent();

  const openNewLinkWithFeatures = (url: string) => {
    if (url) {
      window.open(
        url,
        "_blank",
        "width=800,height=600,scrollbars=yes,resizable=yes"
      ); 
    } else {
      console.error("URL is required to open a new link.");
    }
  };



  const handleIterate = useCallback(async () => {

    const newLogMessages: string[] = []; // Explicitly declare the type as string[]
    
    nodes.forEach((node) => {
      const log = `Node ID: ${node.id}, Label: ${node.data.label}, InputData: ${node.data.inputData || "No data"}`;
      newLogMessages.push(log);
      console.log(log);
    });
  
    
  

    const any = true;
    const size = nodes[2].data.inputData;
    const website = nodes[0].data.inputData;
    const category = "/collections/footwear";
    const many = 5000;
    const keyword =  nodes[1].data.inputData;
  
    const site2020 = `https://${website}${category}/products.json?limit=${many}`;
  
    const buyAsync = async (id: string) => {
      
  
      const parameters = {
        id: id,
        quantity: "1",
      };
      newLogMessages.push("Launching Site");

      openNewLinkWithFeatures("https://"+website+"/cart/"+id+":1");
  

    };
  
    const main = async () => {
      try {
        
        const response = await axios.get(site2020, {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36",
          },
        });
  
        const details = response.data;
        
        let stop = false;
  
        for (const key in details) {
        
          const products = details[key];
          const productList = Array.isArray(products) ? products : [];
          
          for (let i = 0; i < productList.length && !stop; i++) {
            const product = productList[i];
            console.log(product);
            if (JSON.stringify(product).includes(keyword || "")) {

            
              const variants = product.variants || [];
  
              for (let j = 0; j < variants.length && !stop; j++) {
                const variant = variants[j];
                newLogMessages.push("Found Product");
  
                if (!any) {
                  if (variant.option1 === size) {
                    if (!variant.available) {
                      const outOfStockLog = `Out Of Stock for Product ID: ${product.id}`;
                      newLogMessages.push(outOfStockLog);
                      console.log(outOfStockLog);
                      stop = true;
                    } else {
                      const foundLog = `Found Product ID: ${product.id}`;
                      newLogMessages.push(foundLog);
                      console.log(foundLog);
                      await buyAsync(variant.id);
                      stop = true;
                    }
                  }
                } else {
                  if (variant.available) {
                    const availableLog = `Available Product ID: ${product.id}`;
                    newLogMessages.push(availableLog);
                    console.log(availableLog);
                    await buyAsync(variant.id);
                    stop = true;

                  }
                }
              }
            }
          }
        }
      } catch (error: any) {
        const fetchErrorLog = `Error fetching products: ${error.message}`;
        newLogMessages.push(fetchErrorLog);
        console.error(fetchErrorLog);
      }
    };
  
    
    await main();
  
    setLogMessages(newLogMessages);
    setIsPanelOpen(true);
  }, [nodes, edges, setLogMessages, setIsPanelOpen]);
  
  
  
  

  

  return (
    <div style={{ height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        edges={edges}
        edgeTypes={edgeTypes}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        fitView
      >
        <Background />
        <Logo />
        <RunButton
          onRun={handleIterate}
          onPanelOpen={() => setIsPanelOpen(true)} // Set panel open when the button is clicked
        />
      <RunReportPanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)}>
        {logMessages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </RunReportPanel>

      </ReactFlow>
      <CustomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        defaultValue={selectedNode ? localStorage.getItem(`node-${selectedNode.id}`) || "" : ""}
        title={title}
        placeholder={placeholder}
      />
     
    </div>
  );
}
