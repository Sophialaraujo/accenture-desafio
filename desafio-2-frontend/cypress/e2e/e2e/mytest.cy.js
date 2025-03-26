import fakerBr from 'faker-br';
import 'cypress-file-upload';
import { PracticeForm } from '../POM/practice_form';

function gerarNumeroAleatorioDe10Digitos() {
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

describe('Demoqa Tests', () => {
    const firstName = fakerBr.name.firstName();
    const lastName = fakerBr.name.lastName();
    const userEmail = fakerBr.internet.email();
    const genderOption = Math.floor(Math.random() * 3);
    const hobbiesOption = Math.floor(Math.random() * 3);
    const userNumber = gerarNumeroAleatorioDe10Digitos();
    const address = fakerBr.address.streetAddress();

    it('Practice Form Test', () => {
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
});
