import React from 'react';
import { createTheme, ThemeProvider, colors} from '@mui/material';

export const patientTheme = createTheme({
	palette:{
		primary:{
			dark: '#DCE7D7',
			main: '#A9C39E',
			contrastText: '#153D3C'
		},
		secondary:{
			main:'#F6B56B',
			dark:'#F1876F',
			
		}
	}
})

export const counselorTheme = createTheme({
	palette:{
		primary:{
			main: '#BADFE7',
			dark: '#C8F8EA',
			contrastText: '#0C293E',
			light:'#84EFD0'
		},
		secondary:{
			main:'#3B5365',
			dark:'#F1876F',
			contrastText: '#FFFFFF',
		}
	}
})

export const doctorTheme = createTheme({
	palette:{
		primary:{
			main: '#6FB3B8',
			light: '#D9D9FF'
		},
		secondary:{
			main:'#FEFF89',
			dark:'#F1876F'
		}
	}
})

export const managerTheme = createTheme({
	palette:{
		primary:{
			main: '#388087',
			contrastText: '#FFFFFF'
		},
		secondary:{
			main:'#FEFF89',
			contrastText: '#000000'
		}
		
	}
})


export const baseTheme = createTheme({
	palette:{
		primary:{
			main: '#6B6891',
			contrastText: '#FFFFFF',
			dark: '#313131'
			
		},
		secondary:{
			main:'#FFFFFF',
			dark: '#CB947A'
		}
	}
})