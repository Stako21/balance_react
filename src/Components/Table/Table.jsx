import React, { useState } from "react";

export const Table = ({ data }) => {
  const [visibility, setVisibility] = useState({});

  const toggleVisibility = (id) => {
    setVisibility((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderTable = (data, level = 0, parentId = "") => {
    return (
      <tbody>
        {data.map((item, index) => {
          const itemId = `${parentId}-${index}`;
          const isVisible = visibility[itemId] ?? true;

          return (
            <React.Fragment key={itemId}>
              <tr>
                <td style={{ paddingLeft: `${level * 5}px`, }}>
                  {item.children && item.children.length > 0 && (
                    <button onClick={() => toggleVisibility(itemId)}>
                      {isVisible ? "-" : "+"}
                    </button>
                  )}
                  {item.level}
                </td>
                <td>{item.columns.join(", ")}</td>
              </tr>
              {isVisible && item.children && item.children.length > 0 && (
                renderTable(item.children, level + 1, itemId)
              )}
            </React.Fragment>
          );
        })}
      </tbody>
    );
  };

  return (
    <table>
      {renderTable(data)}
    </table>
  );
};
