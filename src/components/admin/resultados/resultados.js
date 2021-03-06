import React, { Component, Fragment } from 'react'
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { withFirebase } from "../../firebase";
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types'
import InputLabel from '@material-ui/core/InputLabel';
import withRoot from "../../../withRoot";
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DetalhesComponent from './_detalhes';


const styles = theme => ({
  tableContainer: {
    height: '100%',
  },
});
class Resultados extends Component {
  baseUrl = "https://us-central1-pigeon-90548.cloudfunctions.net/api/";

  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      items: {},
      subitems: {},
      snapshot: {},
      selecionado: null
    };

    // this.storageRef = props.firebase.storage.ref();
    this.fileSelector = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.displayDetails = this.displayDetails.bind(this);
    this.fetchArquivos = this.fetchArquivos.bind(this);
    this.updateSubitem = this.updateSubitem.bind(this);
    this.uploadNewFiles = this.uploadNewFiles.bind(this);
    this.createDBRecord = this.createDBRecord.bind(this);
  }

  componentDidMount() {
    this.fetchData()
      .then(response => response.json())
      .then(data => {
        this.setState(
          {
            items: data.resultados,
            selecionado: Object.keys(data.resultados)[0]
          },
          this.displayDetails
        );
      });
  }

  uploadNewFiles() {
    //If at least one file is selected, start the upload.
    if (this.fileSelector.current.files.length > 0) {
      const { files } = this.fileSelector.current;
      Object.keys(files).map(i => {
        const file = files[i];
        this.updateSubitem(i, file);
        this.uploadFile(i, file);
      });
    }
  }

  createDBRecord(newDBrecord) {
    const { id } = this.props;
    const endpoint = `${this.baseUrl}resultados/${id}`;
    return fetch(endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newDBrecord)
    });
  }

  uploadFile(i, file) {
    const { id } = this.props;
    let { name, ...metadata } = file;
    const newFileRef = this.storageRef.child(`resultados/${id}/${name}`);
    const uploadTask = newFileRef.put(file, { customMetadata: metadata });

    //Upload the file to cloud storage
    uploadTask.on(
      "state_changed",
      snapshot => {
        this.updateSubitem(i, file, false, snapshot);
      },
      error => {
        console.error("Error while uploading new file", error);
      },
      () => {
        const url = uploadTask.snapshot.metadata;
        this.createDBRecord({ name: url.name, url: url.fullPath })
          .then(response => response.json())
          .then(json => {
            this.updateSubitem(json.id, file, true);
            this.displayDetails(json.id);
          });
      }
    );
  }



  fetchData() {
    const endpoint = `${this.baseUrl}resultados`;
    return fetch(endpoint, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
  }

  displayDetails() {
    console.log('Display details')
    this.fetchArquivos()
      .then(response => response.json())
      .then(subitems => {
        const result = {};
        subitems.map(file => {
          result[file.id] = file.data;
        });

        this.setState({
          subitems: result
        });
      });
  }

  updateSubitem(i, file, done = false, snapshot = {}) {
    this.setState({
      subitems: {
        ...this.state.subitems,
        [i]: { done, snapshot, name: file.name }
      }
    });
  }

  fetchArquivos() {
    const { selecionado } = this.state;
    const endpoint = `${this.baseUrl}resultados/${selecionado}`;
    return fetch(endpoint, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
  }

  // handleChange = name => event => {
  //   this.setState({ [name]: event.target.value });
  // };

  handleChange(e) {
    console.log('Chamou handle change')
    console.log(e.target.id)
    const selecionado = e.target.value;
    this.setState(
      {
        selecionado
      },
      this.displayDetails
    );
  }

  render() {
    const { classes } = this.props;
    const { items, selecionado, subitems } = this.state;
    return (
      <Fragment>
        <Typography variant="h4" gutterBottom component="h2">
          Resultados
        </Typography>
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="evento">Evento</InputLabel>
            <Select
              native
              value={this.state.eventos}
              onChange={this.handleChange}
              inputProps={{
                name: 'evento',
                id: 'evento',
              }}
            >
              <option value="" />
              {
                Object.keys(items).map((item) => {
                  return <option key={item} id={item} value={item}>{items[item].name}</option>
                })
              }
            </Select>
          </FormControl>
        </div>
        <div className={classes.tableContainer}>
          {/* <DetalhesComponent
            id={selecionado}
            subitems={subitems}
            displayDetails={this.displayDetails}
            updateSubitem={this.updateSubitem}
          /> */}
        </div>
        <div className={classes.tableContainer}>
          <label htmlFor="outlined-button-file">


            <input
              id="raised-button-file"
              style={{ display: 'none' }}
              className="file-input"
              type="file"
              name="resume"
              ref={this.fileSelector}
              onChange={this.uploadNewFiles}
              multiple
            />
            <label htmlFor="raised-button-file">
              <Button variant="contained" component="span" className={classes.button}>
                Upload
                <CloudUploadIcon className={classes.rightIcon} />
              </Button>
            </label>
          </label>
        </div>
        <div className={classes.tableContainer}>

        </div>
      </Fragment>
    )
  }
}


const ResultadosComponent = compose(
  withRouter,
  withFirebase
)(withRoot(withStyles(styles)(Resultados)));

export default Resultados;

export { ResultadosComponent };
