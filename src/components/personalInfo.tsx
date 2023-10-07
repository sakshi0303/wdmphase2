import React, { useEffect, useState } from 'react';
import { UserData } from '../types/types';

type PersonalInfoOverlayProps = {
  userData: UserData;
  onSave: (userData: UserData) => void;
  shouldDisplay: boolean;
  onToggle: (shouldDisplay: boolean) => void;
};

function PersonalInfoOverlay({
  userData,
  onSave,
  shouldDisplay,
  onToggle,
}: PersonalInfoOverlayProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [personalInfo, setPersonalInfo] = useState<UserData>(userData);
  const roles: string[] = ['student', 'instructor', 'admin', 'coordinator', 'qa'];

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email validation regex

  const handleClose = () => {
    onToggle(false);
  };

  const handleOpen = () => {
    onToggle(true);
  };

  useEffect(() => {
    handleOpen();
    return () => handleClose();
  }, [onToggle]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (validateForm()) {
      alert('Your personal information change request is sent to admin for approval');
      onSave(personalInfo);
      setIsEditing(false);
    } else {
      alert('All fields are mandatory to fill');
    }
  };

  const validateForm = () => {
    const { id, name, email, role, password } = personalInfo;

    if (!id || !name || !email || !role || !password) {
      return false; // Form is not valid if any field is empty or null
    }

    if (!Number.isInteger(Number(id))) {
      return false; // ID should be a number
    }

    if (!emailRegex.test(email)) {
      return false; // Email should be in a valid format
    }

    return true; // Form is valid
  };

  const togglePasswordVisibility = () => {
    const passwordInput = document.getElementById('password') as HTMLInputElement;

    if (passwordInput) {
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
      } else {
        passwordInput.type = 'password';
      }
    }
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
                type="number"
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
                id="password"
                type="password"
                placeholder="Enter password"
                value={personalInfo.password || ''}
                onChange={(e) => setPersonalInfo({ ...personalInfo, password: e.target.value })}
                readOnly={!isEditing}
              />
              <button type="button" onClick={togglePasswordVisibility}>
                Show/Hide
              </button>
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
