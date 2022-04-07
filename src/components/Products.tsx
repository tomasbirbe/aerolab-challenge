import type { Product, User } from "src/types";

import { SimpleGrid } from "@chakra-ui/react";
import React from "react";

import ProductItem from "./Product";

interface Props {
  products: Product[];
  userState: [user: User, setUser: React.Dispatch<React.SetStateAction<User>>];
}

export default function Products({ products, userState }: Props) {
  const [user, setUser] = userState;

  return (
    <>
      <SimpleGrid columns={{ base: 1, md: 2, xl: 3, "2xl": 4 }} placeItems="center" spacing={4}>
        {products.map((product: Product) => (
          <ProductItem key={product._id} product={product} userState={[user, setUser]} />
        ))}
      </SimpleGrid>
    </>
  );
}
