import { browser, element, by, $ } from 'protractor';

describe('account', () => {

    const username = element(by.id('username'));
    const password = element(by.id('password'));
    const accountMenu = element(by.id('account-menu'));
    const login = element(by.id('login'));
    const logout = element(by.id('logout'));

    beforeAll(() => {
        browser.get('/');
    });

    it('should fail to login with bad password', () => {
        const expect1 = /Welcome, Java Hipster!/;
        element.all(by.css('h1')).first().getText().then((value) => {
            expect(value).toMatch(expect1);
        });
        accountMenu.click();
        login.click();

        username.sendKeys('admin');
        password.sendKeys('foo');
        element(by.css('button[type=submit]')).click();

        const expect2 = /Failed to sign in!/;
        element.all(by.css('.alert-danger')).first().getText().then((value) => {
            expect(value).toMatch(expect2);
        });
    });

    it('should login successfully with admin account', () => {
        const expect1 = /Sign in/;
        element.all(by.css('.modal-content h1')).first().getText().then((value) => {
            expect(value).toMatch(expect1);
        });
        username.clear();
        username.sendKeys('admin');
        password.clear();
        password.sendKeys('admin');
        element(by.css('button[type=submit]')).click();

        browser.waitForAngular();

        const expect2 = /You are logged in as user "admin"/;
        element.all(by.css('.alert-success span')).getText().then((value) => {
            expect(value).toMatch(expect2);
        });
    });

    it('should be able to update settings', () => {
        accountMenu.click();
        element(by.css('[routerLink="settings"]')).click();

        const expect1 = /User settings for \[admin\]/;
        element.all(by.css('h2')).first().getText().then((value) => {
            expect(value).toMatch(expect1);
        });
        element(by.css('button[type=submit]')).click();

        const expect2 = /Settings saved!/;
        element.all(by.css('.alert-success')).first().getText().then((value) => {
            expect(value).toMatch(expect2);
        });
    });

    it('should be able to update password', () => {
        accountMenu.click();
        element(by.css('[routerLink="password"]')).click();

        const expect1 = /Password for \[admin\]/;
        element.all(by.css('h2')).first().getText().then((value) => {
            expect(value).toMatch(expect1);
        });
        password.sendKeys('newpassword');
        element(by.id('confirmPassword')).sendKeys('newpassword');
        element(by.css('button[type=submit]')).click();

        const expect2 = /Password changed!/;
        element.all(by.css('.alert-success')).first().getText().then((value) => {
            expect(value).toMatch(expect2);
        });
        accountMenu.click();
        logout.click();

        accountMenu.click();
        login.click();

        username.sendKeys('admin');
        password.sendKeys('newpassword');
        element(by.css('button[type=submit]')).click();

        accountMenu.click();
        element(by.css('[routerLink="password"]')).click();
        // change back to default
        password.clear();
        password.sendKeys('admin');
        element(by.id('confirmPassword')).clear();
        element(by.id('confirmPassword')).sendKeys('admin');
        element(by.css('button[type=submit]')).click();
    });

    afterAll(() => {
        accountMenu.click();
        logout.click();
    });
});
