import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import DragonList from "./components/DragonList";
import History from "./components/History";
import Probability from "./components/Probability";
import {
  getDragons,
  getHistory,
  getProbability,
  startBattle,
} from "./services/api";

interface Dragon {
  id: number;
  name: string;
  strength: number;
}

const App: React.FC = () => {
  const [dragons, setDragons] = useState<Dragon[]>([]);
  const [dragon1, setDragon1] = useState<Dragon | null>(null);
  const [dragon2, setDragon2] = useState<Dragon | null>(null);
  const [winner, setWinner] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [probability, setProbability] = useState<{
    dragon1Probability: number;
    dragon2Probability: number;
  } | null>(null);

  useEffect(() => {
    getDragons()
      .then((response) => setDragons(response.data))
      .catch((error) => console.error("Error fetching dragons:", error));

    getHistory()
      .then((response) => setHistory(response.data))
      .catch((error) => console.error("Error fetching history:", error));
  }, []);

  const handleBattle = () => {
    if (dragon1 && dragon2) {
      startBattle(dragon1.id, dragon2.id)
        .then((response) => setWinner(response.data.winner))
        .catch((error) => console.error("Error initiating battle:", error));
    }
  };

  const calculateProbability = () => {
    if (dragon1 && dragon2) {
      getProbability(dragon1.id, dragon2.id)
        .then((response) => setProbability(response.data))
        .catch((error) =>
          console.error("Error calculating probability:", error)
        );
    }
  };

  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        Battle of Dragons
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <DragonList
            dragons={dragons}
            selectDragon={setDragon1}
            selectedDragon={dragon1}
            label="Select Dragon 1"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <DragonList
            dragons={dragons}
            selectDragon={setDragon2}
            selectedDragon={dragon2}
            label="Select Dragon 2"
          />
        </Grid>
      </Grid>
      <Box mt={4}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleBattle}
          disabled={!dragon1 || !dragon2}
        >
          Start Battle
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={calculateProbability}
          disabled={!dragon1 || !dragon2}
          style={{ marginLeft: "10px" }}
        >
          Calculate Probability
        </Button>
      </Box>
      {winner && (
        <Box mt={4}>
          <Typography variant="h4">Winner: {winner}</Typography>
        </Box>
      )}
      {probability && (
        <Probability
          dragon1Name={dragon1?.name || ""}
          dragon2Name={dragon2?.name || ""}
          dragon1Probability={probability.dragon1Probability}
          dragon2Probability={probability.dragon2Probability}
        />
      )}
      <Box mt={4}>
        <History history={history} />
      </Box>
    </Container>
  );
};

export default App;
