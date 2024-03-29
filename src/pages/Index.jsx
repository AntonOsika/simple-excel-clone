import React, { useState } from "react";
import { Box, Table, Thead, Tbody, Tr, Th, Td, IconButton, Input, Flex } from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";

import { Button } from "@chakra-ui/react";

const Index = () => {
  const [data, setData] = useState([[""]]);
  const [selectedCell, setSelectedCell] = useState(null);
  const [isRefMode, setIsRefMode] = useState(false);

  const addRow = () => {
    setData([...data, new Array(data[0].length).fill("")]);
  };

  const addColumn = () => {
    setData(data.map((row) => [...row, ""]));
  };

  const updateCell = (rowIndex, colIndex, value) => {
    const newData = [...data];
    newData[rowIndex][colIndex] = value;
    setData(newData);
  };

  const deleteRow = (rowIndex) => {
    if (data.length > 1) {
      const newData = [...data];
      newData.splice(rowIndex, 1);
      setData(newData);
    }
  };

  const setReference = (rowIndex, colIndex) => {
    if (isRefMode && selectedCell) {
      updateCell(selectedCell.row, selectedCell.col, `=${String.fromCharCode(65 + colIndex)}${rowIndex + 1}`);
      setSelectedCell(null);
      setIsRefMode(false);
    } else {
      setSelectedCell({ row: rowIndex, col: colIndex });
      setIsRefMode(true);
    }
  };

  const deleteColumn = (colIndex) => {
    if (data[0].length > 1) {
      const newData = data.map((row) => {
        const newRow = [...row];
        newRow.splice(colIndex, 1);
        return newRow;
      });
      setData(newData);
    }
  };

  return (
    <Box p={5}>
      <Flex justify="space-between" mb={2}>
        <IconButton aria-label="Add row" icon={<FaPlus />} onClick={addRow} />
        <IconButton aria-label="Add column" icon={<FaPlus />} onClick={addColumn} />
      </Flex>
      <Table variant="simple">
        <Thead>
          <Tr>
            {data[0].map((_, colIndex) => (
              <Th key={colIndex}>
                <IconButton aria-label="Delete column" size="xs" icon={<FaTrash />} onClick={() => deleteColumn(colIndex)} />
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row, rowIndex) => (
            <Tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <Td key={colIndex}>
                  <Flex>
                    <Input value={cell} onChange={(e) => updateCell(rowIndex, colIndex, e.target.value)} placeholder={`${String.fromCharCode(65 + colIndex)}${rowIndex + 1}`} type="number" />
                    <Button size="xs" onClick={() => setReference(rowIndex, colIndex)} isDisabled={!isRefMode && selectedCell !== null && (selectedCell.row !== rowIndex || selectedCell.col !== colIndex)}>
                      Ref
                    </Button>
                  </Flex>
                </Td>
              ))}
              <Td>
                <IconButton aria-label="Delete row" size="xs" icon={<FaTrash />} onClick={() => deleteRow(rowIndex)} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Index;
