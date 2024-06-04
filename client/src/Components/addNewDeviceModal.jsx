import React from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/esm/FormGroup";

function addNewDeviceModal({
	showAddNewDeviceModal,
	setShowAddNewDeviceModal,
	devicesFromDB,
	setDevicesFromDB,
	addNewDeviceToDB,
	newDeviceName,
	setNewDeviceName,
}) {
	return (
		<Modal
			show={showAddNewDeviceModal}
			onHide={() => setShowAddNewDeviceModal(false)}
			onSubmit={async (e) => {
				e.preventDefault();
				if (
					!devicesFromDB?.filter(
						(dev) => dev.deviceName === newDeviceName
					).length
				) {
					setDevicesFromDB(await addNewDeviceToDB(newDeviceName));
					setShowAddNewDeviceModal(false);
				}
			}}
		>
			<Modal.Header closeButton>
				<Modal.Title>Add New Device To Database</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<FormGroup className="mb-3">
						<Form.Label>Enter Device Name</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter Device Name"
							minLength="1"
							maxLength={16}
							required
							value={newDeviceName}
							isInvalid={!newDeviceName.length}
							onChange={(e) => setNewDeviceName(e.target.value)}
							autoFocus
						/>
						<Form.Control.Feedback type="invalid">
							Device Name is Required
						</Form.Control.Feedback>
					</FormGroup>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<button
					className="btn btn-secondary"
					onClick={() => setShowAddNewDeviceModal(false)}
				>
					Close
				</button>
				<button
					type="submit"
					className="btn btn-primary"
					onClick={async () => {
						if (
							!devicesFromDB?.filter(
								(dev) => dev.deviceName === newDeviceName
							).length
						) {
							setDevicesFromDB(
								await addNewDeviceToDB(newDeviceName)
							);
							setShowAddNewDeviceModal(false);
						}
					}}
				>
					Save Device
				</button>
			</Modal.Footer>
		</Modal>
	);
}

export default addNewDeviceModal;
