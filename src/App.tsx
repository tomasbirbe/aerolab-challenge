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

interface User {
  createDate: string;
  name: string;
  points: number;
  redeemHistory: Product[];
  __v: number;
  _id: string;
}

type Ordering = "lowestPrice" | "highestPrice";

const reqBody = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${api.key}`,
  },
};

const INITIAL_USER = {
  name: "",
  points: 0,
  redeemHistory: [],
  _id: "",
  __v: 0,
  createDate: "",
};

function App(): JSX.Element {
  const [products, setProducts] = useState<Product[]>([]);
  const [user, setUser] = useState<User>(INITIAL_USER);
  const [ordering, setOrdering] = useState<Ordering>("highestPrice");

  useEffect(() => {
    fetch(`https://coding-challenge-api.aerolab.co/products`, reqBody)
      .then((data) => data.json())
      .then((data) => setProducts(data));

    fetch("https://coding-challenge-api.aerolab.co/user/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${api.key}`,
      },
    })
      .then((data) => data.json())
      .then((data) => setUser(data));
  }, []);

  function IHaveEnoughPoints(product: Product) {
    return user.points >= product.cost;
  }

  function handleSelect(e: any) {
    setOrdering(e.target.value);
  }

  function orderProducts(products: Product[]) {
    if (ordering === "highestPrice") {
      return products.sort((a, b) => b.cost - a.cost);
    } else {
      return products.sort((a, b) => a.cost - b.cost);
    }
  }

  function handleRedeem(product: Product) {
    if (IHaveEnoughPoints(product)) {
      setUser((prevUser) => ({ ...prevUser, points: user.points - product.cost }));
    }
  }

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
          <Text>{user.name}</Text>
          <Stack align="center" direction="row" gap={1} spacing={0}>
            <Text>{user.points}</Text>
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
          <Text width="min-content">16 of {products.length} products</Text>
          <Select
            bg="primary"
            borderRadius="full"
            color="text"
            defaultValue="highestPrice"
            width="max-content"
            onChange={handleSelect}
          >
            <option value="highestPrice">Highest Price</option>
            <option value="lowestPrice">Lowest Price</option>
          </Select>
        </Stack>

        <SimpleGrid columns={{ base: 1, md: 2, xl: 3, "2xl": 4 }} placeItems="center" spacing={4}>
          {orderProducts(products).map((product) => (
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
                  <Text
                    color="text"
                    fontSize={52}
                    textColor={IHaveEnoughPoints(product) ? "white" : "red.600"}
                  >
                    {product.cost}
                  </Text>
                  <Image height="50px" src={coinIcon} width="50px" />
                </Stack>
                <Button
                  _disabled={{ opacity: 0.7 }}
                  borderRadius="full"
                  disabled={!IHaveEnoughPoints(product)}
                  textColor="blackAlpha.700"
                  width="80%"
                  onClick={() => handleRedeem(product)}
                >
                  {IHaveEnoughPoints(product) ? "Redeem now!" : "Not enough points :("}
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
