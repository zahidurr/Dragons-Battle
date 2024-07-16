import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";

interface BattleProps {
  dragon1: { id: number } | null;
  dragon2: { id: number } | null;
  setDragon1Id: (id: number) => void;
  setDragon2Id: (id: number) => void;
  handleBattle: () => void;
  winner: string | null;
}

const Battle: React.FC<BattleProps> = ({
  dragon1,
  dragon2,
  setDragon1Id,
  setDragon2Id,
  handleBattle,
  winner,
}) => {
  return (
    <Box mt={4}>
      <Typography variant="h4" gutterBottom>
        Battle
      </Typography>
      <TextField
        label="Dragon 1 ID"
        type="number"
        onChange={(e) => setDragon1Id(Number(e.target.value))}
        margin="normal"
      />
      <TextField
        label="Dragon 2 ID"
        type="number"
        onChange={(e) => setDragon2Id(Number(e.target.value))}
        margin="normal"
      />
      <Box mt={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleBattle}
          disabled={!dragon1 || !dragon2}
        >
          Start Battle
        </Button>
      </Box>
      {winner && (
        <Box mt={4}>
          <Typography variant="h5">Winner: {winner}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default Battle;
