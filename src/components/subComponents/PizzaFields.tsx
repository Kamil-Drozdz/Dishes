import React from 'react';
import { Field } from 'formik';
import { Box, TextField, InputAdornment } from '@material-ui/core';

const PizzaFields: React.FC = () => (
	<>
		<Box mb={2}>
			<Field as={TextField} type='number' name='no_of_slices' label='Slices (1-8)' variant='outlined' fullWidth />
		</Box>
		<Box mb={2}>
			<Field
				as={TextField}
				type='number'
				name='diameter'
				label='Diameter (20-80)'
				inputProps={{
					step: 0.01,
					min: 0,
					max: 80,
				}}
				InputProps={{
					endAdornment: <InputAdornment position='end'>cm</InputAdornment>,
				}}
				variant='outlined'
				fullWidth
			/>
		</Box>
	</>
);

export default PizzaFields;
