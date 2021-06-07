const assert  = require("chai").assert;
const {CrudForm, CrudFormFieldInput, CrudFormFieldTextarea}  = require("../crud.js");
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
    it("Form", function() {
        let form = new CrudForm('test', {
            fields: [
                {
                    type: 'text',
                    name: 'string1',
                    label: 'Text 1'                  
                }
            ]
        });
        form.build();
        form.render();
        let html = getHTML(form.form);
        assert.equal(html, 
            '<form><div class="mb-3">'+
            '<label class="form-label" for="cjs_field_string1">Text 1</label>'+
            '<input type="text" class="form-control" id="cjs_field_string1">'+
            '</div>'+
            '<div class="mb-3"><button class="btn btn-primary">Guardar</button></div>'+
            '</form>');
    });
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
    it("FieldTextarea", function() {
        let textareaField = new CrudFormFieldTextarea({
            type: 'textarea',
            name: 'textarea',
            label: 'Text area',
            attr: {
                placeholder: 'Row1\nRow2\nRow3\n',
                rows: 3
            }
        });
        textareaField.build();
        let html = getHTML(textareaField.control);
        assert.equal(html, 
            '<textarea class="form-control" id="cjs_field_textarea" placeholder="Row1\nRow2\nRow3\n" rows="3"></textarea>');
    });
});