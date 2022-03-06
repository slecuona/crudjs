# Objetivo

Prueba de concepto de una libreria Javascript para ser utilizada client-side.
El objetivo principal es minimizar tiempo de desarrollo en interfaces CRUD automatizando la generación de grillas y formularios.

# Dependencias

* [Bootstrap 5.0](https://getbootstrap.com/docs/5.0)
* [JQuery 3.6](https://api.jquery.com/)

```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js" integrity="sha384-JEW9xMcG8R+pH31jmWH6WWP0WintQrMb4s7ZOdauHnUtxwoG2vI5DkLtS3qm9Ekf" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js" crossorigin="anonymous"></script>
```

## Proximamente...

* [jQuery DateTimePicker](https://github.com/xdan/datetimepicker)
* [Select2](https://select2.org/)
* [iMaskJS](https://imask.js.org/)

# BuildForm

Crea un formulario dentro de un elemento contenedor específico utilizando un objeto de opciones.

# Ejemplo

Por ejemplo, teniendo el contenedor `#crud-form`:

```html
    <main class="container">
        <div class="card mt-5">
            <div class="card-header">
              Form
            </div>
            <div class="card-body" id="crud-form"></div>
        </div>
    </main>
```

Podemos crear un formulario con los campos 'Email' y 'Comentario':

```js
        const formOptions = {
            size: '', // sm / lg / (empty)
            submitUrl: '',
            fields: [
                {
                    type: 'email',
                    name: 'email',
                    label: 'Email',
                    attr: {
                        placeholder: 'super@email.com'
                    }
                },
                {
                    type: 'textarea',
                    name: 'comment',
                    label: 'Comentario',
                    attr: {
                        placeholder: 'Row1\nRow2\nRow3\n',
                        rows: 3
                    }
                }
            ]
        }
        CrudJS.BuildForm('crud-form', formOptions);
```

Dando como resultado:

![Captura de ejemplo](https://github.com/slecuona/crudjs/blob/main/example.png)


# Opciones por ajax

Si en lugar de indicar un objeto en el segundo parámetro, se especifica un string con una URL, se realiza una petición sobre esa dirección para recuperar las opciones del formulario (formato JSON).

```js
CrudJS.BuildForm('crud-form', 'https://server.com/form-options.json');
```

# BuildGrid

TODO


# Run tests

```bash
npm run test
```

# Run demo

Ejecuta un servidor express en el puerto 3001.
Permite probar la recuperación del esquema de los formularios a través de ajax.

```bash
npm run demo
```

Abrir en el navegador: `localhost:3001`

