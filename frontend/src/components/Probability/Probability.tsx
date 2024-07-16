import { Box, Typography } from "@mui/material";
import React from "react";

interface ProbabilityProps {
  dragon1Name: string;
  dragon2Name: string;
  dragon1Probability: number;
  dragon2Probability: number;
}

const Probability: React.FC<ProbabilityProps> = ({
  dragon1Name,
  dragon2Name,
  dragon1Probability,
  dragon2Probability,
}) => {
  return (
    <Box mt={4}>
      <Typography variant="h5">Winning Probability</Typography>
      <Typography>
        {dragon1Name}: {dragon1Probability.toFixed(2)}%
      </Typography>
      <Typography>
        {dragon2Name}: {dragon2Probability.toFixed(2)}%
      </Typography>
    </Box>
  );
};

export default Probability;
