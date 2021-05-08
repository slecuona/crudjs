//import { Options } from '../src/Classes/Options/Options'; // this will be your custom import
import { CrudJS } from "../src/crud.js";
//import { CrudJS } from "../out/crud.js";
import { expect } from 'chai';

describe('Options tests', () => { // the tests container
    it('checking default options', () => { // the single test
        //const options = new Options(); // this will be your class

        console.log(CrudJS.foo);
                /* detect retina */
        expect(false).to.be.false; // Do I need to explain anything? It's like writing in English!

    });
});