import 'cypress-file-upload';

export class PracticeForm {
  firstNameField() {
    return cy.get('#firstName');
  }

  lastNameField() {
    return cy.get('#lastName');
  }

  userEmailField() {
    return cy.get('#userEmail');
  }

  userNumberField() {
    return cy.get('#userNumber');
  }

  currentAddressField() {
    return cy.get('#currentAddress');
  }

  dateOfBirthField() {
    return cy.get('#dateOfBirthInput');
  }

  subjectsField() {
    return cy.get('.subjects-auto-complete__value-container');
  }

  uploadFileButton() {
    return cy.get('#uploadPicture');
  }

  stateField() {
    return cy.get('#state > .css-yk16xz-control');
  }

  cityField() {
    return cy.get('#city > .css-yk16xz-control > .css-1hwfws3');
  }

  submitButton() {
    return cy.get('#submit');
  }

  genderCheckBoxList() {
    return [
      cy.get('#genterWrapper > .col-md-9 > :nth-child(1)'),
      cy.get('#genterWrapper > .col-md-9 > :nth-child(2)'),
      cy.get('#genterWrapper > .col-md-9 > :nth-child(3)'),
    ];
  }

  hobbiesCheckBoxList() {
    return [
      cy.get('#hobbiesWrapper > .col-md-9 > :nth-child(1) > .custom-control-label'),
      cy.get('#hobbiesWrapper > .col-md-9 > :nth-child(2) > .custom-control-label'),
      cy.get('#hobbiesWrapper > .col-md-9 > :nth-child(3) > .custom-control-label'),
    ];
  }

  setFirstNameField(firstName) {
    this.firstNameField().type(firstName);
  }

  setLastNameField(lastName) {
    this.lastNameField().type(lastName);
  }

  setUserEmailField(userEmail) {
    this.userEmailField().type(userEmail);
  }

  setUserNumberField(userNumber) {
    this.userNumberField().type(userNumber);
  }

  setCurrentAddressField(address) {
    this.currentAddressField().type(address);
  }

  setGenderCheckbox(genderOption) {
    this.genderCheckBoxList()[genderOption].click();
  }

  setDateOfBirth() {
    this.dateOfBirthField().click();
    cy.get(':nth-child(3) > .react-datepicker__day--012').click();
  }

  setSubjectsField() {
    this.subjectsField().type('Account{enter}');
    this.subjectsField().type('Math{enter}');
  }

  setHobbiesCheckbox(hobbyOption) {
    this.hobbiesCheckBoxList()[hobbyOption].click();
  }

  uploadPicture(filePath) {
    this.uploadFileButton().attachFile(filePath);
  }

  setStateField() {
    this.stateField().type('a{enter}');
  }

  setCityField() {
    this.cityField().type('a{enter}');
  }

  submitForm() {
    this.submitButton().click();
  }

  closeModal() {
    cy.get('body').type('{esc}');
  }
}
