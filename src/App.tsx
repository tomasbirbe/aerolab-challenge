import { Stack, Text, Image, Select, Button, SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import api from "../api";
import logo from "../assets/aerolab-logo.svg";
import coinIcon from "../assets/icons/coin.svg";
import bannerLg from "../assets/header-x1.png";
import bannerMd from "../assets/header-x4.jpg";

import banner from "/assets/header-x3.jpg";

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
    Authorization: `Bearer ${api.key}`,
  },
};

function App(): JSX.Element {
  const [products, setProducts] = useState<Product[]>([]);

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
        {/* 480px first breakpoint */}
        <picture>
          <source media="(min-width: 1024px)" srcSet={bannerLg} width="1200px" />
          <source media="(min-width: 480px)" srcSet={bannerMd} width="500px" />
          <Image
            align="start"
            alt="Blue banner with headset"
            height="400px"
            objectFit="cover"
            src={banner}
            width="full"
          />
        </picture>
      </Stack>

      <Stack as="main" paddingBlock={4} paddingInline={2}>
        <Stack direction="row" justify="space-between">
          <Text width="min-content">16 of 32 products</Text>
          <Select bg="primary" borderRadius="full" color="text" width="max-content">
            <option>Most Recent</option>
            <option>Lowest Price</option>
            <option>Highest Price</option>
          </Select>
        </Stack>

        <SimpleGrid columns={{ base: 1, md: 2, xl: 3, "2xl": 4 }} placeItems="center" spacing={4}>
          {products.map((product) => (
            <Stack
              key={product._id}
              align="center"
              boxShadow="md"
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
                bg="hoverColor"
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
                  <Text color="text" fontSize={52}>
                    {product.cost}
                  </Text>
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
        </SimpleGrid>
      </Stack>
    </div>
  );
}

export default App;
