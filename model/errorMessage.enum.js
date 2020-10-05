
const ErrorMessage = Object.freeze({
	INVALID_PARSER_STRATEGY: 'The parser strategy is not supported',
	INVALID_DOCUMENT_STRICT_PARSER: "The html document is not valid for Strict Parser",
	FILE_OPEN_ERROR: "The file can not be open",
	FILE_OPEN_EMPTY: 'The souce of parser can not be empty document',
	ABSTRACT_METHOD: 'This method must be implemented',
	EVENT_LISTENER_REGISTERED: 'Event is registered',
	EVENT_LISTENER_NOT_REGISTERED: 'Event is not registered',
	EVENT_LISTENER_INVALID: 'Is not a valid EventListener',
	EVENT_INPUT_INVALID: 'Is not a valid method for this input type',
	EVENT_LISTENER_INPUT_INVALID_REGISTRATION: 'Is not a valid event registration for this input type',
  });
  
  
  module.exports = ErrorMessage;
  