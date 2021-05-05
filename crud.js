const CrudJS = {};

CrudJS.CreateElement = function(e) {
    return $(document.createElement(e));
}

CrudJS.BuildForm = function(id, options) {
    console.log("Building form...");

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
        this.form = CrudJS.CreateElement('form');
        this.container = $('#'+this.id);

        this.options.fields.forEach(f => 
            this.fields.push(new CrudFormField(f)));

        this.fields.forEach(f => 
            f.build());
    };
  
    render() {
        this.fields.forEach(f => 
            f.render());
        this.fields.forEach(f => 
            this.form.append(f.container));
        this.container.append(this.form);
    };
}

class CrudFormField {
    constructor(options) {
        this.options = options;
        this.id = 'cjs_field_' + this.options.name;
        this.container = null;
        this.control = null;
        this.label = null;
    }
  
    build() {
        this.buildContainer();
        this.control = this.buildControl();
    };

    buildContainer() {
        this.container = CrudJS.CreateElement('div');
        this.container.addClass('mb-3');
    
        this.label = CrudJS.CreateElement('label');
        this.label.addClass('form-label');
        this.label.attr('for', this.id);
        this.label.html(this.options.label);
    };

    buildControl() {
        const type = this.options.type;
        if(type == "text" || type == "email") {
            return this.buildInput();
        }
        if(type == "textarea") {
            return this.buildTextarea();
        }
        return null;
    }

    buildInput() {
        const input = CrudJS.CreateElement('input');
        input.addClass('form-control');
        input.attr('type', this.options.type);
        input.attr('id', this.id);
    
        if(this.options.placeholder) 
            input.attr('placeholder', this.options.placeholder);
        
        return input;
    }

    buildTextarea() {
        const textarea = CrudJS.CreateElement('textarea');
        textarea.addClass('form-control');
        textarea.attr('id', this.id);
    
        if(this.options.rows) 
            textarea.attr('rows', this.options.rows);
    
        if(this.options.placeholder) 
            textarea.attr('placeholder', this.options.placeholder);
    
        return textarea;
    }

    render() {
        this.container.append(this.label);
        this.container.append(this.control);
    }
}