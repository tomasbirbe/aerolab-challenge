import type { Product, User } from "../types";

import { Stack, Button, Text, Image, Divider } from "@chakra-ui/react";
import React, { useState } from "react";

import coinIcon from "../../assets/icons/coin.svg";

import Alert from "./Alert";

interface Props {
  product: Product;
  userState: [user: User, setUser: React.Dispatch<React.SetStateAction<User>>];
}

export default function ProductItem({ product, userState }: Props) {
  const [user, setUser] = userState;
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [showConfirmRedeem, setShowConfirmRedeem] = useState<boolean>(false);

  function IHaveEnoughPoints() {
    return user.points >= product.cost;
  }

  function tryToRedeem() {
    if (IHaveEnoughPoints()) {
      setShowConfirmRedeem(true);
    }
  }

  function handleRedeem(product: Product) {
    setUser((prevUser: any) => ({ ...prevUser, points: user.points - product.cost }));
    setShowConfirmRedeem(false);
    setShowAlert(true);
  }

  function handleClose() {
    setShowAlert(false);
    setShowConfirmRedeem(false);
  }

  return (
    <>
      <Stack
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
            <Text color="text" fontSize={52} textColor={IHaveEnoughPoints() ? "white" : "red.600"}>
              {product.cost}
            </Text>
            <Image height="50px" src={coinIcon} width="50px" />
          </Stack>
          {showConfirmRedeem ? (
            <Button
              _active={{}}
              _disabled={{ opacity: 0.7 }}
              _focus={{}}
              _hover={{}}
              bg="green.400"
              borderRadius="full"
              disabled={!IHaveEnoughPoints()}
              textColor="white"
              width="80%"
              onClick={() => handleRedeem(product)}
            >
              Confirm Redeem
            </Button>
          ) : (
            <Button
              _disabled={{ opacity: 0.7 }}
              borderRadius="full"
              disabled={!IHaveEnoughPoints()}
              textColor="blackAlpha.700"
              width="80%"
              onClick={tryToRedeem}
            >
              {IHaveEnoughPoints() ? "Redeem now!" : "Not enough points :("}
            </Button>
          )}
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

      {showAlert && (
        <Alert>
          <Stack
            bg="white"
            borderRadius={12}
            boxShadow="xl"
            height="300px"
            justify="space-between"
            paddingBlock={4}
            paddingInline={4}
            width="500px"
          >
            <Text fontSize={40}>Congratulations!</Text>
            <Divider />
            <Text fontSize={24}>You have redeemed {product.name}!</Text>
            <Stack align="center" direction="row" spacing={0}>
              <Text>Now you have {user.points}</Text>
              <Image height="25px" src={coinIcon} width="25px" />
            </Stack>
            <Divider />
            <Button
              _active={{ bg: "#08a4c4" }}
              _focus={{}}
              _hover={{ bg: "#0abbdf" }}
              bg="primary"
              color="text"
              onClick={handleClose}
            >
              Close
            </Button>
          </Stack>
        </Alert>
      )}
    </>
  );
}
