import { mapValues } from 'lodash'

const {__} = wp.i18n
const {Component} = wp.element
const {registerBlockType, Editable, BlockControls, AlignmentToolbar} = wp.blocks
const {withInstanceId} = wp.components

class MapBlock extends Component {
	constructor() {
		super(...arguments)
		this.map = false
		this.marker = false
		this.handleMapClick = this.handleMapClick.bind(this)
		this.handleZoomChange = this.handleZoomChange.bind(this)
	}

	componentDidMount() {
		const {instanceId, className, attributes} = this.props
		const {lat, lng, zoom} = attributes

		this.map = L.map(`${className}-map-${ instanceId }`).setView([lat, lng], zoom)
		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 19,
			attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		}).addTo(this.map);
		this.marker = L.marker([lat, lng]).addTo(this.map);

		this.map.on('click', this.handleMapClick)
		this.map.on('zoomend', this.handleZoomChange)
	}

	componentWillUnmount() {
		this.map.remove()
	}

	handleMapClick(e) {
		const {setAttributes} = this.props
		this.marker.setLatLng(e.latlng)

		// Gutenberg does weird rounding on lat/lng attributes when saving
		// which cause parsing errors when loading the block. That why we
		// limit decimals here.
		setAttributes(
			mapValues(
				e.latlng,
				(val) => val.toFixed(11)
			)
		)
	}

	handleZoomChange(e) {
		const {setAttributes} = this.props
		setAttributes({
			zoom: this.map.getZoom()
		})
	}

	render() {
		const {
			instanceId,
			className,
			attributes,
			setAttributes,
			focus,
			setFocus
		} = this.props

		const {
			address,
			lat,
			lng,
			zoom,
			id
		} = attributes

		if (0 === id) {
			setAttributes({
				id: Math.floor(Math.random() * Math.floor(Date.now()))
			})
		}

		return (
			<div className={className}>
				<input
					placeholder={__('Enter your address')}
					onFocus={setFocus}
					value={address}
					onChange={(nextAddress) => {
						setAttributes({
							address: nextAddress.target.value,
						});
					}}
				/>
				<div id={`${className}-map-${ instanceId }`} className={'leaflet-map'}></div>
			</div>
		)
	}
}

registerBlockType('petitphp/map', {
	title: __('Map'),
	category: 'common',
	icon: 'admin-site',
	attributes: {
		address: {
			type: 'string',
			source: 'text',
			default: ''
		},
		lat: {
			type: 'string',
			default: '48.8561258'
		},
		lng: {
			type: 'string',
			default: '2.3355'
		},
		zoom: {
			type: 'number',
			default: 11
		},
		id: {
			type: 'number',
			default: 0
		}
	},
	edit: withInstanceId(MapBlock),
	save: ({attributes, className}) => {
		let {
			id,
			address,
			lat,
			lng,
			zoom
		} = attributes

		return (
			<div className={className}>
				<p>{address.trim()}</p>
				<div id={`leaflet-map-${id}`}
				     className={'leaflet-map'}
				     data-lat={lat}
				     data-lng={lng}
				     data-zoom={zoom}
				></div>
			</div>
		)
	}
})