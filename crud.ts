//"use strict";

class CrudJS {
    constructor(){}

    static BuildForm(id: any, options: any) {
        console.log("Building form...");
    
        const form = new CrudForm(id, options);
        form.build();
        form.render();
        return form;
    }

    static CreateElementForm(elem:string):any {
        return $(document.createElement(elem));
    }
}

class CrudForm {
    id:any;
    options:any;
    fields:any;
    container:any;
    form:any;

    constructor(id:any, options:any) {
        this.id = id;
        this.options = options;
        this.fields = [];
        this.container = null;
        this.form = null;
    }
  
    build() {
        this.form = CrudJS.CreateElementForm('form');
        this.container = $('#'+this.id);

        this.options.fields.forEach(f => {
            const type = f.type;
            var field: CrudFormFieldBase;
            if(type == "text" || type == "email") {
                field = new CrudFormFieldInput(f);
            }
            if(type == "textarea") {
                field = new CrudFormFieldTextarea(f);                
            }
            f.attributes.forEach(element => {
                if(element.type == "col") {
                    let crudAux:CrudFormFieldBase;
                    crudAux=field;
                    field=new CrudFormFieldAttibuteCol(f,crudAux);
                }
            });
            this.fields.push(field);
        });

        this.fields.forEach(f => 
            f.build());
    };
  
    render() {
        this.fields.forEach((f: { render: () => any; }) => 
            f.render());
        this.fields.forEach(f => 
            this.form.append(f.container));
        this.container.append(this.form);
    };
}

class CrudFormFieldBase {
    id:any;
    options:any;
    control:any;
    container:any;
    label:any;

    constructor(options: any) {
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
        this.container = CrudJS.CreateElementForm('div');
        this.container.addClass('mb-3');
    
        this.label = CrudJS.CreateElementForm('label');
        this.label.addClass('form-label');
        this.label.attr('for', this.id);
        this.label.html(this.options.label);
    };

    buildControl() {
        return null;
    }

    render() {
        this.container.append(this.label);
        this.container.append(this.control);
    }
}


class CrudFormFieldInput extends CrudFormFieldBase {
    constructor(options: any) {
        super(options);
    }
  
    buildControl() {
        const input = CrudJS.CreateElementForm('input');
        input.addClass('form-control');
        input.attr('type', this.options.type);
        input.attr('id', this.id);
    
        if(this.options.placeholder) 
            input.attr('placeholder', this.options.placeholder);
        
        return input;
    }
}

class CrudFormFieldTextarea extends CrudFormFieldBase {
    constructor(options: any) {
        super(options);
    }
  
    buildControl() {
        const textarea = CrudJS.CreateElementForm('textarea');
        textarea.addClass('form-control');
        textarea.attr('id', this.id);
    
        if(this.options.rows) 
            textarea.attr('rows', this.options.rows);
    
        if(this.options.placeholder) 
            textarea.attr('placeholder', this.options.placeholder);
    
        return textarea;
    }
}

class CrudFormFieldAttibuteCol extends CrudFormFieldBase {
    base:CrudFormFieldBase;

    constructor(options:any, _base: CrudFormFieldBase) {
        super(options);
        this.base=_base;
    }
  
    buildControl() {
        let control=this.base.buildControl()
        control.attr('pepe',6);
        return control
    }
}