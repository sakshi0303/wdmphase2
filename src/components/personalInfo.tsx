import React, { useEffect, useState } from 'react';
import { UserData } from '../types/types';

type PersonalInfoOverlayProps = {
    userData: UserData;
    onSave: (userData: UserData) => void;
    shouldDisplay: boolean; // Prop to control the display
    onToggle: (shouldDisplay: boolean) => void; // Updated prop to toggle the display
};

function PersonalInfoOverlay({ userData, onSave, shouldDisplay, onToggle }: PersonalInfoOverlayProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [personalInfo, setPersonalInfo] = useState<UserData>(userData);
    const roles: string[] = ['student', 'instructor']

    // Function to handle closing the overlay
    const handleClose = () => {
        onToggle(false); // Inform the parent component to hide the overlay
    };

    // Function to handle opening the overlay
    const handleOpen = () => {
        onToggle(true); // Inform the parent component to show the overlay
    };

    // Use an effect to call the onToggle prop when the component mounts and unmounts
    useEffect(() => {
        handleOpen(); // Initially open the overlay when mounted
        return () => handleClose(); // Close the overlay when unmounted
    }, [onToggle]);


    // Function to handle form submission
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault(); // Prevent form submission

        // Perform form validation
        if (validateForm()) {
            // Form is valid, show a popup or send a request for approval
            alert('Your personal information change request is sent to admin for approval');
            onSave(personalInfo);
            setIsEditing(false);
        } else {
            // Form is invalid, show an error message
            alert('All fields are mandatory');
        }
    };

    // Function to validate the form
    const validateForm = () => {
        // for (const field in personalInfo) {
        //   if (personalInfo[field as keyof UserData].trim() === '') {
        //     return false; // Form is not valid
        //   }
        // }
        return true; // Form is valid
    };

    return (
        <div className="overlay" id="create-pi-overlay" style={{ display: shouldDisplay ? 'block' : 'none' }}>

            <div className="create-course-form-container">
                <button className="create-course-close-btn" onClick={handleClose}>
                    &times;
                </button>
                <h2>{isEditing ? 'Edit Personal Info' : 'Personal Info'}</h2>
                <form id="info-form" className="new-course-form-container" onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Name:</label>
                            <input
                                type="text"
                                placeholder="Enter name"
                                value={personalInfo.name}
                                onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
                                readOnly={!isEditing}
                            />
                        </div>
                        <div className="form-group">
                            <label>Email:</label>
                            <input
                                type="email"
                                placeholder="Enter email"
                                value={personalInfo.email}
                                onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                                readOnly={!isEditing}
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>ID:</label>
                            <input
                                type="text"
                                placeholder="Enter ID"
                                value={personalInfo.id}
                                onChange={(e) => setPersonalInfo({ ...personalInfo, id: e.target.value })}
                                readOnly={!isEditing}
                            />
                        </div>
                        <div className="form-group">
                            <label>Role:</label>
                            <select
                                id="role"
                                value={personalInfo.role}
                                onChange={(e) => setPersonalInfo({ ...personalInfo, role: e.target.value })}
                                disabled={!isEditing}
                            >
                                <option value="">Select Role</option>
                                {roles.map((role) => (
                                    <option key={role} value={role}>
                                        {role.charAt(0).toUpperCase() + role.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>UUID:</label>
                            <input
                                type="text"
                                placeholder="Enter UUID"
                                value={personalInfo.uuid || ''}
                                onChange={(e) => setPersonalInfo({ ...personalInfo, uuid: e.target.value })}
                                readOnly={!isEditing}
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Password:</label>
                            <input
                                type="password"
                                placeholder="Enter password"
                                value={personalInfo.password || ''}
                                onChange={(e) => setPersonalInfo({ ...personalInfo, password: e.target.value })}
                                readOnly={!isEditing}
                            />
                        </div>
                    </div>

                    {!isEditing && (
                        <button className="edit-info" onClick={() => setIsEditing(true)}>
                            Edit
                        </button>
                    )}

                    {isEditing && (
                        <div>
                            <button type="submit" className="save-info">
                                Save
                            </button>
                            <button className="cancel-info" onClick={() => setIsEditing(false)}>
                                Cancel
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

export default PersonalInfoOverlay;
