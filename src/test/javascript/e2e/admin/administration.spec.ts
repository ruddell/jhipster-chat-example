import { browser, element, by, $ } from 'protractor';

describe('administration', () => {

    const username = element(by.id('username'));
    const password = element(by.id('password'));
    const accountMenu = element(by.id('account-menu'));
    const adminMenu = element(by.id('admin-menu'));
    const login = element(by.id('login'));
    const logout = element(by.id('logout'));

    beforeAll(() => {
        browser.get('/');

        accountMenu.click();
        login.click();

        username.sendKeys('admin');
        password.sendKeys('admin');
        element(by.css('button[type=submit]')).click();
        browser.waitForAngular();
    });

    beforeEach(() => {
        adminMenu.click();
    });

    it('should load user management', () => {
        element(by.css('[routerLink="user-management"]')).click();
        const expect1 = /Users/;
        element.all(by.css('h2 span')).first().getText().then((value) => {
            expect(value).toMatch(expect1);
        });
    });

    it('should load metrics', () => {
        element(by.css('[routerLink="jhi-metrics"]')).click();
        const expect1 = /Application Metrics/;
        element.all(by.css('h2 span')).first().getText().then((value) => {
            expect(value).toMatch(expect1);
        });
    });

    it('should load health', () => {
        element(by.css('[routerLink="jhi-health"]')).click();
        const expect1 = /Health Checks/;
        element.all(by.css('h2 span')).first().getText().then((value) => {
            expect(value).toMatch(expect1);
        });
    });

    it('should load configuration', () => {
        element(by.css('[routerLink="jhi-configuration"]')).click();
        const expect1 = /Configuration/;
        element.all(by.css('h2')).first().getText().then((value) => {
            expect(value).toMatch(expect1);
        });
    });

    it('should load audits', () => {
        element(by.css('[routerLink="audits"]')).click();
        const expect1 = /Audits/;
        element.all(by.css('h2')).first().getText().then((value) => {
            expect(value).toMatch(expect1);
        });
    });

    it('should load logs', () => {
        element(by.css('[routerLink="logs"]')).click();
        const expect1 = /Logs/;
        element.all(by.css('h2')).first().getText().then((value) => {
            expect(value).toMatch(expect1);
        });
    });

    afterAll(() => {
        accountMenu.click();
        logout.click();
    });
});
