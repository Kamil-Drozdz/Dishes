import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { PulseLoader } from 'react-spinners';

import {
	TextField,
	Select,
	MenuItem,
	InputLabel,
	FormControl,
	Button,
	Box,
	useMediaQuery,
	Typography,
	InputAdornment,
} from '@material-ui/core';

interface FormValues {
	id: number;
	name: string;
	preparation_time: string;
	type: string;
	no_of_slices?: number | '';
	diameter?: number | '';
	spiciness_scale?: number | '';
	slices_of_bread?: number | '';
}

const DishForm: React.FC = () => {
	const [selectedType, setSelectedType] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [successMessage, setSuccessMessage] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const isLargeScreen = useMediaQuery('(min-width:800px)');
	const initialValues: FormValues = {
		id: 0,
		name: '',
		preparation_time: '',
		type: '',
		no_of_slices: '',
		diameter: '',
		spiciness_scale: '',
		slices_of_bread: '',
	};

	const validationSchema = Yup.object().shape({
		name: Yup.string().required().min(3),
		preparation_time: Yup.string().required(),
		type: Yup.string().required(),
		no_of_slices: Yup.number()
			.when('type', (type, schema) => {
				return type[0] === 'pizza' ? schema.required() : schema.notRequired();
			})
			.min(1)
			.max(8),
		diameter: Yup.number()
			.when('type', (type, schema) => {
				return type[0] === 'pizza' ? schema.required() : schema.notRequired();
			})
			.min(20)
			.max(80),
		spiciness_scale: Yup.number()
			.when('type', (type, schema) => {
				return type[0] === 'soup' ? schema.required() : schema.notRequired();
			})
			.min(1)
			.max(10),
		slices_of_bread: Yup.number()
			.when('type', (type, schema) => {
				return type[0] === 'sandwich' ? schema.required() : schema.notRequired();
			})
			.min(1)
			.max(8),
	});

	const handleFormSubmit = async (values: FormValues, { resetForm }: { resetForm: () => void }) => {
		try {
			setIsSubmitting(true);
			const submittedValues = { ...values };
			if (values.type !== 'pizza') {
				delete submittedValues.no_of_slices;
				delete submittedValues.diameter;
			}
			if (values.type !== 'soup') {
				delete submittedValues.spiciness_scale;
			}
			if (values.type !== 'sandwich') {
				delete submittedValues.slices_of_bread;
			}
			submittedValues.id = Math.floor(Math.random() * 1000);
			const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}`, submittedValues, {
				headers: {
					'Content-Type': 'application/json',
				},
			});
			if (response.status === 200) {
				setSuccessMessage('Dish submitted successfully!');
				setErrorMessage('');
			}

			resetForm();
			setSelectedType('');
		} catch (error) {
			console.error(error);
			setErrorMessage('There was an error submitting the dish. Please try again.');
		} finally {
			setIsSubmitting(false);
		}
	};

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
						{selectedType === 'pizza' && (
							<>
								<Box mb={2}>
									<Field
										as={TextField}
										type='number'
										name='no_of_slices'
										label='Slices (1-8)'
										variant='outlined'
										fullWidth
									/>
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
						)}
						{selectedType === 'soup' && (
							<Box mb={2}>
								<Field
									as={TextField}
									type='range'
									name='spiciness_scale'
									label={
										values.spiciness_scale ? `Spiciness scale ${values.spiciness_scale}` : 'Spiciness scale (1-10)'
									}
									variant='outlined'
									inputProps={{
										min: 0,
										max: 10,
									}}
									fullWidth
								/>
							</Box>
						)}
						{selectedType === 'sandwich' && (
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
						)}
						<Button type='submit' variant='contained' color='primary' fullWidth disabled={!isValid || !touched.type}>
							{isSubmitting ? <PulseLoader color='white' size={21} /> : 'Submit'}
						</Button>
						<Box mt={2} textAlign='center'>
							{successMessage && (
								<Typography variant='subtitle2' style={{ color: 'green' }}>
									{successMessage}
								</Typography>
							)}
							{errorMessage && (
								<Typography variant='subtitle2' style={{ color: 'red' }}>
									{errorMessage}
								</Typography>
							)}
						</Box>
					</Form>
				)}
			</Formik>
		</Box>
	);
};

export default DishForm;
