import React from 'react';
import { Field } from 'formik';
import { Box, TextField } from '@material-ui/core';

const SandwichFields: React.FC = () => (
	<Box mb={2}>
		<Field
			as={TextField}
			type='number'
			name='slices_of_bread'
			label='Number of slices of bread (1-8)'
			variant='outlined'
			fullWidth
		/>
	</Box>
);

export default SandwichFields;
