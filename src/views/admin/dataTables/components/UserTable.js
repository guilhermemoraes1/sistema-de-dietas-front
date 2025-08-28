/* eslint-disable */

import {
  Flex,
  Box,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Button
} from '@chakra-ui/react';
import * as React from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

// Custom components
import Card from 'components/card/Card';
import Menu from 'components/menu/MainMenu';

const columnHelper = createColumnHelper();

// const columns = columnsDataCheck;
export default function UserTable(props) {
  const [data, setData] = React.useState([]);
  const [sorting, setSorting] = React.useState([]);

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
  
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/usuarios');
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (userId) => {
    if (!window.confirm("Tem certeza de que deseja deletar este usuário?")) {
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:5000/usuarios/${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setData(data.filter(user => user.id !== userId));
        alert('Usuário removido com sucesso!');
      } else {
        const errorData = await response.json();
        alert(`Erro ao remover usuário: ${errorData.error || 'Ocorreu um erro.'}`);
      }
    } catch (error) {
      console.error('Erro ao conectar com a API:', error);
      alert('Erro de conexão. Não foi possível remover o usuário.');
    }
  };

  const columns = [
    columnHelper.accessor('nome', {
        id: 'nome',
        header: () => (
        <Text fontSize={{ sm: '10px', lg: '12px' }} color="gray.400">
            NAME
        </Text>
        ),
        cell: (info) => (
        <Text color={textColor} fontSize="sm" fontWeight="700">
            {info.getValue()}
        </Text>
        ),
    }),
    columnHelper.accessor('email', {
        id: 'email',
        header: () => (
        <Text fontSize={{ sm: '10px', lg: '12px' }} color="gray.400">
            EMAIL
        </Text>
        ),
        cell: (info) => (
        <Text color={textColor} fontSize="sm">
            {info.getValue()}
        </Text>
        ),
    }),
    columnHelper.accessor('nutricionista_id', {
        id: 'nutricionista_id',
        header: () => (
        <Text fontSize={{ sm: '10px', lg: '12px' }} color="gray.400">
            NUTRICIONIST
        </Text>
        ),
        cell: (info) => {
        const value = info.getValue();
        return (
            <Text color={textColor} fontSize="sm">
            {value !== null ? `ID ${value}` : 'Sem nutricionista'}
            </Text>
        );
        },
    }),
    columnHelper.accessor('id', {
      id: 'actions',
      header: () => (
        <Text fontSize={{ sm: '10px', lg: '12px' }} color="gray.400">
        </Text>
      ),
      cell: (info) => (
        <Flex>
          <Button
            variant="ghost"
            colorScheme="blue"
            size="sm"
            mr={2}
            onClick={() => handleEdit()}
            leftIcon={<MdEdit />}
          >
            Editar
          </Button>
          <Button
            variant="ghost"
            colorScheme="red"
            size="sm"
            onClick={() => handleDelete(info.row.original.id)}
            leftIcon={<MdDelete />}
          >
            Deletar
          </Button>
        </Flex>
      ),
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  return (
    <Card
      flexDirection="column"
      w="100%"
      px="0px"
      overflowX={{ sm: 'scroll', lg: 'hidden' }}
    >
      <Flex px="25px" mb="8px" justifyContent="space-between" align="center">
        <Text
          color={textColor}
          fontSize="22px"
          mb="4px"
          fontWeight="700"
          lineHeight="100%"
        >
          User Table
        </Text>
        <Menu />
      </Flex>
      <Box>
        <Table variant="simple" color="gray.500" mb="24px" mt="12px">
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <Th
                      key={header.id}
                      colSpan={header.colSpan}
                      pe="10px"
                      borderColor={borderColor}
                      cursor="pointer"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <Flex
                        justifyContent="space-between"
                        align="center"
                        fontSize={{ sm: '10px', lg: '12px' }}
                        color="gray.400"
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {{
                          asc: '',
                          desc: '',
                        }[header.column.getIsSorted()] ?? null}
                      </Flex>
                    </Th>
                  );
                })}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table
              .getRowModel()
              .rows.slice(0, 11)
              .map((row) => {
                return (
                  <Tr key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <Td
                          key={cell.id}
                          fontSize={{ sm: '14px' }}
                          minW={{ sm: '150px', md: '200px', lg: 'auto' }}
                          borderColor="transparent"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </Td>
                      );
                    })}
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </Box>
    </Card>
  );
}
