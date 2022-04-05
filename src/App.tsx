import type { User, Product } from "./types";

import { Stack, Text, Image, Select, SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import logo from "../assets/aerolab-logo.svg";
import coinIcon from "../assets/icons/coin.svg";
import bannerLg from "../assets/header-x1.png";
import bannerMd from "../assets/header-x4.jpg";

import banner from "/assets/header-x3.jpg";

import ProductItem from "./components/Product";
import api from "./api/api";

enum Ordering {
  lowestPrice = "LOWEST_PRICE",
  highestPrice = "HIGHEST_PRICE",
}

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
  const [ordering, setOrdering] = useState<Ordering>(Ordering.lowestPrice);

  useEffect(() => {
    api.getProducts().then((products: Product[]) => setProducts(products));
    api.getUser().then((user: User) => setUser(user));
  }, []);

  function handleSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    const orderOption = e.target.value as Ordering;

    setOrdering(orderOption);
  }

  function orderProducts(products: Product[]) {
    if (ordering === Ordering.highestPrice) {
      return products.sort((a, b) => b.cost - a.cost);
    } else {
      return products.sort((a, b) => a.cost - b.cost);
    }
  }

  return (
    <div className="App">
      <Stack
        as="nav"
        bg="white"
        boxShadow="md"
        direction="row"
        justify="space-between"
        paddingBlock={2}
        paddingInline={4}
        position="sticky"
        top="0"
        width="full"
        zIndex="1"
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
            <option value={Ordering.highestPrice}>Highest Price</option>
            <option value={Ordering.lowestPrice}>Lowest Price</option>
          </Select>
        </Stack>

        <SimpleGrid columns={{ base: 1, md: 2, xl: 3, "2xl": 4 }} placeItems="center" spacing={4}>
          {orderProducts(products).map((product) => (
            <ProductItem key={product._id} product={product} userState={[user, setUser]} />
          ))}
        </SimpleGrid>
      </Stack>
    </div>
  );
}

export default App;
