import React from 'react';
import NativeColorPicker from 'native-color-picker';
import * as R from 'ramda';

import { Portal, Modal, TextInput } from 'react-native-paper';
import { View } from 'react-native';
import AppTheme from '../Theme';
import { Box } from './Box';
import { generateListOfColours } from '../util';
import { LargeIconButton } from './Buttons';
import { Hold } from '../types';

interface ModalProps {
	name: string;
	colour: string;
	visible: boolean;
	index: number;
	closeModal: () => void;
	onSubmit: {
		updateExisting: (key: number, newValue: Hold) => void;
		addNew: (value: Hold) => void;
	};
	kind: 'add' | 'update';
}

const HoldInputModal: React.FC<ModalProps> = ({
	visible,
	closeModal,
	colour,
	name,
	onSubmit,
	index,
	kind,
}) => {
	const [_name, setName] = React.useState<string>(name);
	const [_colour, setColour] = React.useState<string>(colour);
	const [showColourPicker, setShowColourPicker] = React.useState<boolean>(
		false,
	);

	return (
		<Portal>
			<Modal
				visible={visible}
				onDismiss={closeModal}
				contentContainerStyle={{
					backgroundColor: AppTheme.colors.onBackground,
					width: '90%',
					height: '50%',
					alignSelf: 'center',
					borderRadius: 20,
				}}
			>
				<Box justifyContent={'flex-start'} paddingTop={0}>
					<Box
						flexDirection={'row'}
						justifyContent={'space-around'}
						width={'100%'}
						alignItems={'center'}
						paddingTop={0}
						marginBottom={0}
						flex={0.3}
					>
						<TextInput
							label={'Enter name of hold'}
							selectTextOnFocus={true}
							mode={'outlined'}
							value={_name}
							onChangeText={(text) => setName(text)}
							onSubmitEditing={({ nativeEvent: { text } }) => {
								setName(text);
							}}
							style={{ flex: 0.75 }}
						/>
						<View
							style={{
								backgroundColor: _colour,
								height: 40, //magic number
								borderRadius: 10,
								flex: 0.12,
							}}
							onTouchEnd={() => setShowColourPicker(true)}
						/>
					</Box>
					{showColourPicker ? (
						<Box paddingTop={0}>
							<NativeColorPicker
								colors={generateListOfColours()}
								onSelect={(item) => {
									setColour(item);
									setShowColourPicker(false);
								}}
							/>
						</Box>
					) : (
						<Box flexDirection={'row'}>
							<LargeIconButton
								icon={'close-circle-outline'}
								onPress={closeModal}
								color={AppTheme.colors.placeholder}
							/>
							<LargeIconButton
								icon={'check-bold'}
								onPress={() => {
									kind === 'update'
										? onSubmit.updateExisting(index, {
												name: _name,
												colour: _colour,
										  })
										: onSubmit.addNew({ name: _name, colour: _colour }),
										closeModal();
								}}
								color={AppTheme.colors.accent}
							/>
						</Box>
					)}
				</Box>
				<View></View>
			</Modal>
		</Portal>
	);
};
export default HoldInputModal;
