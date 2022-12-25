import React, { useState } from 'react';
import {
  Paper,
  Stack,
  AccordionProps,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  SelectChangeEvent,
} from '@mui/material';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { selectUsers } from '../../store/user/user.slice';
import { selectTodos } from '../../store/todo/todo.slice';
import { filter } from '../../pages/todo/TodoPage';

interface IItemProps extends AccordionProps {
  title: string;
  filters: filter;
  setFilters: React.Dispatch<React.SetStateAction<filter>>;
}
const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  // width: '15vw',
  height: 600,
}));

const Section: React.FC<IItemProps> = ({
  sx,
  title,
  filters,
  setFilters,
  children,
}: IItemProps) => {
  const titleSx = { ...sx };
  const { users } = useSelector(selectUsers);

  const handleOwnerChange = (event: SelectChangeEvent) => {
    const temp = { ...filters };
    temp.owner = event.target.value;
    setFilters(temp);
  };

  const handleTitleChange = _.debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const temp = { ...filters };
      temp.title = event.target.value;
      setFilters(temp);
    },
    500,
  );

  return (
    <Stack spacing={1} style={{ height: '100%' }}>
      <Accordion sx={titleSx}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ textAlign: 'left' }}>
          <Stack spacing={1}>
            <FormControl>
              <InputLabel size="small">owner</InputLabel>
              <Select
                value={filters.owner}
                label="owner"
                size="small"
                onChange={handleOwnerChange}
              >
                <MenuItem key="전체" value="전체">
                  전체
                </MenuItem>
                {users.map(({ email }) => (
                  <MenuItem key={email} value={email}>
                    {email}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              // value={filters.title}
              onChange={handleTitleChange}
              size="small"
              label="title"
              variant="outlined"
            />
          </Stack>
        </AccordionDetails>
      </Accordion>
      <Item sx={sx}>{children}</Item>
    </Stack>
  );
};
export default Section;
