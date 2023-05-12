import React from 'react';
import { Formik, Form, Field } from 'formik';
import { useDishForm } from '../customHooks/useDishForm';
import { PulseLoader } from 'react-spinners';
import SandwichFields from './subComponents/SandwichFields';
import PizzaFields from './subComponents/PizzaFields';
import SoupFields from './subComponents/SoupFields';
import Message from './subComponents/Message';
import { TextField, Select, MenuItem, InputLabel, FormControl, Button, Box } from '@material-ui/core';


const DishForm: React.FC = () => {
	const {
		selectedType,
		isSubmitting,
		successMessage,
		errorMessage,
		isLargeScreen,
		initialValues,
		validationSchema,
		handleFormSubmit,
		setSelectedType,
	} = useDishForm();

	return (
		<Box
			sx={{
				bgcolor: `rgba(0, 0, 0, 0.05)`,
				padding: '16px',
				borderRadius: '8px',
				border: 'solid 1px rgba(0, 0, 0, 0.30)',
				marginTop: '10%',
				margin: 'auto',
				width: isLargeScreen ? '40%' : '90%',
				boxShadow: 2,
			}}>
			<Formik initialValues={initialValues} onSubmit={handleFormSubmit} validationSchema={validationSchema}>
				{({ values, handleChange, touched, isValid }) => (
					<Form>
						<Box mb={2}>
							<Field as={TextField} name='name' label='Dish name' variant='outlined' fullWidth />
						</Box>
						<Box mb={2}>
							<Field
								type={touched.preparation_time ? 'time' : 'text'}
								as={TextField}
								name='preparation_time'
								label='Preparation time'
								variant='outlined'
								fullWidth
								inputProps={{ step: 2 }}
							/>
						</Box>
						<Box mb={2}>
							<FormControl fullWidth variant='outlined'>
								<InputLabel id='type-label'>Dish type</InputLabel>
								<Field
									as={Select}
									labelId='type-label'
									name='type'
									label='Dish type'
									value={values.type}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
										handleChange(e);
										setSelectedType(e.target.value);
									}}>
									<MenuItem disabled value=''>
										<em>Select a type</em>
									</MenuItem>
									<MenuItem value='pizza'>Pizza</MenuItem>
									<MenuItem value='soup'>Soup</MenuItem>
									<MenuItem value='sandwich'>Sandwich</MenuItem>
								</Field>
							</FormControl>
						</Box>
						{selectedType === 'pizza' && <PizzaFields />}
						{selectedType === 'soup' && <SoupFields values={values} />}
						{selectedType === 'sandwich' && <SandwichFields />}
						<Button type='submit' variant='contained' color='primary' fullWidth disabled={!isValid || !touched.type}>
							{isSubmitting ? <PulseLoader color='white' size={21} /> : 'Submit'}
						</Button>
						<Message successMessage={successMessage} errorMessage={errorMessage} />
					</Form>
				)}
			</Formik>
		</Box>
	);
};

export default DishForm;
