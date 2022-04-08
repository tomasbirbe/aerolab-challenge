import { Button, Stack, Text } from "@chakra-ui/react";
import React, { useRef } from "react";

interface Props {
  pages: number[];
  currentPageState: [
    currentPage: number,
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
  ];
  pagesToShow?: number;
}

export default function Pagination({ pages, currentPageState, pagesToShow = 3 }: Props) {
  const [currentPage, setCurrentPage] = currentPageState;

  const root = useRef(document.getElementById("root"));

  function handlePreviousPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }

    if (root.current) root.current.scrollTop = 400;
  }

  function handleNextPage() {
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1);
    }

    if (root.current) root.current.scrollTop = 400;
  }

  return (
    <Stack align="center" direction="row" justify="center" paddingBlock={4}>
      {currentPage > 1 && <Button onClick={handlePreviousPage}>Anterior</Button>}
      <Stack direction="row" spacing={0}>
        <Text>{currentPage}&nbsp;</Text>
        <Text color="blackAlpha.700">de {pages.length} </Text>
      </Stack>
      {currentPage < pages.length && <Button onClick={handleNextPage}>Siguiente</Button>}
    </Stack>
  );
}
