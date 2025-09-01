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
import Card from 'components/card/Card';
import AddButton from './AddButton';
import AddModalDieta from './AddModalDieta';
import EditModalDieta from './EditModalDieta';
import DeleteModal from './DeleteModal';
import axios from 'axios';
import { MdDelete, MdEdit } from 'react-icons/md';
import toast, { Toaster } from 'react-hot-toast';

const columnHelper = createColumnHelper();

export default function DietaTable() {
  
  const [data, setData] = React.useState([]);
  const [sorting, setSorting] = React.useState([]);
  const [selectedDieta, setSelectedDieta] = React.useState({});

  const { isOpen: isOpenAdd, onOpen: onOpenAdd, onClose: onCloseAdd } = useDisclosure();
  const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure();
  const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure();

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:5000/dietas');
        if (res.status === 200) setData(res.data);
      } catch (err) {
        console.error('Erro ao buscar dietas:', err);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (values, actions) => {
    try {
      const newDieta = {
        nome_dieta: values.nome_dieta,
        calorias_diarias: values.calorias_diarias,
        gerador_id: values.gerador_id,
      };
      const res = await axios.post('http://127.0.0.1:5000/dietas', newDieta);
      if (res.status === 201) {
        setData([...data, res.data]);
        toast.success('Dieta cadastrada!');
      }
    } catch (err) {
      toast.error('Erro ao cadastrar dieta.');
    }
    actions.setSubmitting(false);
  };

  const handleUpdate = async (values, actions) => {
    try {
      const update = {
        nome_dieta: values.nome_dieta,
        calorias_diarias: values.calorias_diarias,
      };
      const res = await axios.put(`http://127.0.0.1:5000/dietas/${selectedDieta.id}`, update);
      if (res.status === 200) {
        setData(data.map((d) => (d.id === selectedDieta.id ? { ...d, ...update } : d)));
        toast.success('Dieta atualizada!');
      }
    } catch (err) {
      toast.error('Erro ao editar dieta.');
    }
    actions.setSubmitting(false);
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`http://127.0.0.1:5000/dietas/${selectedDieta.id}`);
      if (res.status === 200) {
        setData(data.filter((d) => d.id !== selectedDieta.id));
        toast.success('Dieta removida!');
      }
    } catch (err) {
      toast.error('Erro ao deletar dieta.');
    }
    setSelectedDieta({});
  };

  const columns = [
    columnHelper.accessor('nome_dieta', {
      id: 'nome_dieta',
      header: () => <Text fontSize="xs" color="gray.400">NOME DA DIETA</Text>,
      cell: (info) => <Text color={textColor} fontWeight="700">{info.getValue()}</Text>,
    }),
    columnHelper.accessor('calorias_diarias', {
      id: 'calorias_diarias',
      header: () => <Text fontSize="xs" color="gray.400">CALORIAS</Text>,
      cell: (info) => <Text>{info.getValue()}</Text>,
    }),
    columnHelper.accessor('gerador.id', {
      id: 'gerador_id',
      header: () => <Text fontSize="xs" color="gray.400">GERADOR</Text>,
      cell: (info) => <Badge colorScheme="blue">{info.getValue()}</Badge>,
    }),
    columnHelper.accessor('id', {
      id: 'actions',
      header: () => <Text></Text>,
      cell: (info) => (
        <Flex>
          <Button variant="ghost" colorScheme="blue" size="sm" mr={2} onClick={() => { setSelectedDieta(info.row.original); onOpenEdit(); }} leftIcon={<MdEdit />}>Editar</Button>
          <Button variant="ghost" colorScheme="red" size="sm" onClick={() => { setSelectedDieta(info.row.original); onOpenDelete(); }} leftIcon={<MdDelete />}>Deletar</Button>
        </Flex>
      ),
    })
  ];

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  return (
    <>
      <Card flexDirection="column" w="100%" px="0px" overflowX={{ sm: 'scroll', lg: 'hidden' }}>
        <Flex px="25px" mb="8px" justifyContent="space-between" align="center">
          <Text fontSize="2xl" fontWeight="700">Tabela de Dietas</Text>
          <AddButton handleClick={onOpenAdd} />
        </Flex>
        <Box>
          <Table variant="simple" color="gray.500">
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

      <AddModalDieta isOpen={isOpenAdd} onClose={onCloseAdd} handleSubmit={handleSubmit} />
      <EditModalDieta isOpen={isOpenEdit} onClose={onCloseEdit} handleSubmit={handleUpdate} dieta={selectedDieta} />
      <DeleteModal isOpen={isOpenDelete} onClose={onCloseDelete} handleDelete={handleDelete} text={"Tem certeza que deseja remover esta dieta?"} />
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}
