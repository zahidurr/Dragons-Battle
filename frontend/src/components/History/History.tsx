import { Box, Typography } from "@mui/material";
import React from "react";

interface HistoryProps {
  history: string[];
}

const History: React.FC<HistoryProps> = ({ history }) => {
  return (
    <Box>
      <Typography variant="h5">Battle History</Typography>
      {history.length === 0 ? (
        <Typography>No battles yet</Typography>
      ) : (
        <ul>
          {history.map((entry, index) => (
            <li key={index}>{entry}</li>
          ))}
        </ul>
      )}
    </Box>
  );
};

export default History;
