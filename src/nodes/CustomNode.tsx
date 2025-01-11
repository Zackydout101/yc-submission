import React from "react";

interface CustomNodeProps {
  data: {
    label: string;
    shoeName: string;
    shoeSize: string;
    onShoeNameChange: (value: string) => void;
    onShoeSizeChange: (value: string) => void;
  };
}

const CustomNode: React.FC<CustomNodeProps> = ({ data }) => {
  return (
    <div
      style={{
        border: "1px solid black",
        padding: "10px",
        borderRadius: "5px",
        backgroundColor: "#f9f9f9",
        width: "200px",
      }}
    >
      <label style={{ fontWeight: "bold" }}>{data.label}</label>
      {/* Input field for shoe name */}
      <div style={{ marginTop: "10px" }}>
        <label>Shoe Name</label>
        <input
          type="text"
          value={data.shoeName}
          onChange={(e) => data.onShoeNameChange(e.target.value)}
          placeholder="Enter shoe name - Demo : HYDRO 5 SLIDE" 
          style={{
            width: "100%",
            padding: "5px",
            marginTop: "5px",
            borderRadius: "4px",
            border: "1px solid gray",
          }}
        />
      </div>
      {/* Input field for shoe size */}
      <div style={{ marginTop: "10px" }}>
        <label>Shoe Size</label>
        <input
          type="number"
          value={data.shoeSize}
          onChange={(e) => data.onShoeSizeChange(e.target.value)}
          placeholder="Enter shoe size - Demo: 9.5"
          style={{
            width: "100%",
            padding: "5px",
            marginTop: "5px",
            borderRadius: "4px",
            border: "1px solid gray",
          }}
        />
      </div>
    </div>
  );
};

export default CustomNode;
