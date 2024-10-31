/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Modal from '@mui/material/Modal';
import styled from '@emotion/styled';

import CriarTarefa from './CriarTarefa';
import EditarTarefa from './EditarTarefa';

// Função para criar dados iniciais
function createData(idTarefa, tituloTarefa, descricaoTarefa, inicioTarefa, fimTarefa, statusTarefa, recursoTarefa) {
  return { idTarefa, tituloTarefa, descricaoTarefa, inicioTarefa, fimTarefa, statusTarefa, recursoTarefa };
}

// Dados iniciais
const initialRows = [
  createData(1, 'Tarefa 1', 'Descrição da Tarefa 1', '2022-01-01', '2022-01-02', 'Concluída', 'Recurso 1'),
  createData(2, 'Tarefa 2', 'Descrição da Tarefa 2', '2022-01-03', '2022-01-04', 'Em Andamento', 'Recurso 2'),
  // Outras tarefas
];

// Componentes estilizados
const StyledCard = styled(Card)`
  background-color: #f3f4f6;
  margin: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const StyledButton = styled(Button)`
  text-transform: none;
  font-weight: bold;
`;

const StyledTableRow = styled(TableRow)`
  &:nth-of-type(odd) {
    background-color: #f9fafb;
  }
`;

const ListarTarefa = () => {
  const [open, setOpen] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);
  const [tarefas, setTarefas] = useState([]);
  const [tarefa, setTarefa] = useState();
  const [idTarefaSelecionada, setIdTarefaSelecionada] = useState([]);
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenEditar = () => setOpenEditar(true);
  const handleCloseEditar = () => setOpenEditar(false);

  useEffect(() => {
    setTarefas(initialRows);
  },[]);

  const handleEditar = (id) => {
    setIdTarefaSelecionada(id);
    let tarefaParaEditar = tarefas.find(obj => obj.idTarefa === id);
    setTarefa(tarefaParaEditar);
    setOpenEditar(true);
  };

  const handleDeletar = (id) => {
    setTarefas(current => current.filter(tarefa => tarefa.idTarefa !== id));
  };

  return (
    <>
      <StyledCard>
        <CardHeader title="Tarefas" subheader="Listagem de Tarefas" />
        <CardContent>
          <TableContainer component={Paper}>
            <Table size="small" aria-label="tabela de tarefas">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Título</TableCell>
                  <TableCell align="right">Descrição</TableCell>
                  <TableCell align="right">Data de Início</TableCell>
                  <TableCell align="right">Data de Finalização</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="right">Recurso</TableCell>
                  <TableCell align="center">Editar</TableCell>
                  <TableCell align="center">Deletar</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tarefas.map((row, index) => (
                  <StyledTableRow key={index}>
                    <TableCell component="th" scope="row">{row.idTarefa}</TableCell>
                    <TableCell>{row.tituloTarefa}</TableCell>
                    <TableCell align="right">{row.descricaoTarefa}</TableCell>
                    <TableCell align="right">{row.inicioTarefa}</TableCell>
                    <TableCell align="right">{row.fimTarefa}</TableCell>
                    <TableCell align="right">{row.statusTarefa}</TableCell>
                    <TableCell align="right">{row.recursoTarefa}</TableCell>
                    <TableCell align="center">
                      <StyledButton variant="contained" color="success" onClick={() => handleEditar(row.idTarefa)}>
                        <EditIcon fontSize="small" />
                      </StyledButton>
                    </TableCell>
                    <TableCell align="center">
                      <StyledButton variant="contained" color="error" onClick={() => handleDeletar(row.idTarefa)}>
                        <DeleteIcon fontSize="small" />
                      </StyledButton>
                    </TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
        <CardActions>
          <StyledButton size="small" variant="contained" onClick={handleOpen}>Criar Tarefa</StyledButton>
          <StyledButton size="small" variant="outlined">Cancelar</StyledButton>
        </CardActions>
      </StyledCard>
      <Modal open={open} onClose={handleClose}>
        <div>
          <CriarTarefa handleClose={handleClose} tarefas={tarefas} setTarefas={setTarefas} />
        </div>
      </Modal>
      <Modal open={openEditar} onClose={handleCloseEditar}>
        <div>
          <EditarTarefa handleCloseEditar={handleCloseEditar} idTarefaSelecionada={idTarefaSelecionada} tarefas={tarefas} tarefa={tarefa} setTarefas={setTarefas} />
        </div>
      </Modal>
    </>
  );
};

export default ListarTarefa;
