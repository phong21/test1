import React from 'react';
import Button from 'material-ui/Button';
import Input from 'material-ui/Input';
import PropTypes from 'prop-types';

const styles = {
	root: {
		textAlign: 'center',
		padding: '10px'
	},
	searchInput: {
		marginRight: '10px',
		minWidth: '300px'
	},
	button: {
		marginRight: '5px'
	}
}

class SearchBar extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			value: ''
		};

		this.onInputChange = this.onInputChange.bind(this);
	}

	search(value) {
		this.props.onSearch(value);
	}

	clearSearch() {
		this.setState({value: ''});
		this.props.onSearch('');
	}

	onInputChange(e) {
		this.setState({value: e.target.value});
	}

	render() {
		return (
			<div style={styles.root}>
				<Input
					style={styles.searchInput}
					type="text" 
					className="form-control" 
					placeholder="enter a title..."
					value={this.state.value}
					onChange={this.onInputChange}></Input>
				<Button 
					style={styles.button} 
					color="primary" 
					variant="raised"
					onClick={ e => this.search(this.state.value) }>Search</Button>

				<Button
					style={styles.button}
					color="default"
					variant="raised"
					onClick={ e => this.clearSearch() }>Clear</Button>
			</div>
		);
	}
}
SearchBar.propTYpes = {
	onSearch: PropTypes.func.isRequired
}

export default SearchBar;