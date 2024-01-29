import ResponseBuilder from './ResponseBuilder.js';


export default class BidderResponseBuilder extends ResponseBuilder {
  buildResponse() {
    this._response.statusCode = 200;
    this._response.setHeader('Content-Type', 'text/html');
    this._response.end('<h1>Page de l\'enchérisseur</h1>');
  }
}
