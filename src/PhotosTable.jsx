import React from 'react';
import Table, { TableBody, TableCell, TableHead, TableRow, TableFooter, TablePagination } from 'material-ui/Table';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar.jsx';

let actionsStyles = {
	root: {
		flexShrink: 0,
		marginLeft: 1.5
	}
};

class PaginationActions extends React.Component {

	constructor(props) {
		super(props);

		this.handlePage = this.handlePage.bind(this);
	}

	handlePage(page) {
		this.props.onChangePage(page);
	}

	render() {
		return (
			<div className={this.props.classes.root}>
				<IconButton 
					onClick={(e) => this.handlePage(0)} 
					disabled={this.props.page === 0}
					aria-label="First Page"
				><i className="fa fa-angle-double-left"></i></IconButton>

				<IconButton 
					onClick={(e) => this.handlePage(this.props.page - 1)} 
					disabled={this.props.page === 0} 
					aria-label="Previous Page"
				><i className="fa fa-angle-left"></i></IconButton>

				<IconButton 
					onClick={(e) => this.handlePage(this.props.page + 1)} 
					disabled={this.props.page >= Math.ceil(this.props.count/this.props.rowsPerPage) -1}
					aria-label="Next Page"
				><i className="fa fa-angle-right"></i></IconButton>

				<IconButton 
					onClick={(e) => this.handlePage(Math.max(0, Math.ceil(this.props.count/this.props.rowsPerPage) - 1))} 
					disabled={this.props.page >= Math.ceil(this.props.count/this.props.rowsPerPage) - 1}
					aria-label="First Page"
				><i className="fa fa-angle-double-right"></i></IconButton>
			</div>
		);
	}
}
PaginationActions.propTypes = {
	page: PropTypes.number.isRequired,
	count: PropTypes.number.isRequired,
	rowsPerPage: PropTypes.number.isRequired,
	onChangePage: PropTypes.func.isRequired
}

const PaginationActionsWrapped = withStyles(actionsStyles)(PaginationActions);

class PhotosTable extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			selected: null,
			searchTerm: '',
			page: 0,
			rowsPerPage: 100
		};

		this.onChangePage = this.onChangePage.bind(this);
		this.onChangeRowsPerPage = this.onChangeRowsPerPage.bind(this);
		this.onSearch = this.onSearch.bind(this);

		this.rowsPerPageOptions = [100, 300, 500];
	}

	selectPhoto(photo) {
		this.setState({
			selected: photo
		});

		this.props.onPhotoSelect(photo);
	}

	onChangePage(page) {
		this.setState({ page: page });
	}

	onChangeRowsPerPage(e) {
		this.setState({ rowsPerPage: e.target.value });
	}

	onSearch(value) {
		this.setState({page: 0}, () => {
			this.setState({searchTerm: value})
		});
	}

	getRowsBySearchTerm(term) {
		let rows = this.props.photos;

		term = typeof term === 'string' ? term.trim().toLowerCase() : '';

		if (0 < term.length) {
			rows = this.props.photos.filter((photo) => {
				return photo.title.trim().toLowerCase().indexOf(term) > -1;
			});
		}

		return rows;
	}

	render() {
		let begin = this.state.page * this.state.rowsPerPage,
			end   = (this.state.page * this.state.rowsPerPage) + this.state.rowsPerPage,
			data  = this.getRowsBySearchTerm(this.state.searchTerm),
			rows  = data.slice(begin, end);
		return (
			<div>
				<SearchBar onSearch={this.onSearch}></SearchBar>

				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Album ID</TableCell>
							<TableCell>ID</TableCell>
							<TableCell>Title</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map(photo => {
							return (
								<TableRow key={photo.id} onClick={(e) => this.selectPhoto(photo)} hover={true}>
									<TableCell>{photo.albumId}</TableCell>
									<TableCell>{photo.id}</TableCell>
									<TableCell>{photo.title}</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
					<TableFooter>
						<TableRow>
							<TablePagination
								colSpan={3}
								count={data.length}
								rowsPerPage={this.state.rowsPerPage}
								page={this.state.page}
								onChangePage={this.onChangePage}
								onChangeRowsPerPage={this.onChangeRowsPerPage}
								rowsPerPageOptions={this.rowsPerPageOptions}
								Actions={PaginationActionsWrapped}
							></TablePagination>
						</TableRow>
					</TableFooter>
				</Table>
			</div>
		);
	}
}
PhotosTable.propTypes = {
	photos: PropTypes.array.isRequired
}

export default PhotosTable;