import { Stack, Text, Image, Select, Button, Box, Grid } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import logo from "../assets/aerolab-logo.svg";
import coinIcon from "../assets/icons/coin.svg";
import banner from "../assets/header-x5.jpg";

interface Product {
  category: string;
  cost: number;
  img: {
    hdUrl: string;
    url: string;
  };
  name: string;
  _id: string;
}

const reqBody = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjQwYjFjOTMxNGQ5YzAwMWE1ODc3MGYiLCJpYXQiOjE2NDg0MDY5ODV9.Vgr8e4wbiY9MsgrDdOe_9-cUMjOCKqv-0oVrVb7iGxk",
  },
};

function App(): JSX.Element {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetch(`https://coding-challenge-api.aerolab.co/products`, reqBody)
      .then((data) => data.json())
      .then((data) => setProducts(data));
  }, []);

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
          <Stack align="center" direction="row" gap={1} spacing={0}>
            <Text>600</Text>
            <Image alt="A coin icon" height="20px" src={coinIcon} width="20px" />
          </Stack>
        </Stack>
      </Stack>

      <Stack as="header">
        <Image
          align="start"
          alt="Blue banner with headset"
          height="300px"
          objectFit="cover"
          src={banner}
          width="full"
        />
      </Stack>

      <Stack as="main">
        <Stack direction="row" justify="space-between">
          <Text>16 of 32 products</Text>
          <Select width="fit-content">
            <option>Most Recent</option>
            <option>Lowest Price</option>
            <option>Highest Price</option>
          </Select>
        </Stack>

        <Stack spacing={4}>
          {products.map((product) => (
            <Stack
              key={product._id}
              align="center"
              cursor="pointer"
              height="fit-content"
              id="card"
              paddingBlock={2}
              paddingInline={4}
              position="relative"
              width="fit-content"
            >
              <Stack
                _hover={{ opacity: 1 }}
                bg="rgba(64, 201, 245, 0.8)"
                height="full"
                id="overlay"
                justify="center"
                opacity={0}
                placeItems="center"
                position="absolute"
                spacing={10}
                transition="0.1s all ease-in-out"
                width="full"
              >
                <Stack align="center" flexDirection="row" spacing={0}>
                  <Text fontSize={52}>12,0000</Text>
                  <Image height="50px" src={coinIcon} width="50px" />
                </Stack>
                <Button borderRadius="full" textColor="blackAlpha.700" width="80%">
                  Redeem now
                </Button>
              </Stack>

              <Image
                align="center"
                alt={`Image of ${product.name}`}
                height="300px"
                objectFit="cover"
                src={product.img.url}
                width="300px"
              />
              <Text fontSize="16px" textColor="blackAlpha.600">
                {product.category}
              </Text>
              <Text>{product.name}</Text>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </div>
  );
}

export default App;
