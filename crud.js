const CrudJS = {};

CrudJS.CreateElement = function(e) {
    return $(document.createElement(e));
}

CrudJS.LoadOptions = function(options, done) {
    if(typeof options !== 'string') {
        done(options);
        return;
    }
    // 'options' es la url donde hay que buscar los options por ajax
    $.ajax({
        url: options,
        method: 'GET',
        type: 'json',
        contentType: 'application/json',
        success: function(res) {
            done(res);
        }
    })
    // .fail(handleErrors)
    .always(function() {
        //loading(false); 
    });
}

CrudJS.BuildForm = function(id, options) {
    console.log("Building form...");

    CrudJS.LoadOptions(options, function(options) {
        const form = new CrudForm(id, options);
        form.build();
        form.render();
    });
}

class CrudForm {
    constructor(id, options) {
        this.id = id;
        this.options = options;
        this.fields = [];
        this.container = null;
        this.form = null;
        this.btnSubmit = null;
        this.footerContainer = null;
        this.alert = null;
    }

    build() {
        this.form = CrudJS.CreateElement('form');
        const thisForm = this;
        this.form.on('submit', e => {
            e.preventDefault();
            thisForm.onSubmit();
        });
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

        this.footerContainer = CrudJS.CreateElement('div');
        this.footerContainer.addClass('mb-3');

        this.createBtnSubmit();

        this.createAlert();
    };
    
    // Se agregan los controles en los contenedores
    render() {
        this.fields.forEach(f => 
            f.render());
        this.fields.forEach(f => 
            this.form.append(f.container));
        this.footerContainer.append(this.btnSubmit);
        this.form.append(this.footerContainer)
        this.container.append(this.alert);
        this.container.append(this.form);
    };

    createBtnSubmit() {
        this.btnSubmit = CrudJS.CreateElement('button');
        this.btnSubmit.html('Guardar');
        this.btnSubmit.addClass('btn btn-primary');
    }

    createAlert() {
        this.alert = CrudJS.CreateElement('div');
        this.alert.addClass('alert');
        this.alert.attr('role', 'alert');
        this.alert.hide();
    }

    showAlert(type, msg) {
        this.alert.removeClass('alert-success');
        this.alert.removeClass('alert-danger');
        switch(type) {
            case 0: this.alert.addClass('alert-success'); break;
            case 1: this.alert.addClass('alert-danger'); break;
        }
        this.alert.html(msg);
        this.alert.show();
    }

    getValues() {
        var res = {};
        this.fields.forEach(f => 
            res[f.name] = f.getValue());
        return res;
    }

    onSubmit() {
        //loading(true); 
        console.log(this.getValues());
        this.showAlert(0, 'Sended!');
        return;
        $.ajax({
            url: this.options.submitUrl,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(this.getValues()),
            success: handleSuccess
        })
        .fail(handleErrors)
        .always(function() {
            //loading(false); 
        });
    }
}

class CrudFormFieldBase {
    constructor(options) {
        this.options = options;
        this.name = this.options.name;
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

        this.control.val(this.options.default);
    }

    buildControlCustom() {
        return;
    }

    render() {
        this.container.append(this.label);
        this.container.append(this.control);
    }

    getValue() {
        return this.control.val();
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
if(typeof(module) !== "undefined") {
    module.exports = {
        CrudForm,
        CrudFormFieldInput, 
        CrudFormFieldTextarea
    };
}