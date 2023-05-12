import React from 'react';
import { Field } from 'formik';
import { Box, TextField } from '@material-ui/core';

interface SoupFieldsProps {
	values: { spiciness_scale?: number | '' };
}

const SoupFields: React.FC<SoupFieldsProps> = ({ values }) => (
	<Box mb={2}>
		<Field
			as={TextField}
			type='range'
			name='spiciness_scale'
			label={values.spiciness_scale ? `Spiciness scale ${values.spiciness_scale}` : 'Spiciness scale (1-10)'}
			variant='outlined'
			inputProps={{
				min: 0,
				max: 10,
			}}
			fullWidth
		/>
	</Box>
);

export default SoupFields;
