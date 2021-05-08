"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var CrudJS = /** @class */ (function () {
    function CrudJS() {
    }
    CrudJS.BuildForm = function (id, options) {
        console.log("Building form...");
        var form = new CrudForm(id, options);
        form.build();
        form.render();
        return form;
    };
    CrudJS.CreateElementForm = function (elem) {
        return $(document.createElement(elem));
    };
    return CrudJS;
}());
var CrudForm = /** @class */ (function () {
    function CrudForm(id, options) {
        this.id = id;
        this.options = options;
        this.fields = [];
        this.container = null;
        this.form = null;
    }
    CrudForm.prototype.build = function () {
        var _this = this;
        this.form = CrudJS.CreateElementForm('form');
        this.container = $('#' + this.id);
        this.options.fields.forEach(function (f) {
            var type = f.type;
            var field;
            if (type == "text" || type == "email") {
                field = new CrudFormFieldInput(f);
            }
            if (type == "textarea") {
                field = new CrudFormFieldTextarea(f);
            }
            f.attributes.forEach(function (element) {
                if (element.type == "col") {
                    var crudAux = void 0;
                    crudAux = field;
                    field = new CrudFormFieldAttibuteCol(f, crudAux);
                }
            });
            _this.fields.push(field);
        });
        this.fields.forEach(function (f) {
            return f.build();
        });
    };
    ;
    CrudForm.prototype.render = function () {
        var _this = this;
        this.fields.forEach(function (f) {
            return f.render();
        });
        this.fields.forEach(function (f) {
            return _this.form.append(f.container);
        });
        this.container.append(this.form);
    };
    ;
    return CrudForm;
}());
var CrudFormFieldBase = /** @class */ (function () {
    function CrudFormFieldBase(options) {
        this.options = options;
        this.id = 'cjs_field_' + this.options.name;
        this.container = null;
        this.control = null;
        this.label = null;
    }
    CrudFormFieldBase.prototype.build = function () {
        this.buildContainer();
        this.control = this.buildControl();
    };
    ;
    CrudFormFieldBase.prototype.buildContainer = function () {
        this.container = CrudJS.CreateElementForm('div');
        this.container.addClass('mb-3');
        this.label = CrudJS.CreateElementForm('label');
        this.label.addClass('form-label');
        this.label.attr('for', this.id);
        this.label.html(this.options.label);
    };
    ;
    CrudFormFieldBase.prototype.buildControl = function () {
        return null;
    };
    CrudFormFieldBase.prototype.render = function () {
        this.container.append(this.label);
        this.container.append(this.control);
    };
    return CrudFormFieldBase;
}());
var CrudFormFieldInput = /** @class */ (function (_super) {
    __extends(CrudFormFieldInput, _super);
    function CrudFormFieldInput(options) {
        return _super.call(this, options) || this;
    }
    CrudFormFieldInput.prototype.buildControl = function () {
        var input = CrudJS.CreateElementForm('input');
        input.addClass('form-control');
        input.attr('type', this.options.type);
        input.attr('id', this.id);
        if (this.options.placeholder)
            input.attr('placeholder', this.options.placeholder);
        return input;
    };
    return CrudFormFieldInput;
}(CrudFormFieldBase));
var CrudFormFieldTextarea = /** @class */ (function (_super) {
    __extends(CrudFormFieldTextarea, _super);
    function CrudFormFieldTextarea(options) {
        return _super.call(this, options) || this;
    }
    CrudFormFieldTextarea.prototype.buildControl = function () {
        var textarea = CrudJS.CreateElementForm('textarea');
        textarea.addClass('form-control');
        textarea.attr('id', this.id);
        if (this.options.rows)
            textarea.attr('rows', this.options.rows);
        if (this.options.placeholder)
            textarea.attr('placeholder', this.options.placeholder);
        return textarea;
    };
    return CrudFormFieldTextarea;
}(CrudFormFieldBase));
var CrudFormFieldAttibuteCol = /** @class */ (function (_super) {
    __extends(CrudFormFieldAttibuteCol, _super);
    function CrudFormFieldAttibuteCol(options, _base) {
        var _this = _super.call(this, options) || this;
        _this.base = _base;
        return _this;
    }
    CrudFormFieldAttibuteCol.prototype.buildControl = function () {
        var control = this.base.buildControl();
        control.attr('pepe', 6);
        return control;
    };
    return CrudFormFieldAttibuteCol;
}(CrudFormFieldBase));
