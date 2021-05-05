const CrudJS = {};

function createElement(e) {
    return $(document.createElement(e));
}

function createFieldInput(f) {
    const input = createElement('input');
    input.addClass('form-control');
    input.attr('type', f.type);
    input.attr('id', f.id);

    if(f.placeholder) input.attr('placeholder', f.placeholder);

    f.container.append(input);
}

function createFieldTextarea(f) {
    const textarea = createElement('textarea');
    textarea.addClass('form-control');
    textarea.attr('id', f.id);

    if(f.rows) textarea.attr('rows', f.rows);

    if(f.placeholder) textarea.attr('placeholder', f.placeholder);

    f.container.append(textarea);
}

function createFieldContainer(f) {
    const container = createElement('div');
    container.addClass('mb-3');

    const label = createElement('label');
    label.addClass('form-label');
    label.attr('for', f.id);
    label.html(f.label);

    container.append(label);
    return container;
}

function createField(cjs, f) {
    console.log("Creating field " + f.name);

    f.id = 'cjs_' + f.name;
    f.container = createFieldContainer(f);

    cjs.form.append(f.container);

    if(f.type == "text" || f.type == "email") {
        createFieldInput(f);
        return;
    }
    if(f.type == "textarea") {
        createFieldTextarea(f);
        return;
    }
}

CrudJS.BuildForm = function(id, options) {
    console.log("Building form...");

    // const form = createElement('form');

    // const cjs = {
    //     Id: id,
    //     Options: options,
    //     Container: $('#'+id),
    //     Form: form
    // }    

    // options.fields.forEach(f => createField(cjs, f));

    // cjs.Container.append(cjs.Form);
    // return cjs;

    const form = new CrudForm(id, options);
    form.build();
    form.render();
    return form;
}


class CrudForm {
    constructor(id, options) {
        this.id = id;
        this.options = options;
        this.fields = [];
        this.container = null;
        this.form = null;
    }
  
    build() {
        this.form = createElement('form');
        this.container = $('#'+this.id);
        this.options.fields.forEach(f => createField(this, f));
    };
  
    render() {
        this.container.append(this.form);
    };
}