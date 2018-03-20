import React from 'react';
import PropTypes from 'prop-types';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

const styles = {
	card: { 
		maxWidth: 350, 
		position: 'absolute', 
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)'
	},
	media: { height: 200 }
};

class Photo extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div>
				<Card raised={true} className={this.props.classes.card}>
					<CardMedia
						className={this.props.classes.media}
						image={this.props.photo.url}
						title={this.props.photo.title} />

					<CardContent>
						<Typography gutterBottom variant="headline" component="h2">
						{this.props.photo.title}
						</Typography>
					</CardContent>

					<CardActions>
						<Button size="small" color="primary" onClick={this.props.onPhotoClose}>Close</Button>
					</CardActions>
				</Card>
			</div>
		);
	}
}

Photo.propTypes = {
	photo: PropTypes.object.isRequired,
	onPhotoClose: PropTypes.func.isRequired
};

export default withStyles(styles)(Photo);