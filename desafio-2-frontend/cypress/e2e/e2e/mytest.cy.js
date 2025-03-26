import fakerBr from 'faker-br';
import 'cypress-file-upload';
import { PracticeForm } from '../POM/practice_form';
import { WebTables } from '../POM/web_tables';

function generateRandom10DigitsNumber() {
    const min = 1000000000;
    const max = 9999999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function accessPracticeFormPage() {
    cy.visit("https://demoqa.com/");
    cy.get('.category-cards > :nth-child(2)').click();
    cy.get(':nth-child(2) > .element-list > .menu-list > #item-0').click();
}

function accessBrowserWindowsPage() {
    cy.visit("https://demoqa.com/");
    cy.get('.category-cards > :nth-child(3)').click({ force: true });
    cy.get(':nth-child(3) > .element-list > .menu-list > #item-0').click();
}

function accessWebTablesPage() {
    cy.visit("https://demoqa.com/");
    cy.get('.category-cards > :nth-child(1)').click();
    cy.get(':nth-child(1) > .element-list > .menu-list > #item-3').click();
}

describe('Demoqa Tests', () => {

    it('Practice Form Test', () => {
        const firstName = fakerBr.name.firstName();
        const lastName = fakerBr.name.lastName();
        const userEmail = fakerBr.internet.email();
        const genderOption = Math.floor(Math.random() * 3);
        const hobbiesOption = Math.floor(Math.random() * 3);
        const userNumber = generateRandom10DigitsNumber();
        const address = fakerBr.address.streetAddress();

        accessPracticeFormPage();

        const practiceForm = new PracticeForm();

        practiceForm.setFirstNameField(firstName);
        practiceForm.setLastNameField(lastName);
        practiceForm.setUserEmailField(userEmail);

        practiceForm.setGenderCheckbox(genderOption);

        practiceForm.setUserNumberField(userNumber);
        practiceForm.setDateOfBirth();
        practiceForm.setSubjectsField();

        practiceForm.setHobbiesCheckbox(hobbiesOption);

        practiceForm.setCurrentAddressField(address);

        practiceForm.uploadPicture('file.txt');

        practiceForm.setStateField();
        practiceForm.setCityField();

        practiceForm.submitForm();

        practiceForm.closeModal();
    });

    it('Browser Windows Test', () => {
        accessBrowserWindowsPage();
        
        cy.window().then((win) => {
            cy.stub(win, 'open').callsFake((url) => {
                win.location.href = url;
            }).as('windowOpen');
        });

        cy.get('#windowButton').click();

        cy.contains('This is a sample page').should('be.visible');
    });

    it('Web Tables Test', () => {
        cy.viewport(1600, 1000);

        const firstName = fakerBr.name.firstName();
        const lastName = fakerBr.name.lastName();
        const userEmail = fakerBr.internet.email();
        const age = 30;
        const salary = 4500;
        const department = "Quality Assurance";
        accessWebTablesPage();

        var addNewRecordButton = cy.get('#addNewRecordButton'); 

        addNewRecordButton.click();

        const webTables = new WebTables();

        webTables.setFirstName(firstName);
        webTables.setLastName(lastName);
        webTables.setUserEmail(userEmail);
        webTables.setAge(age);
        webTables.setSalary(salary);
        webTables.setDepartment(department);

        webTables.submitForm();

        cy.wait(1000);

        var editRecordButton = cy.get('#edit-record-4');

        editRecordButton.click();

        webTables.ageField().clear();

        webTables.setAge(35);

        webTables.submitForm();

        cy.wait(1000);

        var deleteRecordButton = cy.get('#delete-record-4');

        deleteRecordButton.click();
    });
});
