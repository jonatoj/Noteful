import React, { Component } from "react";
import NotefulForm from "../NotefulForm/NotefulForm";
import ValidationError from "../NotefulError/validationError";
import NotefulError from "../NotefulError/NotefulError";
import ApiContext from "../ApiContext";
import config from "../config";
import PropTypes from "prop-types";
import "./AddNote.css";

export default class AddNote extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      note_name: "",
      content: "",
      folder_id: "",
      modified: "",
      nameValid: false,
      folderSelected: false,
      formValid: false,
      validationMessages: {
        note_name: "",
        folder_id: "",
      },
    };
  }
  static contextType = ApiContext;

  handleSubmit = (e) => {
    e.preventDefault();
    const newNote = {
      note_name: this.state.note_name,
      content: this.state.content,
      folder_id: this.state.folder_id,
      modified: new Date(),
    };
    fetch(`${config.API_ENDPOINT}/notes`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newNote),
    })
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
        return res.json();
      })
      .then((note) => {
        this.context.addNote(note);
        this.props.history.push(`/folder/${note.folder_Id}`);
      })
      .catch((error) => {
        console.error({ error });
      });
  };

  updateName(note_name) {
    this.setState({ note_name }, () => {
      this.validateName(note_name);
    });
  }

  updateFolderId(folder_id) {
    this.setState({ folder_id }, () => {
      this.validateFolderId(folder_id);
    });
  }

  validateName(fieldValue) {
    const fieldErrors = { ...this.state.validationMessages };
    let hasError = false;

    fieldValue = fieldValue.trim();
    if (fieldValue.length === 0) {
      fieldErrors.note_name = "You must enter a note name.";
      hasError = true;
    }

    this.setState(
      {
        validationMessages: fieldErrors,
        nameValid: !hasError,
      },
      this.formValid
    );
  }

  validateFolderId(fieldValue) {
    const fieldErrors = { ...this.state.validationMessages };
    let hasError = false;

    fieldValue = fieldValue.trim();
    if (fieldValue === "") {
      fieldErrors.folder_id = "You must select a folder for this note.";
      hasError = true;
    }

    this.setState(
      {
        validationMessages: fieldErrors,
        folderSelected: !hasError,
      },
      this.formValid
    );
  }

  formValid() {
    this.setState({
      formValid: this.state.nameValid && this.state.folderSelected,
    });
  }

  render() {
    const { folders = [] } = this.context;
    return (
      <NotefulError>
        <section className="AddNote">
          <h2>Create a note</h2>
          <NotefulForm onSubmit={this.handleSubmit}>
            <div className="field">
              <label htmlFor="note-name-input">Name</label>
              <input type="text" id="note-name-input" name="note-name" />
              <ValidationError
                hasError={!this.state.nameValid}
                message={this.state.validationMessages.note_name}
              />
            </div>
            <div className="field">
              <label htmlFor="note-content-input">Content</label>
              <textarea id="note-content-input" name="note-content" />
            </div>
            <div className="field">
              <label htmlFor="note-folder-select">Folder</label>
              <select id="note-folder-select" name="note-folder-id">
                <option value="">Choose a Folder</option>
                {folders.map((folder) => (
                  <option key={folder.id} value={folder.id}>
                    {folder.name}
                  </option>
                ))}
              </select>
              <ValidationError
                has
                Error={!this.state.folderSelected}
                message={this.state.validationMessages.id}
              />
            </div>
            <div className="buttons">
              <button type="submit">Add note</button>
            </div>
          </NotefulForm>
        </section>
      </NotefulError>
    );
  }
}

AddNote.propTypes = {
  history: PropTypes.object,
};
