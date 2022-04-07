import { Button, Stack } from "@chakra-ui/react";
import React from "react";

interface Props {
  pages: number[];
  currentPageState: [
    currentPage: number,
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
  ];
}

export default function Pagination({ pages, currentPageState }: Props) {
  const [currentPage, setCurrentPage] = currentPageState;

  function handleChangePage(page: number) {
    setCurrentPage(page);
  }

  return (
    <Stack align="center" justify="center">
      <Stack as="ul" direction="row" listStyleType="none" marginBlockStart={8} spacing={2}>
        {pages.map((page: number) => (
          <li key={page}>
            <Button
              bg={currentPage === page ? "blue.400" : "gray.200"}
              onClick={() => handleChangePage(page)}
            >
              {page}
            </Button>
          </li>
        ))}
      </Stack>
    </Stack>
  );
}
