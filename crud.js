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

        this.options.fields.forEach(f => {
            const type = f.type;
            var field;
            if(type == "text" || type == "email") {
                field = new CrudFormFieldInput(f);
            }
            if(type == "textarea") {
                field = new CrudFormFieldTextarea(f);
            }
            this.fields.push(field);
        });

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

class CrudFormFieldBase {
    constructor(options) {
        this.options = options;
        this.id = 'cjs_field_' + this.options.name;
        this.container = null;
        this.control = null;
        this.label = null;
    }
  
    build() {
        this.buildContainer();
        this.buildControl();
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
        this.buildControlCustom();
        
        this.control.addClass('form-control');

        // Aplico atributos genericos
        this.control.attr('id', this.id);

        // Aplico atributos dinamicos
        for (const attr in this.options.attr) {
            var val =  this.options.attr[attr];
            this.control.attr(attr, val);
        }
    }

    buildControlCustom() {
        return;
    }

    render() {
        this.container.append(this.label);
        this.container.append(this.control);
    }
}


class CrudFormFieldInput extends CrudFormFieldBase {
    // constructor(options) {
    //     super(options);
    // }
  
    buildControlCustom() {
        const input = CrudJS.CreateElement('input');
        input.attr('type', this.options.type);
        this.control = input;
    }
}

class CrudFormFieldTextarea extends CrudFormFieldBase {
    // constructor(options) {
    //     super(options);
    // }
  
    buildControlCustom() {
        const textarea = CrudJS.CreateElement('textarea');
        this.control = textarea;
    }
}

// Solo para Node (tests)
if(typeof(module) !== "undefined")
    module.exports = CrudFormFieldInput;