import { Select as MuiSelect } from '@mui/material';
import { styled } from '@mui/material/styles';

const Select = styled(MuiSelect)(({ theme }) => ({
  '& .MuiSelect-select': {
    color: theme.palette.mode === 'dark' ? 'white' : 'black',
    fontSize: '1rem',
  },
  '& .MuiSelect-select:focus': {
    color: theme.palette.mode === 'dark' ? 'white' : 'black',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: theme.palette.mode === 'dark' ? 'white' : 'black',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.mode === 'dark' ? 'white' : 'black',
    },
    '&:hover fieldset': {
      borderColor: theme.palette.mode === 'dark' ? 'white' : 'black',
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.mode === 'dark' ? 'white' : 'black',
    },
  },
  '& .MuiInputBase-input': {
    fontSize: '1rem',
  },
  '& .MuiInputLabel-root': {
    fontSize: '1rem',
  },
}));

export default Select;