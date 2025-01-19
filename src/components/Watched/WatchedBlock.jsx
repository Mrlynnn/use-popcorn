import { Box } from "../Box";
import { Details } from "./Details";
import { WatchedItem } from "./WatchedItem";
import { Summary } from "./Summary";
import { List } from "../List";

export function WatchedBlock() {
  return (
    <Box>
      <Details />
      <Summary />
      <List>
        <WatchedItem />
      </List>
    </Box>
  );
}
