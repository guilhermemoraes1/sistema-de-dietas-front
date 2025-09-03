import React from 'react';
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
  Button,
  useDisclosure,
} from '@chakra-ui/react';

import { MdEdit, MdDelete } from 'react-icons/md';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';

// Componentes personalizados
import Card from 'components/card/Card';
import AddButton from '../../nuticionista/components/AddButton';
import AddModal from './AddModal';
import EditModal from './EditModal';
import DeleteModal from '../../nuticionista/components/DeleteModal';

const columnHelper = createColumnHelper();

export default function UserTable() {
  const [data, setData] = React.useState([]);
  const [sorting, setSorting] = React.useState([]);
  const [selectedUser, setSelectedUser] = React.useState({});
  const [nutricionistas, setNutricionistas] = React.useState([]);

  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclosure();

  const {
    isOpen: isOpenAddModal,
    onOpen: onOpenAddModal,
    onClose: onCloseAddModal
  } = useDisclosure();

  const {
    isOpen: isOpenDeleteModal,
    onOpen: onOpenDeleteModal,
    onClose: onCloseDeleteModal
  } = useDisclosure();

  const {
    isOpen: isOpenEditModal,
    onOpen: onOpenEditModal,
    onClose: onCloseEditModal
  } = useDisclosure();

  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const responseUsuarios = await fetch('http://127.0.0.1:5000/usuarios');
        const jsonUsuarios = await responseUsuarios.json();
        setData(jsonUsuarios);

        const responseNutricionistas = await fetch('http://127.0.0.1:5000/nutricionistas'); // URL para a API de nutricionistas
        const jsonNutricionistas = await responseNutricionistas.json();
        setNutricionistas(jsonNutricionistas);
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    };
    fetchData();
  }, []);

  const handleShowModalAdd = () => onOpenAddModal();
  const handleShowModalDelete = (user) => {
    setSelectedUser(user);
    onOpenDeleteModal();
  };
  const handleShowModalEdit = (user) => {
    setSelectedUser(user);
    onOpenEditModal();
  };

  const handleSubmit = async (values, actions) => {
    try {
      const newUser = {
        nome: values.nome,
        email: values.email,
        nutricionista_id: values.nutricionista_id,
      };

      const response = await axios.post('http://127.0.0.1:5000/usuarios', newUser, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 201) {
        const userData = response.data;
        setData([...data, userData]);
        toast.success('Cadastro realizado com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao enviar dados para a API:', error);
      toast.error('Erro de conexão. Não foi possível cadastrar o user.');
    }
    actions.setSubmitting(false);
  };

  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/usuarios/${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setData(data.filter((user) => user.id !== userId));
        toast.success('Usuário removido com sucesso!');
      } else {
        const errorData = await response.json();
        toast.error(`Erro ao remover usuário: ${errorData.error || 'Ocorreu um erro.'}`);
      }
    } catch (error) {
      console.error('Erro ao conectar com a API:', error);
      toast.error('Erro de conexão. Não foi possível remover o usuário.');
    }
  };

  const handleUpdate = async (values, actions) => {
    const userId = selectedUser.id;
    if (!userId) return;

    try {
      const editUser = {
        nome: values.nome,
        email: values.email,
        nutricionista_id: values.nutricionista_id,
      };

      const response = await axios.put(
        `http://127.0.0.1:5000/usuarios/${userId}`,
        editUser,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (response.status === 200) {
        const newData = data.map((item) =>
          item.id === userId ? { ...item, ...editUser } : item
        );
        setData(newData);
        toast.success('Edição realizada com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao enviar dados para a API:', error);
      toast.error('Erro de conexão. Não foi possível concluir edição.');
    }

    setSelectedUser({});
    actions.setSubmitting(false);
  };

  const columns = [
    columnHelper.accessor('nome', {
      id: 'nome',
      header: () => <Text fontSize="12px" color="gray.400">NOME</Text>,
      cell: (info) => <Text color={textColor} fontSize="sm" fontWeight="700">{info.getValue()}</Text>,
    }),
    columnHelper.accessor('email', {
      id: 'email',
      header: () => <Text fontSize="12px" color="gray.400">EMAIL</Text>,
      cell: (info) => <Text color={textColor} fontSize="sm">{info.getValue()}</Text>,
    }),
    columnHelper.accessor('nutricionista_id', {
      id: 'nutricionista_id',
      header: () => <Text fontSize="12px" color="gray.400">NUTRICIONISTA</Text>,
      cell: (info) => {
        const value = info.getValue();
        const nutricionista = nutricionistas.find(n => n.id === value);

        const nomeNutricionista = nutricionista ? nutricionista.nome : 'Sem nutricionista';

        return (
          <Text color={textColor} fontSize="sm">
            {value === 0 ? 'Sem nutricionista' : nomeNutricionista}
          </Text>
        );
      },
    }),
    columnHelper.accessor('id', {
      id: 'actions',
      header: () => <Text fontSize="12px" color="gray.400"></Text>,
      cell: (info) => (
        <Flex>
          <Button
            variant="ghost"
            colorScheme="blue"
            size="sm"
            mr={2}
            onClick={() => handleShowModalEdit(info.row.original)}
            leftIcon={<MdEdit />}
          >
            Editar
          </Button>
          <Button
            variant="ghost"
            colorScheme="red"
            size="sm"
            onClick={() => handleShowModalDelete(info.row.original)}
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
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  return (
    <Card flexDirection="column" w="100%" px="0px" overflowX={{ sm: 'scroll', lg: 'hidden' }}>
      <Flex px="25px" mb="8px" justifyContent="space-between" align="center">
        <Text color={textColor} fontSize="22px" mb="4px" fontWeight="700" lineHeight="100%">
          Tabela de Usuários
        </Text>
        <AddButton handleClick={handleShowModalAdd} />
      </Flex>

      <Box>
        <Table variant="simple" color="gray.500" mb="24px" mt="12px">
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
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
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {{
                        asc: '',
                        desc: '',
                      }[header.column.getIsSorted()] ?? null}
                    </Flex>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.slice(0, 11).map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Td
                    key={cell.id}
                    fontSize={{ sm: '14px' }}
                    minW={{ sm: '150px', md: '200px', lg: 'auto' }}
                    borderColor="transparent"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* Modais */}

      <AddModal
        isOpen={isOpenAddModal}
        onClose={onCloseAddModal}
        handleSubmit={handleSubmit}
      />

      <DeleteModal
        isOpen={isOpenDeleteModal}
        onClose={onCloseDeleteModal}
        handleDelete={() => handleDelete(selectedUser.id)}
        text={'Tem certeza que quer deletar o Usuário?'}
      />

      <EditModal
        isOpen={isOpenEditModal}
        onClose={onCloseEditModal}
        nutricionista={selectedUser}
        handleSubmit={handleUpdate}
      />

      <Toaster position="top-right" reverseOrder={false} />
    </Card>
  );
}