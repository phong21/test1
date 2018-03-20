import React from 'react';
import SearchBar from './SearchBar.jsx'
import PhotosTable from './PhotosTable.jsx';
import Photo from './Photo.jsx';
import Modal from 'material-ui/Modal';

export default class App extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			photos: [],
			openedPhoto: null
		};

		this.onPhotoSelect = this.onPhotoSelect.bind(this);
		this.closePhoto = this.closePhoto.bind(this);
		this.apiUrl = "https://jsonplaceholder.typicode.com/photos";
	}

	componentDidMount() {
		this.fetchPhotos();
	}

	fetchPhotos() {
		fetch(this.apiUrl).then(response => {
			return response.json();
		}).then(jsonResponse => {
			this.setState({
				photos: jsonResponse
			})
		});
	}

	onPhotoSelect(photo) {
		this.setState({
			openedPhoto: photo
		});
	}

	closePhoto() {
		this.setState({
			openedPhoto: null
		});
	}

	render() {
		return (
			<div>
				<PhotosTable 
					photos={this.state.photos} 
					onPhotoSelect={this.onPhotoSelect} 
				></PhotosTable>

				<Modal 
					open={!!this.state.openedPhoto} 
					aria-labelledby="simple-modal-title"
					aria-describedby="simple-modal-description"
					tabIndex="-1"
					disableAutoFocus={true}
					onClose={this.closePhoto}
				>{this.state.openedPhoto ? <Photo photo={this.state.openedPhoto} onPhotoClose={this.closePhoto}></Photo> : null}
				</Modal>
			</div>
		);
	}
}