import React from 'react';
import { Box, Typography } from '@material-ui/core';

interface MessageProps {
	successMessage?: string;
	errorMessage?: string;
}

const Message: React.FC<MessageProps> = ({ successMessage, errorMessage }) => (
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
);

export default Message;
