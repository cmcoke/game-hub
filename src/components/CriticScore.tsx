import { Badge } from "@chakra-ui/react";

interface Props {
  score: number;
}

const CriticScore = ({ score }: Props) => {
  // defines the color of the badge depending on the score that is given to a game
  let color = score > 75 ? "green" : score > 60 ? "yellow" : "";

  return (
    <Badge fontSize="14px" paddingX={2} borderRadius="4px" colorScheme={color}>
      {score}
    </Badge>
  );
};
export default CriticScore;
