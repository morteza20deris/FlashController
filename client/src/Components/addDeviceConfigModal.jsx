import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";
import Row from "react-bootstrap/esm/Row";
import addNewDeviceConfig from "../Services/addNewDeviceConfig";
import removeDeviceConfig from "../Services/removeDeviceConfig";

const addDeviceConfigModal = ({
	showAddDeviceConfigModal,
	setShowAddDeviceConfigModal,
	selectedDevice,
	newConfig,
	setDevicesFromDB,
	buttonClickHandler,
	selectedConfig,
}) => {
	return (
		<Modal
			show={showAddDeviceConfigModal}
			onHide={() => setShowAddDeviceConfigModal(false)}
		>
			<Modal.Header closeButton>
				<Modal.Title>Add Device Config To Database</Modal.Title>
			</Modal.Header>
			<Modal.Footer>
				<Row>
					<Button
						className="my-2"
						variant="primary"
						size="md"
						onClick={() => setShowAddDeviceConfigModal(false)}
					>
						Close
					</Button>
					<Button
						className="my-2"
						onClick={async () => {
							if (
								selectedDevice?.configs?.filter(
									(config) => config.name === newConfig.name
								).length
							) {
								alert("Please Change The Config Name");
							} else {
								setDevicesFromDB(
									await addNewDeviceConfig(
										selectedDevice.deviceName,
										newConfig
									)
								);
								buttonClickHandler();

								setShowAddDeviceConfigModal(false);
							}
						}}
					>
						Save As New Config And Upload
					</Button>

					<Button
						className="my-2"
						disabled={!selectedDevice?.configs?.length > 0}
						onClick={async () => {
							await removeDeviceConfig(
								selectedConfig,
								selectedDevice
							);
							setDevicesFromDB(
								await addNewDeviceConfig(
									selectedDevice.deviceName,
									newConfig
								)
							);
							buttonClickHandler();
							setShowAddDeviceConfigModal(false);
						}}
					>
						Update Current Config And Upload
					</Button>
				</Row>
			</Modal.Footer>
		</Modal>
	);
};

export default addDeviceConfigModal;
