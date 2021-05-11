const assert  = require("chai").assert;
const CrudFormFieldInput  = require("../crud.js");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const NewJQuery = require("jquery");

// Simula el entorno de un browser
const testDOM = new JSDOM();
global.window = testDOM.window;
global.document = testDOM.window.document;
global.$ = global.jQuery = NewJQuery(global.window);

// Obtiene el html que generaria el append() de 
// un elemento creado con JQuery
function getHTML(e) {
    var wrap = global.jQuery('<div>');
    wrap.append(e);
    return wrap.html();
}

describe("FormFields", function() {
    it("FieldInput", function() {
        let textField = new CrudFormFieldInput({
            type: 'text',
            name: 'string1',
            label: 'Text 1',
            attr: {
                placeholder: 'Text placeholder'
            }                    
        });
        textField.build();
        let html = getHTML(textField.control);
        assert.equal(html, 
            '<input type="text" class="form-control" id="cjs_field_string1" placeholder="Text placeholder">');
    });
});