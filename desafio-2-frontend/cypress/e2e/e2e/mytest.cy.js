import fakerBr from 'faker-br';
import 'cypress-file-upload';

function gerarNumeroAleatorioDe10Digitos() {
    const min = 1000000000;
    const max = 9999999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

describe('suite de teste', () => {
    const firstName = fakerBr.name.firstName();
    const lastName = fakerBr.name.lastName();
    const userEmail = fakerBr.internet.email();
    const genderOption = Math.floor(Math.random() * 3) + 1;
    const hobbiesOption = Math.floor(Math.random() * 3) + 1;
    const userNumber = gerarNumeroAleatorioDe10Digitos();
    const address = fakerBr.address.streetAddress();

    it('primeiro teste', () => {
        cy.visit("https://demoqa.com/");
        cy.get('.category-cards > :nth-child(2)').click();
        cy.get(':nth-child(2) > .element-list > .menu-list > #item-0').click();
        cy.get('#firstName').type(firstName);
        cy.get('#lastName').type(lastName);
        cy.get('#userEmail').type(userEmail);
        cy.get(`#genterWrapper > .col-md-9 > :nth-child(${genderOption})`).click();
        cy.get('#userNumber').type(userNumber);
        cy.get('#dateOfBirthInput').click();
        cy.get(':nth-child(3) > .react-datepicker__day--012').click();
        cy.get('.subjects-auto-complete__value-container').type('Account{enter}');
        cy.get('.subjects-auto-complete__value-container').type('Math{enter}');
        cy.get(`#hobbiesWrapper > .col-md-9 > :nth-child(${hobbiesOption}) > .custom-control-label`).click();
        cy.get('#uploadPicture').attachFile('file.txt');
        cy.get('#currentAddress').type(address);
        cy.get('#state > .css-yk16xz-control').type('a{enter}');
        cy.get('#city > .css-yk16xz-control > .css-1hwfws3').type('a{enter}');
        cy.get('#submit').click();
        cy.get('body').type('{esc}');
  });
});
