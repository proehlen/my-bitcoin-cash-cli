// @flow

import MenuForm from 'tooey/lib/MenuForm';
import ViewBase from 'tooey/lib/ViewBase';
import MenuOption from 'tooey/lib/MenuOption';
import Output from 'cashlib/lib/Output';

import app from '../app';
import state from '../../model/state';

const fieldIdx = {
  ADDRESS: 0,
  VALUE: 1,
};

export default class TransactionAddP2PKH extends ViewBase {
  _menuForm: MenuForm

  constructor() {
    super('Add P2PKH Output');

    // Form fields
    const fields = [];
    fields[fieldIdx.ADDRESS] = { label: 'Address', default: '', type: 'string' };
    // TODO - enter values in BCH (requires 'float' type to be added tooey)
    fields[fieldIdx.VALUE] = { label: 'Value (Satoshis)', default: '', type: 'integer' };

    // Menu options
    const menuOptions = [
      new MenuOption('O', 'OK', 'Add output with entered details', this.addOutput.bind(this)),
    ];

    this._menuForm = new MenuForm(app, fields, menuOptions);
  }

  async addOutput() {
    try {
      const address = this._menuForm.fields[fieldIdx.ADDRESS].input.value;
      const value = parseInt(this._menuForm.fields[fieldIdx.VALUE].input.value, 10);
      if (!address || !value) {
        app.setWarning('Enter Address and Value to continue.');
      } else {
        const output = Output.createP2PKH(address, value);
        state.transactions.active.addOutput(output);
        app.popView();
      }
      app.setWarning('Sorry, this feature is under construction.');
    } catch (err) {
      app.setError(err.message);
    }
  }

  async handle(key: string) {
    await this._menuForm.handle(key);
  }

  render() {
    this._menuForm.render();
  }
}
