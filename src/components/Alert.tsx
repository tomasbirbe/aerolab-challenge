import { SimpleGrid, Stack } from "@chakra-ui/react";
import React from "react";
import { createPortal } from "react-dom";

function Alert({ children }: { children: React.ReactNode }) {
  return (
    <SimpleGrid
      bottom="0"
      left="0"
      placeItems="center"
      position="fixed"
      right="0"
      top="0"
      zIndex="1"
    >
      <Stack spacing={0}>{children}</Stack>
    </SimpleGrid>
  );
}

export default function AlertPortal({ children }: { children: React.ReactNode }): JSX.Element {
  const alertRoot = document.getElementById("alert-root");

  if (alertRoot) {
    return createPortal(<Alert>{children}</Alert>, alertRoot);
  } else {
    return <></>;
  }
}
