import React from 'react';
import { Grid } from '@mui/material';
import MedDisplay from '../components/Medications/meddisplay/MedDisplay';
import AddMedicationForm from '../components/Medications/AddMedicationForm';
import MedicationCards from '../components/Medications/MedicationCards';
import MedicationIntakeForm from '../components/Medications/MedicationIntakeForm';
import MedIntakeFormTwo from '../components/Medications/MedIntakeFormTwo';

function Medications() {

	return (
		<Grid container rowSpacing={3} columnSpacing={3}>
			<Grid item xs={12} md={6}>
				<AddMedicationForm />
			</Grid>
			<Grid item xs={12} md={6}>
				<MedDisplay />
			</Grid>
			<Grid item xs={12} md={6}>
				<MedicationCards />
			</Grid>
			<Grid item xs={12} md={6}>
				<MedicationIntakeForm />
			</Grid>
			<Grid item xs={12} md={6}>
				<MedIntakeFormTwo />
			</Grid>

		</Grid>
	);
}

export default Medications;