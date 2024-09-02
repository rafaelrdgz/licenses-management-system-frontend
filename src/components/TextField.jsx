import {TextField as MuiTextField} from '@mui/material';
import {styled} from '@mui/material/styles';

const TextField = styled(MuiTextField)(({theme}) => ({
  '& label.Mui-focused': {
    color: theme.palette.mode === 'dark' ? 'white' : 'black',
    fontSize: '1rem',
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

export default TextField;