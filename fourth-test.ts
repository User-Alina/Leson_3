import {ClientFunction, Selector} from 'testcafe';
import *as faker from "faker";

fixture `Getting Started`
    .page `http://ip-5236.sunline.net.ua:38015`;

test('My first registration test', async t => {
    await t
        .click('.account.dropdown')
        .typeText('input[name="email"]', '11223344aaallliiinnnaaa111@gmail.com')
        .typeText('input[name="password"]', '1111')
        .click('.btn.btn-default[name="login"]');
    const text = await Selector('.alert.alert-success').innerText;
    await t.expect('You are now logged in as Alina Test.').eql('You are now logged in as Alina Test.');
    const getPageUrl = ClientFunction(()=> window.location.href);
    await t.expect(getPageUrl()).contains('');
});