"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactTypist = require("react-typist");

var _reactTypist2 = _interopRequireDefault(_reactTypist);

var _assign = require("lodash/assign");

var _assign2 = _interopRequireDefault(_assign);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextCarousel = function (_Component) {
  _inherits(TextCarousel, _Component);

  function TextCarousel() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, TextCarousel);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TextCarousel.__proto__ || Object.getPrototypeOf(TextCarousel)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      currentPhraseIndex: 0
    }, _this.componentDidMount = function () {
      _this.renderWord();
    }, _this.componentWillUnmount = function () {
      clearTimeout(_this.timer);
    }, _this.setNextPhrase = function () {
      var phrases = _this.props.phrases;
      var currentPhraseIndex = _this.state.currentPhraseIndex;


      if (!_this.props.loopPhrases && currentPhraseIndex + 1 == phrases.length) clearTimeout(_this.timer);

      _this.setState({
        currentPhraseIndex: _this.props.loopPhrases ? (currentPhraseIndex + 1) % phrases.length : currentPhraseIndex + 1
      });
    }, _this.handleTypingComplete = function () {
      // Need the delay since typist triggers typingComplete before that happens
      var cursorHideDelay = (0, _get2.default)(_this.props.typistProps, 'cursor.hideWhenDoneDelay', 0);

      if (_this.props.loopPhrases) {
        _this.timer = setTimeout(function () {
          _this.renderWord();
        }, _this.props.interval + cursorHideDelay);
      } else if (_this.state.currentPhraseIndex != _this.props.phrases.length) {
        _this.timer = setTimeout(function () {
          _this.renderWord();
        }, _this.props.interval + cursorHideDelay);
      }
    }, _this.getCurrentPhrase = function () {
      return _this.props.phrases[_this.state.currentPhraseIndex];
    }, _this.renderWord = function () {
      var domNode = _this.refs.phraseContainer;
      var typistProps = (0, _assign2.default)({}, _this.props.typistProps, {
        onTypingDone: _this.handleTypingComplete
      });

      _reactDom2.default.unmountComponentAtNode(domNode);
      _reactDom2.default.render(_react2.default.createElement(
        _reactTypist2.default,
        typistProps,
        _this.getCurrentPhrase()
      ), domNode);

      _this.setNextPhrase();
    }, _this.render = function () {
      var customClass = _this.props.className || "";

      return _react2.default.createElement("span", { className: "textCarouselContainer " + customClass, ref: "phraseContainer" });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return TextCarousel;
}(_react.Component);

TextCarousel.propTypes = {
  phrases: _propTypes2.default.arrayOf(_propTypes2.default.string).isRequired,
  interval: _propTypes2.default.number,
  typistProps: _propTypes2.default.object,
  loopPhrases: _propTypes2.default.bool
};
TextCarousel.defaultProps = {
  interval: 2000,
  typistProps: {},
  loopPhrases: true
};
exports.default = TextCarousel;
