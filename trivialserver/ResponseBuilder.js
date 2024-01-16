export default class ResponseBuilder{
  _response;
  #statusCode;
  #contentType
  constructor(response) {
    this._response = response;
    this.#statusCode = 200;
    this.#contentType = 'text/html';
  }

  setStatusCode(statusCode) {
   this.#statusCode = statusCode;
  }

  setContentType(contentType) {
   this.#contentType = contentType;
  }

  buildResponse() {
    this.buildHeader();
    this.buildBody();
    this.buildFooter();
  }

  buildHeader() {
    this._response.statusCode = this.#statusCode;
    //this._response.write(`<html><head> Title </head><body>`);
    this._response.setHeader('Content-Type', this.#contentType);
  }
  buildBody() {
    // À implémenter dans les sous-classes
  }
  buildFooter() {
   const currentDate = new Date().toISOString();
   this._response.write(`<footer>${currentDate}</footer></body></html>`);
   this._response.end();
  }
}

export class HtmlResponseBuilder extends ResponseBuilder{
  buildBody() {
  // À implémenter dans les sous-classes
  }
}

export class FirstPageHtmlResponseBuilder extends HtmlResponseBuilder {
  buildBody() {
    this._response.write(`<p> First Page Content </p>`);
  }
}

export class SecondPageHtmlResponseBuilder extends HtmlResponseBuilder {
  buildBody() {
    this._response.write(`<p> Second Page Content </p>`);
  }
}

export class JsonResponseBuilder extends ResponseBuilder{
  #params;
  constructor(response, params) {
   super(response);
   this.#params = params;
   this.setContentType('application/json');
  }

  buildBody() {
   const jsonData = {};
   this.#params.forEach((value, key) => {
     jsonData[key] = value;
   });
   jsonData.date = new Date().toISOString();
   this._response.write(JSON.stringify(jsonData));
   this._response.end;
  }
  buildFooter() {
   const currentDate = new Date().toISOString();
   this._response.end();
  }
}

export class NotFoundHtmlResponseBuilder extends HtmlResponseBuilder {
  constructor(response) {
    super(response);
    this.setStatusCode(404);
  }
  buildBody() {
    this._response.write(`<p>404: Page not found </p>`);
    this._response.end;
  }
}
