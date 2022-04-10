import type { User, Product } from "src/types";

import { Stack, Text, Image, Select, Input, Button, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import logo from "/assets/aerolab-logo.svg";
import coinIcon from "/assets/icons/coin.svg";
import bannerLg from "/assets/header-x1.png";
import bannerMd from "/assets/header-x4.jpg";
import banner from "/assets/header-x3.jpg";

import api from "./services";
import Products from "./components/Products";
import Pagination from "./components/Pagination";

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

  // Pagination state

  const [productsPerPage, setProductsPerPage] = useState<number>(16);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pages, setPages] = useState<number[]>([]);

  useEffect(() => {
    api.getProducts().then((products: Product[]) => setProducts(products));
    api.getUser().then((user: User) => setUser(user));
  }, []);

  useEffect(() => {
    for (let i = 0; i < products.length / 16; i++) {
      setPages((prevPages) => [...prevPages, i + 1]);
    }
  }, [products]);

  function handleSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    const orderOption = e.target.value as Ordering;

    setOrdering(orderOption);
  }

  function handleFilter(e: any) {
    e.preventDefault();
    const newProductsPerPage = Number(e.target[0].value);

    if (newProductsPerPage > 0) {
      setProductsPerPage(newProductsPerPage);
      const updatedPages = [];

      for (let i = 0; i < products.length / newProductsPerPage; i++) {
        updatedPages.push(i + 1);
      }
      setPages(updatedPages);
    }
  }

  function orderProducts(products: Product[]) {
    if (ordering === Ordering.highestPrice) {
      return products.sort((a, b) => b.cost - a.cost);
    } else {
      return products.sort((a, b) => a.cost - b.cost);
    }
  }

  return (
    <Box className="App" id="home" margin="auto" maxWidth="1440px" placeItems="center">
      <Stack
        as="nav"
        bg="white"
        boxShadow="md"
        direction="row"
        justify="space-between"
        paddingBlock={2}
        paddingInline={6}
        position="sticky"
        top="0"
        width="full"
        zIndex="1"
      >
        <Stack align="center" as="a" href="#home" justify="center">
          <Image alt="Aerolab's logo" height="50px" src={logo} width="50px" />
        </Stack>
        <Stack>
          <Text fontSize={24}>{user.name}</Text>
          <Stack align="center" direction="row" gap={1} justify="flex-end" spacing={0}>
            <Text fontSize={22}>{user.points}</Text>
            <Image alt="A coin icon" height="20px" src={coinIcon} width="20px" />
          </Stack>
        </Stack>
      </Stack>

      <Stack as="header">
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

      <Stack as="main" id="main" paddingBlock={4} paddingInline={2}>
        <Stack direction="row" justify="space-between">
          <Stack>
            <Stack
              align="center"
              as="form"
              direction="row"
              id="filter"
              justify="center"
              spacing={0}
              onSubmit={handleFilter}
            >
              <Input
                borderColor="primary"
                defaultValue={productsPerPage}
                name="productsPerPage"
                padding={0}
                textAlign="center"
                width="50px"
              />
              <Text>&nbsp;of {products.length}</Text>
            </Stack>
            <Button form="filter" type="submit">
              Apply
            </Button>
          </Stack>
          <Select
            bg="primary"
            borderRadius="full"
            color="text"
            defaultValue={ordering}
            width="max-content"
            onChange={handleSelect}
          >
            <option value={Ordering.highestPrice}>Highest Price</option>
            <option value={Ordering.lowestPrice}>Lowest Price</option>
          </Select>
        </Stack>

        <Products
          products={[
            ...orderProducts(products).slice(
              (currentPage - 1) * productsPerPage,
              currentPage * productsPerPage,
            ),
          ]}
          userState={[user, setUser]}
        />
        <Pagination currentPageState={[currentPage, setCurrentPage]} pages={pages} />
      </Stack>
    </Box>
  );
}

export default App;
