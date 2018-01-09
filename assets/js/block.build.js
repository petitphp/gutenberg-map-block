/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var __ = wp.i18n.__;
var Component = wp.element.Component;
var _wp$blocks = wp.blocks,
    registerBlockType = _wp$blocks.registerBlockType,
    Editable = _wp$blocks.Editable,
    BlockControls = _wp$blocks.BlockControls,
    AlignmentToolbar = _wp$blocks.AlignmentToolbar;
var withInstanceId = wp.components.withInstanceId;

var MapBlock = function (_Component) {
	_inherits(MapBlock, _Component);

	function MapBlock() {
		_classCallCheck(this, MapBlock);

		var _this = _possibleConstructorReturn(this, (MapBlock.__proto__ || Object.getPrototypeOf(MapBlock)).apply(this, arguments));

		_this.map = false;
		_this.marker = false;
		_this.handleMapClick = _this.handleMapClick.bind(_this);
		_this.handleZoomChange = _this.handleZoomChange.bind(_this);
		return _this;
	}

	_createClass(MapBlock, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _props = this.props,
			    instanceId = _props.instanceId,
			    className = _props.className,
			    attributes = _props.attributes;
			var lat = attributes.lat,
			    lng = attributes.lng,
			    zoom = attributes.zoom;


			this.map = L.map(className + '-map-' + instanceId).setView([lat, lng], zoom);
			L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				maxZoom: 19,
				attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
			}).addTo(this.map);
			this.marker = L.marker([lat, lng]).addTo(this.map);

			this.map.on('click', this.handleMapClick);
			this.map.on('zoomend', this.handleZoomChange);
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this.map.remove();
		}
	}, {
		key: 'handleMapClick',
		value: function handleMapClick(e) {
			var setAttributes = this.props.setAttributes;

			setAttributes(e.latlng);
			this.marker.setLatLng(e.latlng);
		}
	}, {
		key: 'handleZoomChange',
		value: function handleZoomChange(e) {
			var setAttributes = this.props.setAttributes;

			setAttributes({
				zoom: this.map.getZoom()
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _props2 = this.props,
			    instanceId = _props2.instanceId,
			    className = _props2.className,
			    attributes = _props2.attributes,
			    setAttributes = _props2.setAttributes,
			    focus = _props2.focus,
			    setFocus = _props2.setFocus;
			var address = attributes.address,
			    lat = attributes.lat,
			    lng = attributes.lng,
			    zoom = attributes.zoom,
			    id = attributes.id;


			if (0 === id) {
				setAttributes({
					id: Math.floor(Math.random() * Math.floor(Date.now()))
				});
			}

			return wp.element.createElement(
				'div',
				{ className: className },
				wp.element.createElement(
					'h2',
					null,
					'Map'
				),
				wp.element.createElement('input', {
					placeholder: __('Enter your address'),
					onFocus: setFocus,
					value: address,
					onChange: function onChange(nextAddress) {
						setAttributes({
							address: nextAddress.target.value
						});
					}
				}),
				wp.element.createElement('div', { id: className + '-map-' + instanceId, className: 'leaflet-map' })
			);
		}
	}]);

	return MapBlock;
}(Component);

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
	save: function save(_ref) {
		var attributes = _ref.attributes,
		    className = _ref.className;
		var id = attributes.id,
		    address = attributes.address,
		    lat = attributes.lat,
		    lng = attributes.lng,
		    zoom = attributes.zoom;


		return wp.element.createElement(
			'div',
			{ className: className },
			wp.element.createElement(
				'p',
				null,
				address.trim()
			),
			wp.element.createElement('div', { id: 'leaflet-map-' + id,
				className: 'leaflet-map',
				'data-lat': lat,
				'data-lng': lng,
				'data-zoom': zoom
			})
		);
	}
});

/***/ })
/******/ ]);