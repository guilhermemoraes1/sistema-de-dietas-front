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
  Badge,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import * as React from 'react';

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
import UserModal from './UserModal';
import axios from 'axios';
import AddButton from './AddButton';
import AddModal from './AddModal';

const columnHelper = createColumnHelper();

 let nutriData = [
   {
    id: 1,
    nome: "Jefferson",
    email: "jeff@email.com",
    crn: "crn5555",
    usuarios: [
      {id: 1, nome: "Maria", email: "maria@email.com"},
      {id: 2, nome: "João", email: "joao@email.com"},
      {id: 3, nome: "Ana", email: "ana@email.com"}
    ]
  },
   {
    id: 1,
    nome: "Jefferson",
    email: "jeff@email.com",
    crn: "crn5555",
    usuarios: [
      
    ]
  }
]


export default function NutricionistaTable(props) {
  const [data, setData] = React.useState([]);
  const [sorting, setSorting] = React.useState([]);
  const [selectedNutricionista, setSelectedNutricionista] = React.useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenAddModal, onOpen : onOpenAddModal, onClose : onCloseAddModal } = useDisclosure();

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
  const crnColor = useColorModeValue('blue.500', 'blue.300');
  

  React.useEffect(() => {
    
    const fetchData = async () => {
      // try {
      //   const response = await axios.get('http://127.0.0.1:5000/nutricionistas')
      //   if(response.status === 200){
      //     const nutricionistasData = response.data
      //     setData(nutricionistasData);
      //   }
      // } catch (error) {
      //   console.error('Erro ao buscar dados:', error);    
      // }
      setData(nutriData )
    };

    fetchData();
  }, []);

  const handleShowUsers = (nutricionista) => {
    setSelectedNutricionista(nutricionista);
    onOpen();
  };
  const handleShowModalAdd = () => {
    
    onOpenAddModal();
  };

  


  const columns = [
    columnHelper.accessor('id', {
      id: 'id',
      header: () => (
        <Text fontSize={{ sm: '10px', lg: '12px' }} color="gray.400">
          ID
        </Text>
      ),
      cell: (info) => (
        <Text color={textColor} fontSize="sm" fontWeight="600">
          #{info.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor('nome', {
      id: 'nome',
      header: () => (
        <Text fontSize={{ sm: '10px', lg: '12px' }} color="gray.400">
          NOME
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
        <Text color={textColor} fontSize="sm" fontWeight="700">
          {info.getValue()}
        </Text>
      ),
    }),
    columnHelper.accessor('crn', {
      id: 'crn',
      header: () => (
        <Text fontSize={{ sm: '10px', lg: '12px' }} color="gray.400">
          CRN
        </Text>
      ),
      cell: (info) => (
        <Badge
          colorScheme="blue"
          color={crnColor}
          fontSize="sm"
          fontWeight="600"
          px="2"
          py="1"
          borderRadius="md"
        >
          {info.getValue()}
        </Badge>
      ),
    }),
    columnHelper.accessor('usuarios', {
      id: 'usuarios',
      header: () => (
        <Text fontSize={{ sm: '10px', lg: '12px' }} color="gray.400">
          PACIENTES VINCULADOS
        </Text>
      ),
      cell: (info) => {
        const usuarios = info.getValue();
        const row = info.row.original;
        
        return (
          <Box>
            {usuarios && usuarios.length > 0? (
              <>
                 
              <Button
                colorScheme="blue"
                size="xs"
                variant="link"
                mt="1"
                onClick={() => handleShowUsers(row)}
              >
                Detalhes
              </Button>
          
              </>
            ) : (
              <Text color="gray.500" fontSize="sm">
                Nenhum paciente
              </Text>
            )}
          </Box>
        );
      },
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
    <>
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
            Tabela de Nutricionistas
          </Text>
          <AddButton
            handleClick={handleShowModalAdd}
          />
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
                            asc: ' 🔼',
                            desc: ' 🔽',
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
                    <Tr key={row.id} _hover={{ bg: 'gray.50' }}>
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

      {/* Modal para mostrar todos os usuários */}
      <UserModal
        usuarios={selectedNutricionista.usuarios || []}
        isOpen={isOpen}
        onClose={onClose}
        nutricionista={selectedNutricionista.nome}
        />
      <AddModal
        isOpen={isOpenAddModal}
        onClose={onCloseAddModal}
      />
    </>
  );
}