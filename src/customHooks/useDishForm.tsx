import { useState } from 'react';
import { useMediaQuery } from '@material-ui/core';
import axios from 'axios';
import * as Yup from 'yup';

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

export const useDishForm = () => {
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
			const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/dishes/`, submittedValues, {
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

	return {
		selectedType,
		isSubmitting,
		successMessage,
		errorMessage,
		isLargeScreen,
		initialValues,
        validationSchema,
		handleFormSubmit,
		setSelectedType,
	};
};
