import { List, ListItem, ListItemText, Paper, Typography } from "@mui/material";
import React from "react";

interface Dragon {
  id: number;
  name: string;
  strength: number;
}

interface DragonListProps {
  dragons: Dragon[];
  selectDragon: (dragon: Dragon) => void;
  selectedDragon: Dragon | null;
  label: string;
}

const DragonList: React.FC<DragonListProps> = ({
  dragons,
  selectDragon,
  selectedDragon,
  label,
}) => {
  return (
    <Paper elevation={3}>
      <Typography variant="h6" gutterBottom>
        {label}
      </Typography>
      <List>
        {dragons.map((dragon) => (
          <ListItem
            key={dragon.id}
            button
            selected={selectedDragon?.id === dragon.id}
            onClick={() => selectDragon(dragon)}
          >
            <ListItemText
              primary={`${dragon.name} (Strength: ${dragon.strength})`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default DragonList;
