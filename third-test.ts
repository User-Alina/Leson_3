import {ClientFunction, Selector} from 'testcafe';
import *as faker from "faker";

fixture `Getting Started`
    .page `http://ip-5236.sunline.net.ua:38015/create_account`;
test('My first registration test', async t => {
    const email = faker.internet.email();
    const randomState = Math.floor(Math.random() * await Selector('[name="zone_code"] option').count);
    await t
        .typeText('input[name="company"]', 'Company')
        .typeText('input[name="tax_id"]', '11111111')
        .typeText('input[name="firstname"]', 'Alina')
        .typeText('input[name="lastname"]', 'Test')
        .typeText('input[name="address1"]', 'Street')
        .typeText('input[name="address2"]', 'House')
        .typeText('input[name="postcode"]', '85099')
        .typeText('input[name="city"]', 'Kiev')
        .click('.form-control[name="country_code"]')
        .click(Selector('option').withAttribute('value', 'US'))
        .click('.form-control[name="zone_code"]')
        .click(Selector('[name="zone_code"] option').nth(randomState))
        .typeText('[name="customer_form"] [name="email"]', email)
        .typeText('input[name="phone"]', '+13082298122')
        .typeText('[name="customer_form"] [name="password"]', email)
        .typeText('[name="customer_form"] [name="confirmed_password"]', email)
        .click('[name="newsletter"]')
        .click('[name="create_account"]');
    const text = await Selector('.alert.alert-success').innerText;
    await t.expect('Your customer account has been created.').eql('Your customer account has been created.');
    const getPageUrl = ClientFunction(()=> window.location.href);
    await t.expect(getPageUrl()).contains('');
});