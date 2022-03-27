import { Stack, Text, Image } from "@chakra-ui/react";

import logo from "../assets/aerolab-logo.svg";
import coinIcon from "../assets/icons/coin.svg";

function App(): JSX.Element {
  return (
    <div className="App">
      <Stack
        as="nav"
        boxShadow="md"
        direction="row"
        justify="space-between"
        paddingBlock={2}
        paddingInline={4}
        width="full"
      >
        <img alt="Aerolab's logo" height="35px" src={logo} width="35px" />
        <Stack>
          <Text>John Kite</Text>
          <Stack align="center" direction="row">
            <Text>600</Text>
            <Image alt="A coin icon" height="20px" src={coinIcon} width="20px" />
          </Stack>
        </Stack>
      </Stack>
    </div>
  );
}

export default App;
